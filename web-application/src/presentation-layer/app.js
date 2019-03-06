const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const accountManager = require("../business-logic-layer/account-manager")
const bodyParser = require("body-parser")

const awilix = require('awilix')
const accountRepositoryfunc = require('../data-acess-layer/account-repository')
const accountValidatorfunc = require('../business-logic-layer/account-validator')
const db = require('../data-acess-layer/db')
const container = awilix.createContainer()
container.register('accountRepository', awilix.asFunction(accountRepositoryfunc))
container.register('accountValidator', awilix.asFunction(accountValidatorfunc))
container.register('db', awilix.asValue(db))
const accountRepository = container.resolve('accountRepository')
const accountValidator = container.resolve('accountValidator')
const myDb = container.resolve('db')

const app = express()
app.set('views', path.join(__dirname, 'views'))

app.engine("hbs", expressHandlebars({
    extname:"hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, 'layouts'),
    partialsDir: path.join(__dirname, "views/partials"),
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))


const DB = require("../data-acess-layer/db")
app.get('/', function(req, res){
    //const values = []
    //const query = `INSERT INTO orders (customerId, productId) VALUES (?, ?)`
    const selectQuery = `SELECT * FROM customerAccounts`
    //const dropQuery = `DROP TABLE costumerAccounts`
    console.log("sending")
    //DB.query(query, values, function(error){
    //    console.log(error)
    //})
    myDb.query(selectQuery, function(error, user){
        console.log(error)
        console.log("1")
        console.log(user)
    })
    res.render("home.hbs")
})


app.get('/Selection', function(req, res){
    const db = require("../business-logic-layer/account-manager")
    db.createAccount(account,function(error){})
    res.render("selection.hbs")
})

app.get('/Checkout', function(req, res){
    res.render("checkout.hbs")
})

app.get('/Profile', function(req, res){
    res.render("profile.hbs")
})

app.post('/create_account', function(req, res){

    const email = req.body.email
    const fullName = req.body.fullName
    const password = req.body.password
    const repeatPassword = req.body.repeatPassword
    const adress = req.body.adress
    const postalCode = req.body.postalCode
    
    accountManager.createAccount(email, fullName, password, repeatPassword, adress, postalCode, function(error){
        
    })
  
    
})

//app.use("/account",accountRouter)

app.get('/CreateItem', function(req, res){
    res.render("createItem.hbs")
})

app.get('/updateItem', function(req, res){
    res.render("updateItem.hbs")
})
app.post('/login',function(res,req){
    req.session.loggedInAccount = account
})

app.get('/addProduct', function(req, res){
    res.render("addProduct.hbs")
})

app.get('/productDetails', function(req, res){
    res.render("productDetails.hbs")
})

app.listen(8080, function(){
    console.log("Web app listening on port 8080")
})