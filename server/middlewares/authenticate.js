const {
    findOneInCollection,
} = require('../database/client')

const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    if (!req.get('Authorization')) return next()

    const token = req.get('Authorization').slice('Bearer '.length)

    jwt.verify(token, process.env.SECRET_KEY, (error, verificationResult) => {

        if (error) {
            return next()
        }
        req.user = { email: verificationResult.email }
        next()
    })
}

module.exports = authenticate