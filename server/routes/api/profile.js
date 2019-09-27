const router = require('express').Router()
const { authenticationIsRequiredAPI } = require('../../middlewares/authenticationIsRequired')
const authenticate = require('../../middlewares/authenticate')

const {
    findOneInCollection,
    updateOneInCollection,
} = require('../../database/client')

router.use(authenticationIsRequiredAPI)

router.get('/', async (req, res) => {
    const {
        email,
    } = req.user
    const user = await findOneInCollection('users', { email })
    res.status(200).json(user)
})

router.post('/', async (req, res) => {
    const { email } = req.user
    const changes = req.body
    const user = await findOneInCollection('users', { email })
    await updateOneInCollection('users', { email }, { ...user, ...changes })
    return res.status(200).json({ url })
})

module.exports = router