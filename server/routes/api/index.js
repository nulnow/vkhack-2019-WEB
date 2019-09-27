const router = require('express').Router()
const profileRouter = require('./profile')
const authRouter = require('./auth')
const antiCorsMiddleware = require('../../middlewares/anti-cors')

router.use(antiCorsMiddleware)
router.use('/profile', profileRouter)

router.use(authRouter)

module.exports = router