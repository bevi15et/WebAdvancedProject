module.exports = function({orderRepository}){
    return{

        addProductToBasket: function(productId, accountId, callback){
             
            if(accountId){
                orderRepository.getOrderId(function(orderId, error){
                    if(error){
                        callback(null, error)
                    } else {
                        orderRepository.insertProductInOrder(orderId, productId, function(error){
                            if(error){
                                callback(error)
                            } else {
                                callback(null)
                            }
                        })
                        console.log("login: ", accountId, ", orderId: ", orderId, ", productId: ", productId)            
           
                    }
                })
            } else {                
                errors.push("User not logged in")
                callback(null, error)
            }
        },
    

        removeProductFromBasket: function(productId, callback){
            const isLoggedIn = req.session.isLoggedIn
            const orderId = req.session.orderId

            if(isLoggedIn) {
                orderRepository.deleteFromOrder(orderId, productId, function(error){
                    if(error){
                        callback("Failed to remove item from basket")
                    } else {
                        callback(null)
                    }
                })
            } else {
                callback("User not logged in")
            }
        },

        showBasket: function(isLoggedIn, orderId, callback){

            if(isLoggedIn){
                orderRepository.getCurrentOrder(orderId, function(currentOrder, error){
                    if(error){
                        console.log("manager error: ", error)
                        callback(null, "Failed to load basket")
                    } else {
                        console.log("manager: ", currentOrder)
                        callback(currentOrder, null)
                    }
                })
            } else {
                callback("User not logged in")
            }
        },

        emptyBasket: function(){
            const isLoggedIn = req.session.isLoggedIn
            const orderId = req.session.orderId

            if(isLoggedIn){
                orderRepository.deleteOrder(orderId, function(error){
                    if(error){
                        callback("Failed to drop order")
                    } else {
                        callback(null)
                    }
                })
            } else {
                callback("User not logged in")
            }
        },

        showHistory: function(callback){
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
            
        },

        updateOrderStatus: function(orderId, status, callback){
//todo            
        },
    
    }
}