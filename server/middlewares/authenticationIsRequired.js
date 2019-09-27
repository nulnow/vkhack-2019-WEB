
const {
    findOneInCollection,
} = require('../database/client')


const authenticationIsRequired = ({ redirectTo = null }) => (req, res, next) => {
    if (!req.user) {
        if (redirectTo) {
            return res.redirect(redirectTo)
        } else {
            return res.status(401).json({message: 'authentication is required'})
        }
    } else {
        return next()
    }
}

const redirectToLoginIfNotAuthenticated = authenticationIsRequired({ redirectTo: '/login' })
const authenticationIsRequiredAPI = authenticationIsRequired({ redirectTo: null })

module.exports = authenticationIsRequired
module.exports.redirectToLoginIfNotAuthenticated = redirectToLoginIfNotAuthenticated
module.exports.authenticationIsRequiredAPI = authenticationIsRequiredAPI
