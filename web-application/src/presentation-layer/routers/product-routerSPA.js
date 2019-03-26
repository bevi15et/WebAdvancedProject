const express = require('express')
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')

const router = express.Router()


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



router.delete('/product', function(req, res){
    const account = req.session.loggedInAccount
    const productId = req.body.productId

    productManager.deleteProductByID(account, productId, function(errors){
        if(errors.length > 0){
            res.status(200).json("productDetails.hbs", {error: errors})
        }else{
            res.status(200).json("/selection")
        }
    })

})

router.get('/product', function(req, res){
    const account = req.session.loggedInAccount
    const productId = req.query.productId

    productManager.getProductInformationById(account, productId ,function(error, product){
        if(error.length > 0){
            res.status(200).json("updateProduct.hbs", {error: error})
        }else{
            res.status(200).json("updateProduct.hbs", {product: product,id:productId})
        }
    })
})

router.put('/product', function(req, res){
    const account = req.session.loggedInAccount
    const ProductName = req.body.ProductName
    const productDescription = req.body.productDescription
    const productPrice = req.body.productPrice
    const productId = req.query.productId


    productManager.updateProductById(account, ProductName, productDescription, productPrice,productId, function(errors){
        if(errors.length > 0){
            res.status(200).json("updateProduct.hbs", {error: errors})
        }else{
            res.status(200).json('/Selection')
        }
    })
    
})

router.post('/product', upload ,function(req, res){
    let account = null
    jwt.verify(req.get("Authorization").split(' ')[1], "secret", function(error, decoded)    {    
        if(req.get("Authorization"))
            account = decoded.account
        
        const name = req.body.newProductName
        const description = req.body.newProductDescription
        const price = req.body.newProductPrice
        
        productManager.createProduct(account, null, name, description, price, function(error){
            if(error){
                res.status(200).json("addProduct.hbs", {error: error})
            }else{
                productRepository.getLatestProductId(function(error, productId){
                    if(error){
                        res.status(200).json("addProduct.hbs", {error: error})
                    }else{
                        res.status(200).json("/products/productDetails/" + productId.id)
                    }
                    
                })
            }
            
        })
    })
})

router.get('/productDetails/:id', function(req, res){

    const productId = req.params.id
    const account = req.session.loggedInAccount
    
    variousManager.isLoggedInAsAdmin(account, function(errors, admin, user){
        if(errors.length > 0){
            res.status(200).json({error: errors})
        }else if(admin){
            productRepository.getProductById(productId, function(error, product){
                if(error.length > 0){
                    res.status(200).json({error: error})
                }else{
                    const model = {
                        product: product,
                        admin: true
                    }
                    res.status(200).json(model)
                }
            })
        }else if(user){
            productRepository.getProductById(productId, function(error, product){
                if(error.length > 0){
                    res.status(200).json({error: error})
                }else{
                    const model = {
                        isLoggedIn: user,
                        product: product,
                        error: error,
                        admin: false
                    }
                    res.status(200).json(model)
                }
            })
        }else{
            productRepository.getProductById(productId, function(error, product){
                if(error.length > 0){
                    res.status(200).json("productDetails.hbs", {error: error})
                }else{
                    const model = {
                        product: product,
                        error: error,
                        admin: false
                    }
                    res.status(200).json("productDetails.hbs", model)
                }
            })
        }
    })
  

    
})

module.exports = router