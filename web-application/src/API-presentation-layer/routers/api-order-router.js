const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

module.exports = function({orderManager, productManager}){
    
    //See basket
    router.get('/', (req, res) => {
        const headerAuth = req.headers.authorization

        if(headerAuth) {
            const token = headerAuth.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            const basket = decoded.basket

            productManager.getProductsById(basket, function(error, products){
                if(error != null && error.length > 0){
                    console.log(error[0])
                    res.status(500).json({
                        message: "Could not get products"
                    })
                }else{
                    console.log(products)
                    
                    res.status(200).json({
                        message: "Current items in basket",
                        Items: products
                })
            }
        })

    } else {
        res.status(401).json({
            message: "Please log in to view basket"
        })
    }
    })

    //Create new order
    router.get('/neworder', (req, res) => {
        const headerAuth = req.headers.authorization

        if(headerAuth) {
            const token = headerAuth.split(" ")[1]

            orderManager.createNewOrder(token, null, function(error){
                
                switch (error) {
                    case "Database error": {
                        res.status(500).json({
                            message: "Database error"
                        })
                        break
                    }
                    case "Auth failed": {
                        res.status(401).json({
                            message: "Auth failed"
                        })
                        break
                    }
                    default: {
                        res.status(201).json({
                            message: "New order created",
                            token: headerAuth
                        })                                        
                        break
                    }
                }
            })          
            
        } else {
            res.status(401).json({
                message: "Please log in to resume"
            })
        }
    }),

    //get current order id
    router.get('/currentorderid', (req, res) => {  
        const headerAuth = req.headers.authorization

        if(headerAuth) {
            const token = headerAuth.split(" ")[1]
        
            orderManager.getCurrentOrderId(token, null, function(newOrderId, error){
                if(error){
                    res.status(500).json({
                        message: "Failed to getid for new order"
                    })
                } else {
                    const apiAccount = oldToken.account
                    const basket = oldToken.basket
                    
                    const newToken = jwt.sign({
                        account: apiAccount,
                        currentOrderId: newOrderId,
                        basket: basket    
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        })

                    res.status(200).json({
                        message: "Order number found",
                        orderNumber: newOrderId,
                        token: newToken
                    })
                }
            })
        }
    }),
    
    //Show specific order
    router.get('/:orderId', (req, res) => { 
        const headerAuth = req.headers.authorization

        if(headerAuth) {  
            const token = headerAuth.split(" ")[1]
            orderManager.returnSpecificOrder(null, token, function(productIds, error){
                if(error){
                    res.status(404).json({
                        message: "Order not found"
                    })
                } else {
                    productManager.getProductsById(productIds, function(products, error){
                        if(error){
                            console.log(error);
                            res.status(404).json({
                                message: "Products not found"
                            })
                        } else {
                            res.status(200).json({
                                message: "Products in order",
                                Items: products
                            })
                        }
                    })
                }
                
        })} else {
            res.status(401).json({
                message: "Please log in to continue."
            })
        }
    }),

    //Place a new order
    router.post('/', (req, res) => {
        const headerAuth = req.headers.authorization

        if(headerAuth) {  
            const token = headerAuth.split(" ")[1]

            orderManager.placeOrder(token, null, function(token, error){
                switch (error){
                    case "Auth failed": {
                        res.status(401).json({
                            message: "Auth failed"
                        })
                        break
                    }
                    case "Basket empty": {
                        res.status(404).json({
                            message: "You have no items in your basket"
                        })
                        break
                    }
                    case "Database error": {
                        res.status(500).json({
                            message: "Internal database error"
                        })
                    }
                    default: {
                        const account = token.account
                        const orderNumber = token.currentOrderId
                        
                        const newToken = jwt.sign({
                            account: account,
                            currentOrderId: orderNumber,
                            basket: []    
                            }, 
                            process.env.JWT_KEY,
                            {
                                expiresIn: '1h'
                            })
                        res.status(201).json({
                            message: 'Order has been sent',
                            orderNumber: orderNumber,
                            token: newToken
                        })          
                        break
                    
                    }
                } 
            
            })
        } 
    }),      

    //Add product to basket
    router.patch('/:productId', (req, res) => {
        const headerAuth = req.headers.authorization

        if(headerAuth) {  
            const productId = req.params.productId
            const token = headerAuth.split(" ")[1]
            const account = token.account

            orderManager.addProductToBasket(productId, token, function(updatedBasket, error){
                    switch(error){
                        case "Auth failed": {
                            console.log("SC = Auth failed")
                            res.status(401).json({
                                message: "Auth failed"
                            })
                            break   
                        }
                        case "Server error": {
                            console.log("SC = Server error")
                            res.status(500).json({
                                message: "Internal server error"
                            })
                            break
                        }
                        default: {
                            console.log("SC = default")
                            
                            const newToken = jwt.sign({
                                account: account,
                                basket: updatedBasket    
                                }, 
                                process.env.JWT_KEY,
                                {
                                    expiresIn: '1h'
                                })
                            res.status(201).json({
                                message: 'Item added to basket',
                                token: newToken
                            })          
                            break
                        }
                    }
                })
        }else{
            res.status(401).json({
                message: 'Not authorized'
            })
        }
    }),

    //Remove items from order
    router.delete('/:productId', (req, res) => {
        const headerAuth = req.headers.authorization

        if(headerAuth) {  
            const productId = req.params.productId
            const token = headerAuth.split(" ")[1]
            const account = token.account
            const currentOrderId = token.currentOrderId
        
            orderManager.removeProductFromBasket(productId, token, function(updatedBasket, error){
                if(error){
                    res.status(404).json({
                        message: "Could not remove item from basket",
                    })
                }else{
                    const newToken = jwt.sign({
                        account: account,
                        basket: updatedBasket    
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        })

                    res.status(200).json({
                        message: "Item removed from basket",
                        token: newToken
                    })
                }
            })
        }
    })

    return router
}
