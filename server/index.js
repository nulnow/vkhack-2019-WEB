process.env.SECRET_KEY='f3fj3f093209329f329ru249ty2y248t924u9t834'
process.env.DATABASE_URL = 'mongodb+srv://user:bSmPPoXqyB1QjFmb@cluster0-sxmmm.mongodb.net/test?retryWrites=true&w=majority'
process.env.DATABASE_NAME = 'test'
process.env.PORT=8888

const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const bodyParser = require('body-parser')
const authenticate = require('./middlewares/authenticate')
const STATIC_PAGES = require('./STATIC_PAGES')
const path = require('path')
const EventEmitter = require('./general/EventEmitter')
const db = require('./database/client')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const fs = require('fs')

const validateToken = (token) => new Promise((resolve, reject) => {
    console.log({token})
    jwt.verify(token, process.env.SECRET_KEY, (error, verificationResult) => {
        if (error) {
            console.log('validateToken')
            console.log({error})
            return reject()
        }
        resolve(verificationResult)
    })
})

const { Expo } = require('expo-server-sdk')
const expo = new Expo()

const {
    getClient,
} = require('./database/client')

const apiRouter = require('./routes/api')

const push = (tokens, payload, data = {}) => {
    console.log('sending push')
    console.log({tokens, payload})
    let messages = []
    tokens.forEach(token => {
        messages.push({
            to: token,
            sound: 'default',
            body: payload.title,
            data: {
                ...payload,
            },
        })
    })
    const chunks = expo.chunkPushNotifications(messages)
    ;(async () => {
        for (let chunk of chunks) {
            await expo.sendPushNotificationsAsync(chunk)
        }
    })()
}

const notifyUser = async (sockets, email, message) => {
    const user = await db.findOneInCollection('users', {email})
    if (!user) {
        console.log('no user with email ' + email)
        return
    }
    if (!Expo.isExpoPushToken(user.token)) {
        console.log('пуш плохой')
        return
    }
    push([user.token], {
        title: message,
    })


}

getClient()
    .then(async c => {
        const app = express()
        app.use(bodyParser.json())

        app.set('view engine', 'ejs')
        app.set('views', path.resolve(__dirname, 'views'))
        app.use(express.static(path.resolve(__dirname, 'public')))

        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization')
            next()
        })
        app.options('*', (req, res) => {
            res.sendStatus(200)
        })

        app.use(morgan('common'))
        app.use(morgan('common', { stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) }))


        ;STATIC_PAGES.forEach(route => {
            app.get(route, (req, res) => {
                res.render('prod.ejs', {title: 'kek'})
            })
        })
        app.use(authenticate)
        app.use('/api', apiRouter)
        const server = http.createServer(app)
        const io = socketIo(server)

        EventEmitter.subscribe(EventEmitter.TYPES.USER_BLOCKED,  async (email) => {
            const user = await db.findOneInCollection('users', {email})
            if (!user) {
                console.log('no user with email ' + email)
                return
            }
            if (!Expo.isExpoPushToken(user.token)) {
                console.log('пуш плохой')
                return
            }
            console.log('Пушим пуш')
            push([user.token], {
                title: '(БАН) Бан по причине (причина)',
                type: 'BAN'
            })
        })

        let sockets = []

        EventEmitter.subscribe(EventEmitter.TYPES.USER_REGISTERED, user => {
            sockets.filter(s => s.isAdmin)
                .forEach(s => {
                    s.emit(EventEmitter.TYPES.USER_REGISTERED, user)
                    s.emit(EventEmitter.TYPES.USER_NOTIFY, `Зарегистрирован новый пользователь: ${user.firstName} ${user.lastName}`)
                })
        })

        EventEmitter.subscribe('REQUEST_ACCEPTED', ({email, eventTitle}) => {
            EventEmitter.emit(EventEmitter.TYPES.USER_NOTIFY, ({ email, message: eventTitle }))
        })

        io.on('connection', socket => {
            console.log('!CONNECTED!')
            sockets = [...sockets, socket]
            console.log('sockets: ' + sockets.length)
            socket.on('disconnect', () => {
                sockets = sockets.filter(s => s !== socket)
            })
            socket.on('SEND_MESSAGE', ({ email, message }) => {
                EventEmitter.emit('USER_NOTIFY', {email, message})
            })
            socket.on('AUTHORIZE', async ({token}) => {
                console.log('got AUTHORIZE')

                console.log({token})
                let parsedToken
                try {
                    parsedToken = await validateToken(token)
                    console.log({parsedToken})
                } catch(err) {
                    console.log('failed to validate token')
                    return
                }
                const user = await db.findOneInCollection('users', {email: parsedToken.email})
                console.log({user})
                socket.email = parsedToken.email
                socket.isAdmin = !!user.isAdmin
                console.log('!AUTHORIZED!' + ' ' + socket.email + ' isAdmin ' + socket.isAdmin)

            })
        })

        EventEmitter.subscribe(EventEmitter.TYPES.USER_NOTIFY, async ({email, message}) => {
            console.log('EVENT EMITTER ON USER_NOTIFY')
            const userConnections = sockets.filter(s => s.email === email)
            console.log({userConnections})
            if (userConnections && userConnections.length) {
                userConnections.forEach(connection => {
                    connection.emit(EventEmitter.TYPES.USER_NOTIFY, message)
                })
            }
            const user = await db.findOneInCollection('users', {email})
            if (!user) return
            const { token } = user
            console.log({ token })
            if (!token || !Expo.isExpoPushToken(token)) {
                console.log('token is invalid')
                return
            }

            push([token], {
                title: message
            })
        })

        server.listen(process.env.PORT, '0.0.0.0', () => {
            console.log('app is listening on ' + process.env.PORT + ' port')
        })
    })
    .catch(err => {
        console.log(err)
    })

