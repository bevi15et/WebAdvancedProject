const path = require('path')
const express = require('express')
const bodyParser = require("body-parser")
const expressHandlebars = require('express-handlebars')
const expressSession = require('express-session')
const redisStore = require('connect-redis')(expressSession)

module.exports = function({variousRouter,accountRouter,productRouter}){

    const app = express()

    app.use(bodyParser.urlencoded({extended: true}))


    // Setup express-handlebars.
    app.set('views', path.join(__dirname, 'views'))

    app.engine("hbs", expressHandlebars({
        extname:"hbs",
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, 'layouts'),
        partialsDir: path.join(__dirname, 'views/partials'),
    }))

    // Handle static files in the public folder.
    app.use(express.static(path.join(__dirname, 'public')))


    // expressSession
    app.use(expressSession({
        secret: "sdaajsndakjndajks", 
        resave: false,
        saveUninitialized: true,
        store: new redisStore({host: 'redis'})
    }))


    // Attach all routers.
    app.use('/', variousRouter)
    app.use('/accounts', accountRouter)
    app.use('/products', productRouter)
    //app.use('/orders', orderRouter)
    //app.use('/variousSPA',variousRouterSPA)
    //app.use('/productSPA',productRouterSPA)

    return app
}
