process.env.SECRET_KEY='f3fj3f093209329f329ru249ty2y248t924u9t834'
process.env.DATABASE_URL = 'mongodb+srv://user:bSmPPoXqyB1QjFmb@cluster0-sxmmm.mongodb.net/test?retryWrites=true&w=majority'
process.env.DATABASE_NAME = 'test'
process.env.PORT=8080

const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const bodyParser = require('body-parser')
const authenticate = require('./middlewares/authenticate')

const {
    getClient,
} = require('./database/client')

const apiRouter = require('./routes/api')


getClient()
    .then(async c => {
        const app = express()
        app.use(bodyParser.json())
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization')
            next()
        })
        app.options('*', (req, res) => {
            res.sendStatus(200)
        })
        app.use(authenticate)
        app.use('/api', apiRouter)
        const server = http.createServer(app)
        const io = socketIo(server)

        server.listen(process.env.PORT, '0.0.0.0', () => {
            console.log('app is listening on ' + process.env.PORT + ' port')
        })
    })
    .catch(err => {
        console.log(err)
    })

