
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authenticationIsRequiredAPI = require('../../middlewares/authenticationIsRequired')

const hashPassword = async password => await bcrypt.hash(password, 10)

const router  = require('express').Router()

const {
    findOneInCollection,
    insertIntoCollection,
    updateOneInCollection,
} = require('../../database/client')


router.post('/register', async (req, res) => {
    const {
        email,
        firstName,
        lastName,
        password,
        deviceToken,
    } = req.body

    if (!email || !password || !firstName || !lastName) {
        console.log('invalid register request')
        console.log(req.body)
        return res.sendStatus(400)
    }

    const userToSave = {
        email,
        firstName,
        lastName,
        hashedPassword: await hashPassword(password),
        ...(deviceToken ? {
            deviceTokens: [deviceToken]
        }: {}),
    }

    try {
        if(await findOneInCollection('users', {email})) {
            return res.status(400).json({error: 'Пользователь с такие емейлом уже существует'})
        }
    } catch (e) {
        return res.sendStatus(500).json({ error: 'Падение при проверке на уникальность мейла' })
    }

    await insertIntoCollection('users', userToSave)


    return res.status(200).json(jwt.sign({
        email
    }, process.env.SECRET_KEY))
})

router.post('/login', async (req, res) => {
    const {
        email,
        password,
        token,
    } = req.body

    if (!email || !password) {
        return res.sendStatus(400)
    }

    let user
    try {
        user = await findOneInCollection('users', {email})
    } catch (e) {
        return res.sendStatus(400)
    }

    if (!user) {
        return res.sendStatus(400).json({error: 'Пользователя с таким емейлом не существует'})
    }

    if (!await bcrypt.compare(password, user.hashedPassword)) {
        res.sendStatus(400).json({error: 'Неправильная почта или пароль'})
    }

    if (token) {
        await updateOneInCollection('users', {email}, {
            ...user,
            token
        })
    }

    return res.status(200).json(jwt.sign({
        email
    }, process.env.SECRET_KEY))

})

router.all('/logout', authenticationIsRequiredAPI, async (req, res) => {
    console.log('!logout!')
    res.sendStatus(200)
})

module.exports = router
