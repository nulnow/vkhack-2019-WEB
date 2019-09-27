const {
    findOneInCollectionByObjectId,
    updateOneInCollectionByObjectId,
} = require('../../database/client')

const router = require('express').Router()
const profileRouter = require('./profile')
const authRouter = require('./auth')
const antiCorsMiddleware = require('../../middlewares/anti-cors')

router.use(antiCorsMiddleware)
router.use('/profile', profileRouter)

router.use(authRouter)

router.get('/users/:objectId', async (req, res) => {
    findOneInCollectionByObjectId('users', req.params.objectId)
        .then(user => {
            res.render('user.ejs', {user})
        })
        .catch(err => res.json(err))
})

router.get('/admin/block-user/:objectId', (req, res) => {
    updateOneInCollectionByObjectId('users', req.params.objectId, {isBlocked: true})
        .then(user => {
            res.sendStatus(200)
        })
        .catch(err => res.json(err))
})

router.get('/admin/unblock-user/:objectId', (req, res) => {
    updateOneInCollectionByObjectId('users', req.params.objectId, {isBlocked: false})
        .then(user => {
            res.sendStatus(200)
        })
        .catch(err => res.json(err))
})

module.exports = router