const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()

module.exports = function({productManager, productRepository, variousManager}){


    // MULTER //
    const storage = multer.diskStorage({
        destination: __dirname + "/../public/uploads",
        filename: function(req, file, callback){
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));     
        }
    });

    // init upload 
    const upload = multer({
        storage: storage
    }).single('productImage')
    // MULTER //



    router.post('/deleteProduct', function(req, res){
        const account = req.session.loggedInAccount
        const productId = req.body.productId

        productManager.deleteProductByID(account, productId, function(errors){
            if(errors.length > 0){
                res.render("productDetails.hbs", {error: errors})
            }else{
                res.redirect("/selection")
            }
        })

    })




    router.get('/updateProduct', function(req, res){
        const account = req.session.loggedInAccount
        const productId = req.query.productId

        productManager.getProductInformationById(account, productId ,function(error, product){
            if(error.length > 0){
                res.render("updateProduct.hbs", {error: error})
            }else{
                res.render("updateProduct.hbs", {product: product,id:productId})
            }
        })
    })

    router.post('/updateProduct', function(req, res){
        const account = req.session.loggedInAccount
        const ProductName = req.body.ProductName
        const productDescription = req.body.productDescription
        const productPrice = req.body.productPrice
        const productId = req.query.productId


        productManager.updateProductById(account, ProductName, productDescription, productPrice,productId, function(errors){
            if(errors.length > 0){
                res.render("updateProduct.hbs", {error: errors})
            }else{
                res.redirect('/Selection')
            }
        })
        
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
        const account = req.session.loggedInAccount
        
        variousManager.isLoggedInAsAdmin(account, function(errors, admin, user){
            if(errors.length > 0){
                res.render("productDetails.hbs", {error: errors})
            }else if(admin){
                productRepository.getProductById(productId, function(error, product){
                    if(error.length > 0){
                        res.render("productDetails.hbs", {error: error})
                    }else{
                        const model = {
                            isLoggedInAsAdmin: admin,
                            product: product
                        }
                        res.render("productDetails.hbs", model)
                    }
                })
            }else if(user){
                productRepository.getProductById(productId, function(error, product){
                    if(error.length > 0){
                        res.render("productDetails.hbs", {error: error})
                    }else{
                        const model = {
                            isLoggedIn: user,
                            product: product,
                            error: error
                        }
                        res.render("productDetails.hbs", model)
                    }
                })
            }else{
                productRepository.getProductById(productId, function(error, product){
                    if(error.length > 0){
                        res.render("productDetails.hbs", {error: error})
                    }else{
                        const model = {
                            product: product,
                            error: error
                        }
                        res.render("productDetails.hbs", model)
                    }
                })
            }
        })
    

        
    })

    return router

}