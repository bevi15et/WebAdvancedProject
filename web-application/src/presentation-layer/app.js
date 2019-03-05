const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
//const expressSession = require('express-session')


const app = express()

app.set('views', path.join(__dirname, 'views'))

app.engine("hbs", expressHandlebars({
    extname:"hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, 'layouts')
}))

/*app.use(expressSession({
	secret: 'keyboard dog',
  resave: false,
  saveUninitialized: true
}))
*/
app.use(express.static(path.join(__dirname, 'public')))


const DB = require("../data-acess-layer/db")
app.get('/', function(req, res){
    const values = ["1", "2", "3"]
    const query = `INSERT INTO products (productImage, productName, productDescription) VALUES (?, ?, ?)`
    const selectQuery = `SELECT * FROM products`
    const dropQuery = `DROP TABLE costumerAccounts`
    console.log("sending")
    DB.query(query, values, function(error){
        console.log(error)
    })
    DB.query(selectQuery, function(error,user){
        console.log(error)
        console.log("1")
        console.log(user)
    })
    res.render("home.hbs")
})


app.get('/Selection', function(req, res){
    res.render("selection.hbs")
})

app.get('/Checkout', function(req, res){
    res.render("checkout.hbs")
})

app.get('/Profile', function(req, res){
    res.render("profile.hbs")
})

app.get('/CreateItem', function(req, res){
    res.render("createItem.hbs")
})

app.get('/updateItem', function(req, res){
    res.render("updateItem.hbs")
})

app.listen(8080, function(){
    console.log("Web app listening on port 8080")
})