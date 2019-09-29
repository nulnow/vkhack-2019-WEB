const {
    findOneInCollectionByObjectId,
    updateOneInCollectionByObjectId,
    listCollection,
} = require('../../database/client')

const db = require('../../database/client')

const router = require('express').Router()
const profileRouter = require('./profile')
const authRouter = require('./auth')
const antiCorsMiddleware = require('../../middlewares/anti-cors')
const { authenticationIsRequiredAPI, onyForAdmin } = require('../../middlewares/authenticationIsRequired')


const EventEmitter = require('../../general/EventEmitter')

router.use(antiCorsMiddleware)
router.use('/profile', profileRouter)

router.use(authRouter)

router.get('/users/:objectId', onyForAdmin, async (req, res) => {
    findOneInCollectionByObjectId('users', req.params.objectId)
        .then(user => {

            res.render('user.ejs', {user})
        })
        .catch(err => res.json(err))
})

router.get('/users/:objectId/json', async (req, res) => {
    findOneInCollectionByObjectId('users', req.params.objectId)
        .then(user => {
            res.json(user)
        })
        .catch(err => res.json(err))
})

router.get('/admin/block-user/:objectId', onyForAdmin, (req, res) => {

    updateOneInCollectionByObjectId('users', req.params.objectId, {isBlocked: true})
        .then(user => {
            findOneInCollectionByObjectId('users', req.params.objectId)
                .then(user => {
                    EventEmitter.emit(EventEmitter.TYPES.USER_BLOCKED, user.email)
                })
            res.sendStatus(200)
        })
        .catch(err => res.json(err))
})

router.get('/admin/unblock-user/:objectId', onyForAdmin, (req, res) => {
    updateOneInCollectionByObjectId('users', req.params.objectId, {isBlocked: false})
        .then(user => {
            res.sendStatus(200)
        })
        .catch(err => res.json(err))
})

router.get('/users', onyForAdmin, (req, res) => {
    listCollection('users')
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({error})
        })
})


router.get('/events', async (req, res) => {
    let events = await db.listCollection('events')
    if (req.user && req.user.isAdmin) {
        const users = await db.listCollection('users')
        const events = await db.listCollection('events')

        users.forEach(user => {
            if (user.requested_events_ids && user.requested_events_ids.length) {
                user.requested_events_ids.forEach(eventID => {
                    events.forEach(e => {
                        if (e._id.toString() === eventID) {
                            e.requestUserIds = [...(e.requestUserIds || []), user]
                        }
                    })
                })
            }

            if (user.accepted_requested_events_ids && user.accepted_requested_events_ids.length) {
                user.accepted_requested_events_ids.forEach(eventID => {
                    events.forEach(e => {
                        if (e._id.toString() === eventID) {
                            e.userIds = [...(e.userIds || []), user]
                        }
                    })
                })
            }
        })

        res.json(events)
        return
    }
    if (req.user) {
        const user = await db.findOneInCollection('users', { email: req.user.email })
        const requested = user.requested_events_ids.map(o => o.toString())
        events = events.map(event => {
            if (requested.indexOf(event._id.toString()) !== -1) {
                return {
                    ...event,
                    isRequested: true
                }
            } else {
                return {
                    ...event,
                    isRequested: false,
                }
            }
        })
        res.json(events)
    } else {
        res.json(events)
    }
})


router.get('/make-request/:objectId', authenticationIsRequiredAPI, async (req, res) => {
    const objectId = req.params.objectId
    const user = await db.findOneInCollection('users', { email: req.user.email })
    const events = await db.findOneInCollectionByObjectId('events', objectId)
    if (!user.requested_events_ids) {
        user.requested_events_ids = [ objectId ]
    } else {
        if (user.requested_events_ids.indexOf(objectId) === -1) {
            user.requested_events_ids = [ ...user.requested_events_ids, objectId ]
        }
    }
    await updateOneInCollectionByObjectId('users', user._id, user)
    res.status(200).json(user)
})

// router.get('/admin/events', async (req, res) => {
//
// })

router.post('/admin/accept-user', async (req, res) => {
    const {
        userId,
        eventId,
    } = req.body

    if (!userId || !eventId) {
        return res.status(400).json({message: 'userId || eventId не посланы'})
    }

    const user = await db.findOneInCollectionByObjectId('users', userId)
    const event = await db.findOneInCollectionByObjectId('events', eventId)

    if (!user || !event) {
        return res.status(400).json({message: '!user || !event'})
    } else {
        user.requested_events_ids = (user.requested_events_ids || [])
            .filter(eventIdFromUser => {
                return eventIdFromUser.toString() !== eventId.toString()
            })
        user.accepted_requested_events_ids = [
            ...(user.accepted_requested_events_ids || []),
            eventId,
        ]

        await updateOneInCollectionByObjectId('users', user._id, user)
        res.status(200).json({message: 'ok'})
        EventEmitter.emit('REQUEST_ACCEPTED', {email: user.email, eventTitle: event.title})
    }
})

router.post('/admin/reject-user', async (req, res) => {
    const {
        userId,
        eventId,
    } = req.body

    if (!userId || !eventId) {
        return res.status(400).json({message: 'userId || eventId не посланы'})
    }

    const user = await db.findOneInCollectionByObjectId('users', userId)
    const event = await db.findOneInCollectionByObjectId('events', eventId)

    if (!user || !event) {
        return res.status(400).json({message: '!user || !event'})
    } else {
        user.requested_events_ids = (user.requested_events_ids || [])
            .filter(eventIdFromUser => {
                return eventIdFromUser.toString() !== eventId.toString()
            })
        user.rejected_requested_events_ids = [
            ...(user.rejected_requested_events_ids || []),
            eventId,
        ]

        await updateOneInCollectionByObjectId('users', user._id, user)
        res.status(200).json({message: 'ok'})

        EventEmitter.emit(EventEmitter.TYPES.USER_NOTIFY, (user.email, 'f'))
    }
})

router.get('/d', async (req, res) => {
    for(let i = 0; i < 37; i++) {
        db.deleteOneInCollection('events', {})
    }
})

router.get('/i', async (req, res) => {

    let events = []

    for(let i = 0; i<7; i++) {
        events.push({
            title: '"Оборотни" микромира', //required
            date: new Date().getTime(), //required
            description: 'На лекции расскажем и покажем вам о том, как образуются нейтрино. А также расскажем о парадоксальных и удивительных результатах экспериментов с участием этих элементарных частиц.', //required
            userIds: [],
            requestUserIds: [],
            maximumUsers: 20,
            minimumUsers: 5
        })
    }
    db.insertManyIntoCollection('events', events)
})

module.exports = router