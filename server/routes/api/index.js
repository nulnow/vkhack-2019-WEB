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
    if (req.user) {
        const user = await db.findOneInCollection('users', { email: req.user.email })
        console.log(user)
        const requested = user.requesteds_events_ids.map(o => o.toString())
        events = events.map(event => {
            console.log(event._id.toString())
            if (requested.indexOf(event._id.toString()) !== -1) {
                console.log(true)
                return {
                    ...event,
                    isRequested: true
                }
            } else {
                console.log(false)

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

router.get('/make-request/:objectId', onyForAdmin, authenticationIsRequiredAPI, async (req, res) => {
    const objectId = req.params.objectId
    const user = await db.findOneInCollection('users', { email: req.user.email })
    const events = await db.findOneInCollectionByObjectId('events', objectId)
    if (!user.requesteds_events_ids) {
        user.requesteds_events_ids = [ objectId ]
    } else {
        if (user.requesteds_events_ids.indexOf(objectId) !== -1) {
            user.requesteds_events_ids = [ ...user.requesteds_events_ids, objectId ]
        }
    }
    await updateOneInCollectionByObjectId('users', user._id, user)
    res.status(200).json(user)
})

router.get('/admin/events', onyForAdmin, async (req, res) => {
    const users = await db.listCollection('users')
    const events = await db.listCollection('events')

    users.forEach(user => {
        if (user.requesteds_events_ids && user.requesteds_events_ids.length) {
            user.requesteds_events_ids.forEach(eventID => {
                events.forEach(e => {
                    if (e._id.toString() === eventID) {
                        e.users = [...(e.users || []), user]
                    }
                })
            })
        }
    })

    res.json(events.filter(event => event.users && event.users.length))
})

module.exports = router