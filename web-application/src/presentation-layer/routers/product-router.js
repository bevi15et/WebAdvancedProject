const express = require('express')
const router = express.Router()


// MULTER //
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, '../web-application/src/presentation-layer/public/uploads')
    },
    filename: function(req, file, callback){
        callback(null, file.fieldname + '_' + Date.now() + file.originalname)
    }
})
const upload = multer({storage: storage})
// MULTER //



router.get('/CreateItem', function(req, res){
    res.render("createItem.hbs")
})

router.get('/updateItem', function(req, res){
    res.render("updateItem.hbs")
})

router.get('/addProduct', function(req, res){
    res.render("addProduct.hbs")
})

router.post('/addProduct', upload.single('productImage'), function(req, res){
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

router.get('/productDetails', function(req, res){
    res.render("productDetails.hbs")
})

module.exports = router