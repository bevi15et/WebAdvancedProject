const jwt = require('jsonwebtoken')
module.exports = function({orderRepository}){
    return{

        //Basket
        addProductToBasket: function(productId, api, callback){
            if(api){
                const token = api

                try {
                    const decoded = jwt.verify(token, process.env.JWT_KEY)
                    const basket = decoded.basket

                    basket.push(productId)
                    callback(basket, null)

                } catch (error) {
                    console.log(error);
                    callback(null, 'Auth failed')
                } 
            }            
        },
    
        removeProductFromBasket: function(item, api, callback){
            if (api){
                const token = api

                try {
                    const decoded = jwt.verify(token, process.env.JWT_KEY)
                    const basket = decoded.basket

                    for(var product = 0; product < basket.length; product++){
                        if(basket[product] == item){
                            basket.splice(product, 1)
                        }
                    }
                    callback(basket, null)

                } catch (error) {
                    console.log(error)
                    callback(null, "Could not remove item from basket")
                }
            }
        },

        //Orders
        getCurrentOrderId: function(api, account, callback){
            if(api){
                const token = api 
                
                try {
                    const decoded = jwt.verify(token, process.env.JWT_KEY)
                    const account = decoded.accountId

                    orderRepository.getOrderId(account, function(currentOrderId, error){
                        if (error){
                            callback(null, "Failed to get id from database")
                        } else {
                            callback(currentOrderId+1, null)
                        }
                    })

                } catch (error) {
                    callback(null, "Auth failed")
                }
            } else if(account){
                orderRepository.getOrderId(account.accountId, function(id, error){
                    if(error){
                        console.log(error);
                        callback(null, "Failed to get id from databse")
                        
                    } else {
                        callback(id, null)

                    }
                })
            
            } else {
                console.log("else in getCurrentOrderId");
                
            }
        },

        getLastSavedOrder: function(api, account, callback){
            if(api){
                //TODO
            
            } else if(account){
                console.log("about to call repository for lastest basket");
                
                orderRepository.getLastSavedOrderId(account.accountId, function(error, orderId){
                    if(error){
                        console.log(error);
                        callback("Could not get order id from database", null)
                        
                    } else {
                        console.log("manager help!!!!!!!!!!, orderID = ", orderId);                        
                        callback(null, orderId)

                    }
                })

            } else {
                console.log("else in ordermanager: getLastSavedOrderId");
                
            }

            orderRepository.getLastSavedOrderId()
        },

        createNewOrder: function(api, account, callback){
            if(api){
                const token = api 
                
                try {
                    const decoded = jwt.verify(token, process.env.JWT_KEY)
                    const apiAccount = decoded.accountId

                    orderRepository.createNewOrder(apiAccount, function(error){
                        if(error) {
                            callback("Database error")

                        } else {
                            callback(null)

                        }
                    })

                } catch (error) {
                    console.log(error)
                    callback("Auth failed")

                }

            } else if (account){
                const id = account.accountId
                orderRepository.createNewOrder(id, function(error){
                    if(error){
                        console.log(error);
                        callback("Could not create new order")

                    } else {
                        callback(null)

                    }
                })
            } else {
                console.log("else in order-manager: createNewOrder");
                
            }
        },

        placeOrder: function(api, account, callback){
            const status = "Order placed, waiting for handeling"

            if(api){
                const token = api

                try {
                    const decoded = jwt.verify(token, process.env.JWT_KEY)
                    const basket = decoded.basket
                    const orderId = decoded.currentOrderId

                    if(!orderId){
                        //TODO
                    } 

                } catch (error) {
                    console.log(error)                    
                    callback(null, "Auth failed")
                }
                    
            } else if (account[0]) {
                orderRepository.insertProductInOrder(account[1], account[2], status, function(error){
                    if(error){
                        console.log(error);
                        callback("Error from databse")
                        
                    } else {
                        console.log("order placed OK");
                        callback(null)
                    }
                })

            } else {
                console.log("else in place order");
                
            }
        },

        showHistory: function(account, api, callback){ //????????????
            if(api && account != null){      
                isLoggedIn = true
                accountId = account.accountId
            } else {
                    const isLoggedIn = req.session.isLoggedIn
                    const accountId = req.session.accountId
                
                if(isLoggedIn){
                    orderRepository.getOrderHistory(accountId, function(orders, error){
                        if(error){
                            callback(null, "Failed to get order history")
                        } else {
                            callback(orders, null)
                        }
                    })

                } else {
                    callback("User not logged in")
                }
            }
        },

        returnSpecificOrder: function(account, api, callback){
            if(api){
                const token = api  
                
                try {    
                    const decoded = jwt.verify(token, process.env.JWT_KEY)
                    const orderId = decoded.currentOrderId
 
                    orderRepository.getSpecificOrder(orderId, function(productIds, error){
                        if(error){
                            console.log(error);
                            callback(null, "Could not get products from order")                            
                        } else {
                            callback(productIds, null)
                        }
                    })

                } catch (error) {
                    console.log(error);
                    callback(null, "Auth failed")
                    
                }              
            } else if(account[0]){
                orderRepository.getCurrentOrder(account[1], function(error, basket){
                    if(error){
                        console.log(error);
                        callback("Could not get order", null)
                        
                    } else {
                        console.log(basket);
                        callback(null, basket)
                        
                    }
                })

            } else {
                console.log("else in order-manager: returnSpecificOrder");
                
            }
        },

        saveBasket: function(account, api, basket, callback){
            const status = "Basket saved on log-out"

            if(api){
                //TODO

            } else if(account[0]){
                orderRepository.insertProductInOrder(account[1], basket, status, function(error){
                  
                    if(error){
                        console.log(error);
                        callback("Error from databse")
                        
                    } else {
                        console.log("order saved for next time");
                        callback(null)
                    }
                })

            } else {
                console.log("else in order-manager: saveBasket");
                
            }
        },

        updateOrderStatus: function(orderId, api, status, callback){/*todo*/},
    
        removeOrder: function(orderId, api, callback){
            if(api){
                //TODO

            } else {
                orderRepository.deleteOrder(orderId, function(error){
                    if(error){
                        console.log(error);
                        callback("Database delete order error")
                        
                    } else {
                        callback(null)

                    }
                })

            }
        }
    }
}