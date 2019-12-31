module.exports = function({db}){
    return {
        
        createNewOrder: function(accountId, callback){
            console.log("inside repository");
            
            const query = `INSERT INTO orders (accountId) VALUES(?)`
            
            db.query(query, [accountId], function(error){
                if(error){
                    callback(error)
                    return
                }else{
                    callback(null)
                    return
                }
            })
        },

        getOrderId: function(accountId, callback){
            console.log("get order id repository");
            
            const idQuery = `SELECT orderId FROM orders WHERE accountId = (?) ORDER BY orderId DESC LIMIT 1`

            db.query(idQuery, [accountId], function(error, orderId){
                if(error){
                    callback(null, error)
                } else {
                    callback(orderId, null)
                }
            })
        },

        insertProductInOrder: function(orderId, productId, status, callback){
            const insertionQuery = `INSERT INTO currentOrder (currentOrderId, productId, orderStatus) VALUES(?, ?, ?)`

            db.query(insertionQuery, [orderId, productId, status], function(error){
                if(error){
                    callback("Server error")
                    
                } else {
                    callback(null)

                }
            })             
        },

        deleteFromOrder: function(orderId, productId, callback){
            const deletionQuery = `DELETE FROM currentOrder WHERE currentOrderId = ? AND productId = ? LIMIT 1`

            db.query(deletionQuery, [orderId, productId], function(error){
                if(error){
                    callback("Server error")
                    return
                }
                callback(null)
            })
        },

        getCurrentOrder: function(orderId, callback){
            const query = `SELECT productId FROM currentOrder WHERE currentOrderId = (?)`
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
        
        getOrderStatus: function(orderId, callback){
            const statusQuery = `SELECT orderStatus FROM currentOrder WHERE currentOrderId = ? LIMIT 1;`

            db.query(statusQuery, [orderId], function(status, error){
                if(error){
                    callback(null, error)
                } else {
                    callback(status, null)
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

        changeOrderStatus: function(orderId, currentStatus, newStatus, callback){
            /** different order statuses:
              Shipped
              Basket saved on log-out
              Order placed, waiting for handeling
              Order being handeled
              Cancelled
             */

            const updateStatusQuery = `UPDATE currentOrder SET orderStatus = ? WHERE currentOrderId = ? AND orderStatus = ?`

            db.query(updateStatusQuery, [newStatus, orderId, currentStatus], function(error){
                if(error){
                    callback('Server error')
                    return
                }
                callback(null)
            })
        },

        getLastSavedOrderId: function(accountId, callback){
            const lastOrderQuery = `SELECT * FROM orders, currentOrder 
                                    WHERE accountId = ? 
                                    AND orderId = currentOrderId 
                                    AND orderStatus = "Basket saved on log-out" 
                                    ORDER BY orderId DESC 
                                    LIMIT 1`

            db.query(lastOrderQuery, [accountId], function(error, id){
                if(error){
                    console.log(error);
                    callback("Error finding latest saved order", null)
                    
                } else if(id[0]){
                    callback(null, id[0].orderId)
            
                } else {
                    callback(null, null)

                }   

            })
        }, 

        getSpecificOrder: function(orderId, callback){
            const orderQuery = `SELECT productId FROM currentOrder WHERE currentOrderId = ?`

            db.query(orderQuery, [orderId], function(productIds, error){
                if(error){
                    callback(null, 'Server error')

                }
                callback(productIds, null)

            })
        },

        deleteOrder:function(orderId, callback){
            const deleteQuery = `DELETE FROM orders WHERE orderId = ?`

            db.query(deleteQuery, [orderId], function(error){
                if(error){
                    console.log(error);
                    callback("Database error")

                } else {
                    callback(null)
                
                }
            })
        },

    }
}