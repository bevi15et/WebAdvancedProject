const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
//const expressSession = require('express-session')
const accountManager = require("../business-logic-layer/account-manager")
const bodyParser = require()

const app = express()

app.set('views', path.join(__dirname, 'views'))

app.engine("hbs", expressHandlebars({
    extname:"hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, 'layouts')
}))

app.use(expressSession({
    secret: 'keyboard dog',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')))


const DB = require("../data-acess-layer/db")
app.get('/', function(req, res){
    const values = ["1", "2"]
    const query = `INSERT INTO orders (customerId, productId) VALUES (?, ?)`
    const selectQuery = `SELECT * FROM orders`
    const dropQuery = `DROP TABLE costumerAccounts`
    console.log("sending")
    DB.query(query, values, function(error){
        console.log(error)
    })
    DB.query(selectQuery, function(error, user){
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

    const email = req.params.email
    const fullName = req.params.fullName
    const password = req.params.password
    const repeatPassword = req.params.repeatPassword
    const adress = req.params.adress
    const postalCode = req.params.postalCode
    
    accountManager.createAccount(email, fullName, password, repeatPassword, adress, postalCode, function(error){
        
    })
  
    
})

app.get('/CreateItem', function(req, res){
    res.render("createItem.hbs")
})

app.get('/updateItem', function(req, res){
    res.render("updateItem.hbs")
})
app.post('/login',function(res,req){
    req.session.loggedInAccount = account
})

app.listen(8080, function(){
    console.log("Web app listening on port 8080")
})