const {
    findOneInCollection,
} = require('../database/client')

const jwt = require('jsonwebtoken')
const db = require('../database/client')

const authenticate = (req, res, next) => {
    if (!req.get('Authorization')) return next()

    const token = req.get('Authorization').slice('Bearer '.length)

    jwt.verify(token, process.env.SECRET_KEY, async (error, verificationResult) => {

        if (error) {
            return next()
        }
        const user = await db.findOneInCollection('users', {email: verificationResult.email})
        req.user = { ...user }
        next()
    })
}

module.exports = authenticate