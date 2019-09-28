const webpackMerge = require('webpack-merge')
const commonWebpackSettings = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const proxy = require('express-http-proxy')
const STATIC_PAGES = require('./server/STATIC_PAGES')
const antiCorsMiddleware = require('./server/middlewares/anti-cors')

module.exports = webpackMerge(commonWebpackSettings, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: commonWebpackSettings.plugins.concat([
        new HtmlWebpackPlugin({
            template: path.resolve('./server/views/index.ejs'),
            templateParameters: {
                title: 'DEVSERVER',
            },
        }),
    ]),
    devServer: {
        port: 8081,
        overlay: true,
        contentBase: [
            path.join(__dirname, 'server/public'),
            path.join(__dirname, 'styles/pages'),
        ],
        // proxy: {
        //     '/api': 'http://127.0.0.1:8080/',
        // },
        before: (app) => {
            app.set('view engine', 'ejs')

            app.use(antiCorsMiddleware)

            ;STATIC_PAGES.forEach(pageUrl => {
                app.get(pageUrl, (req, res) => {
                    res.render(path.resolve('./server/views/index.ejs'), {
                        title: 'DEVSERVER'
                    })
                })
            })
        },
    },
})