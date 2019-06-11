const express = require('express')
const bodyParser = require('body-parser')

module.exports = function({apiAccounrRouter, apiOrderRouter}){
    const apiApp = express()
    apiApp.use(bodyParser.urlencoded({extended:false}))
    apiApp.use(bodyParser.json())

    //CORS control
    apiApp.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', '*')
        if(req.method === 'OPTIONS') {
            Response.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
            return res.status(200).json({})
        }
        next()
    })

    apiApp.use('/user', apiAccounrRouter)
    apiApp.use('/order', apiOrderRouter)

    return apiApp
}