module.exports = function({db}){
    return {
        
        createNewOrder: function(accountId, callback){
            const query = `INSERT INTO orders (accountId) (?)`
           
            db.query(query, [accountId], function(error){
                if(error){

                    callback(error)
                    return
                }
            })
        },

        getOrderId: function(accountId, callback){
            const idQuery = `SELECT orderId FROM orders WHERE accountId = (?) ORDER BY orderId DESC LIMIT 1`

            db.query(idQuery, [accountId], function(orderId, error){
                if(error){
                    callback(null, error)
                } else {
                    callback(orderId, null)
                }
            })
        },

        insertProductInOrder: function(orderId, productId, callback){
            const query = `INSERT INTO currentOrder (orderId, productId, orderStatus)`
            const values = [orderId, productId, "Waiting for handeling"]


            db.query(query, values, function(error){
                if (error){
                    console.log("repo failed to insert: ", error)                    
                    
                } else {
                    callback(null)
                }
            })
        },

        deleteFromOrder: function(orderId, productId, callback){
            const query = `DELETE FROM currentOrder 
                           WHERE currentOrderId = ? 
                           AND productId = ? 
                           LIMIT 1`
            const values = [orderId, productId]

            db.query(query, values, function(error){
                if (error){
                    callback("Database failed to remove item from order")
                } else {
                    callback(null)
                }   
            })
        },

        deleteOrder: function(orderId, callback){
            const query = `DELETE FROM currentOrder 
                           WHERE currentOrderId = ?`

            db.query(query, [orderid], function(error){
                if(error){
                    callback("Database could not drop order")
                } else {
                    callback(null)
                }
            })
        },

        getCurrentOrder: function(orderId, callback){
            const query = `SELECT * FROM currentOrder WHERE currentOrderId = (?)`
            console.log("getCurrentOrder with id: ", orderId)

            db.query(query, [orderId], function(currentOrder, error){
                if(error){
                    console.log("repo error: ", error)
                    callback(null, "Database could not find current order")
                } else {
                    console.log("repo: ", currentOrder)
                    callback(currentOrder, null)
                }
            })
        },
        
        getOrderHistory: function(accountId, callback){
            const orderQuery = `SELECT * FROM orders WHERE accountId = ?`
            const basketQuery = `SELECT productId, orderStatus, orderId 
                                 FROM currentOrder, orders  
                                 WHERE accountId = ? 
                                 AND orderId = ? 
                                 AND currentOrder.currentOrderId = orders.orderId`
        
            db.query(orderQuery, [accountId], function(orders, error){
                const orders = []

                if(error){
                    callback(null, "Database failed to get old orders")
                } else {

                    for(order in orders){
                        const values = [accountId, order.orderId]
                        db.query(basketQuery, values, function(basket, error){
                            if(error){
                                orders.push("Could not get content from database")
                            } else {
                                orders.push(basket)
                            }
                        })
                    }

                }
                callback(orders)
            })
        },

        getLatestProductId: function(callback){
            const query = `SELECT LAST_INSERT_ID() AS id`
            db.query(query, function(error, id){
                callback(error, id[0])
            })
        }

    }
}