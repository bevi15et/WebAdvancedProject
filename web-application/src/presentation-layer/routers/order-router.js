const express = require('express')
const router = express.Router()
module.exports = function({orderManager, productManager}){
    
    router.get('/addProductToBasket/:id', function(req, res){
        const productId = req.params.id
        const basket = req.session.basket
        
        if (!basket) {
            req.session.basket = []
        }

        basket.push(productId)
        res.send(basket)        
    })

    router.get('/Basket', function(req, res){
        const basket = req.session.basket
        const errors = []
        const products = []

        if (basket.length > 0){

            for (let i = 0 ; i< basket.length; i++){
                productManager.getProductsById(basket[i], function(error, product){
                    if(error.length > 0){
                        errors.push("Cant load product")
                    } else {
                        let name = product.productName
                        products.push({price:product.price,name:name})
                    }
                    if(i == basket.length - 1)
                        verifyStuff(errors,products)
                })
            }
            verifyStuff = function(errors,products){
                console.log(products)
                const model = {
                    errors: errors,
                    products: products
                }
                
                res.render("basket.hbs", model)
            }
        } else {

            res.render("basket.hbs", {message: "Your basket is empty"})
            
        }

    })

    return router

}
