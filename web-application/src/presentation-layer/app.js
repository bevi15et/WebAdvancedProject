const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')

const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const productRouter = require('./routers/product-router')

// MULTER //
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, '../public/uploads')
    },
    filename: function(req, file, callback){
        callback(null, file.fieldname + '_' + Date.now())
    }
})
const upload = multer({storage: storage})
// MULTER //

const app = express()

app.set('views', path.join(__dirname, 'views'))

app.engine("hbs", expressHandlebars({
    extname:"hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, 'layouts'),
    partialsDir: path.join(__dirname, "views/partials"),
}))

// Handle static files in the public folder.
app.use(express.static(path.join(__dirname, 'public')))

// Attach all routers.
app.use('/', variousRouter)
app.use('/accounts', accountRouter)
app.use('/products', productRouter)

const DB = require("../data-acess-layer/db")
app.get('/', function(req, res){
    const dropQuery1 = `DROP TABLE orders`
    const dropQuery2 = `DROP TABLE products`
    const dropQuery3 = `DROP TABLE customerAccounts`
    console.log("sending")
    /*
    DB.query(dropQuery1, function(error){
        console.log(error)
    })
    DB.query(dropQuery2, function(error){
        console.log(error)
    })
    DB.query(dropQuery3, function(error){
        console.log(error)
    })
    */
    
    /*myDb.query(selectQuery, function(error, user){
        console.log(error)
        console.log("1")
        console.log(user)
    })*/
    res.render("home.hbs")
})

// MULTER //

app.post('/addProduct', upload.single('productImage'), function(req, res){
    const image = req.file
    const name = req.body.newProductName
    const description = req.body.newProductDescription
    const price = req.body.newProductPrice

    console.log("Body: ", req.body)
    console.log("Image: ", image)

    const model = {
        productName: name,
        productDescription: description,
        productPrice: price,
        productImage: image
    }

    res.send(model)
})

// MULTER //


app.listen(8080, function(){
    console.log("Web app listening on port 8080")
})