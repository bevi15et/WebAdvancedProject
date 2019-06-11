module.exports = function({orderRepository}){
    return{

        //Basket
        addProductToBasket: function(productId, accountId, api, callback){
            const isLoggedIn
            const accountId

            if(api && account != null){      
                accountId = account.accountId
                


            } else {
                isLoggedIn = req.session.isLoggedIn
                accountId = req.session.accountId
                
                if(isLoggedIn){  /*TODO*/  }
            }
        },
    
        removeProductFromBasket: function(basket, item, callback){/*TODO*/},

        showBasket: function(isLoggedIn, basket, callback){/*TODO*/},

        //Orders
        placeOrder: function(account, api, basket, callback){
            if(api){
                /**TODO */
            }else{
                /**TODO */
            }
        },

        showHistory: function(account, api, callback){
            const isLoggedIn
            const accountId

            if(api && account != null){      
                isLoggedIn = true
                accountId = account.accountId
            } else {
                isLoggedIn = req.session.isLoggedIn
                accountId = req.session.accountId
            }
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

        updateOrderStatus: function(orderId, api, status, callback){/*todo*/},
    
        removeOrder: function(orderId, api, callback){ /**todo */}
    }
}