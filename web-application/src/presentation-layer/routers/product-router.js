const express = require('express')
const multer = require('multer')
const path = require('path')

const awilix = require('awilix')
const productManagerFunc = require('../../business-logic-layer/product-manager')
const productRepositoryFunc = require('../../data-acess-layer/products-repository')
const variousManagerFunc = require('../../business-logic-layer/various-manager')
const variousRepositoryFunc = require('../../data-acess-layer/various-repository')
const db = require('../../data-acess-layer/db')
const container = awilix.createContainer()
container.register("productManager", awilix.asFunction(productManagerFunc))
container.register("productRepository", awilix.asFunction(productRepositoryFunc))
container.register("db", awilix.asValue(db))
container.register("variousManager", awilix.asFunction(variousManagerFunc))
container.register("variousRepository", awilix.asFunction(variousRepositoryFunc))
const productManager = container.resolve('productManager')
const productRepository = container.resolve('productRepository')
const mydb = container.resolve('db')
const variousManager = container.resolve('variousManager')
const variousRepository = container.resolve('variousRepository')



const router = express.Router()


// MULTER //
const storage = multer.diskStorage({
    destination: __dirname + "/../public/uploads",
    filename: function(req,file,callback){
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));     
    }
});

// init upload 
const upload = multer({
    storage: storage
}).single('productImage')
// MULTER //





router.get('/updateItem', function(req, res){
    res.render("updateItem.hbs")
})

router.get('/addProduct', function(req, res){
    res.render("addProduct.hbs")
})

router.post('/addProduct', upload ,function(req, res){

    const account = req.session.loggedInAccount
    const name = req.body.newProductName
    const description = req.body.newProductDescription
    const price = req.body.newProductPrice
    const image = req.file
    
    productManager.createProduct(account, image, name, description, price, function(error){
        if(error){
            res.render("addProduct.hbs", {error: error})
        }else{
            productRepository.getLatestProductId(function(error, productId){
                if(error){
                    res.render("addProduct.hbs", {error: error})
                }else{
                    res.redirect("/products/productDetails/" + productId.id)
                }
                
            })
        }
         
    })
})

router.get('/productDetails/:id', function(req, res){

    const productId = req.params.id
    
    productRepository.getProductById(productId, function(error, product){
        if(error.length > 0){
            res.render("productDetails.hbs", {error: error})
        }else{
            console.log(product)
            res.render("productDetails.hbs", {product: product})
        }
    })

    
})

module.exports = router