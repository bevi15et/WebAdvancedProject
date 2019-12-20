const express = require('express')
const router = express.Router()
module.exports = function({orderManager, productManager}){
    
    //Basket
    router.get('/addProductToBasket/:id', function(req, res){
        const productId = req.params.id
        const account = req.session.loggedInAccount

        if(!req.session.orderId && account){
            console.log("creating new order");

            orderManager.createNewOrder(null, account, function(error){
                console.log("creation of new order");
                
                if(error){
                    console.log(error);
                    
                } else {
                    console.log("about to get id");
                    
                    orderManager.getCurrentOrderId(null, account, function(orderId, error){
                        console.log("getting id ", orderId[0].orderId);
                        
                        if(error){
                            console.log(error);

                        } else {
                            console.log("new order ", orderId);
                            req.session.orderId = orderId[0].orderId

                        }
                    })
                    
                }

            })            
        }
        
        if(req.session.basket) {
            console.log("basket");
            
            const basket = req.session.basket
            basket.push(productId)
            req.session.basket = basket
            const model = {
                message: "Has been added to basket",
            }
            res.render('productDetails.hbs', model)

        } else {
            console.log("no basket");
            
            const basket = [productId]
            req.session.basket = basket

            const model = {
                message: "Has been added to a new basket",
            }
            res.render('productDetails.hbs', model)
        }
     
    })

    router.get('/Basket', function(req, res){
        const basket = req.session.basket
        const errors = []
        const products = []

        if (basket && basket.length > 0){
            for (let i = 0; i < basket.length; i++){

                productManager.getProductById(basket[i], function(error, product){
                    if(error){
                        console.log(error);
                        
                        errors.push("Can't load item")

                    } else {
                        products.push({name:product.productName, price:product.price})
                    
                    }
                    if(i == basket.length -1) {
                        verifyDone(errors, products)
               
                    }
                })
            }

            verifyDone = function(errors, products){
                console.log(products)

                const model = {
                    message: errors,
                    products: products
                }
                res.render("basket.hbs", model)

            }              
 
        } else {
            res.render("basket.hbs", {message: "Your basket is empty"})
            
        }
    })

    router.get('/emptyBasket', function(req, res){
        req.session.basket = []
        res.render('basket.hbs', {message: "Basket have been emptied"})
    })

    router.get('/removeItemFromBasket:name', function(req, res){
        const basket = req.session.basket
        const itemName = req.params.name
        const newBasket = []
        let removeOne = 1

        for(item in basket){
            if(item.name = itemName && removeOne){
                removeOne--
            
            } else {
                newBasket.push(item)
                
            }
        }        
        req.session.basket = newBasket
        res.render("basket.hbs", {message: "Item removed from basket"})

    })

    //Order
    router.get('/placeOrder', function(req, res){
        console.log("get placeorder");
        
        const basket = req.session.basket
        const account = req.session.loggedInAccount
        const orderId = req.session.orderId
        const newOrder = [account, orderId, null]
        const errors= []

        if(basket && basket.length > 0) {
            for(let i = 0; i < basket.length; i++) {
                newOrder[2] = basket[i]

                orderManager.placeOrder(null, newOrder, function(error){
                    if(error){
                        errors.push("Item " + i + " not inserted in order")
                    
                    }
                    if(i == basket.length -1){
                        verifyOrderPlaced(errors, orderId)
                        
                    } 
                })
            }

            verifyOrderPlaced = function(errors, orderId) {
                if(errors.length > 0) {
                    res.render("basket.hbs", {message: errors})

                } else {
                    req.session.basket = null
                    req.session.orderPlaced = true
                    res.render("basket.hbs", {message: "Your order has been placed and your ordernumber is: " + orderId})
                
                }
            }

        } else {
            res.render("basket.hbs", {message: "No items in basket."})

        }
    })

    return router

}
