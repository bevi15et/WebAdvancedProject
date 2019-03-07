const express = require('express')
const bodyParser = require("body-parser")
const expressSession = require('express-session')


const awilix = require('awilix')
const accountManagerfunc = require('../../business-logic-layer/account-manager')
const accountRepositoryfunc = require('../../data-acess-layer/account-repository')
const accountValidatorfunc = require('../../business-logic-layer/account-validator')
const db = require('../../data-acess-layer/db')
const container = awilix.createContainer()
container.register('accountManager', awilix.asFunction(accountManagerfunc))
container.register('accountRepository', awilix.asFunction(accountRepositoryfunc))
container.register('accountValidator', awilix.asFunction(accountValidatorfunc))
container.register('db', awilix.asValue(db))
const accountManager = container.resolve('accountManager')
const accountRepository = container.resolve('accountRepository')
const accountValidator = container.resolve('accountValidator')
const myDb = container.resolve('db')


const router = express.Router()



router.use(bodyParser.urlencoded({extended: true}))

router.use(expressSession({
    secret: "sdaajsndakjndajks", 
    resave: false,
    saveUninitialized: true
}))







router.post('/create_account', function(req, res){

    const email = req.body.email
    const fullName = req.body.fullName
    const password = req.body.password
    const repeatPassword = req.body.repeatPassword
    const adress = req.body.adress
    const postalCode = req.body.postalCode
    
    accountManager.createAccount(email, fullName, password, repeatPassword, adress, postalCode, function(error){
        if(error){
            res.render('profile.hbs', {error: error})
        }else{
            res.render('selection.hbs')
        }
    }) 
})


router.post('/login',function(req, res)    {

    const email = req.body.email
    const password = req.body.password

    accountManager.signIn(email, password, function(error, account){
        if(error.length > 0){
            console.log(error)
            res.render('profile.hbs', {error: error})
        }else{
            req.session.loggedInAccount = account
            req.session.isLoggedIn = true
            res.render('selection.hbs')
        
        }
    })    
})


module.exports = router