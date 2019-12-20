module.exports = function({ORMdb}){
    return {
        
        createNewOrder: function(accountId, callback){ /*TODO*/ },

        getOrderId: function(accountId, callback){ /*TODO*/ },

        insertProductInOrder: function(orderId, productId, callback){ /*TODO*/ },

        deleteFromOrder: function(orderId, productId, callback){ /*TODO*/ },

        getCurrentOrder: function(orderId, callback){ /*TODO*/ },
        
        getOrderOrderStatus: function(orderId, callback){ /*TODO*/ },

        getOrderHistory: function(accountId, callback){ /*TODO*/ },

        changeOrderStatus: function(orderId, currentStatus, newStatus, callback){ /*TODO*/ },

        getLatestOrderId: function(callback){ /*TODO*/ }, 

        getSpecificOrder: function(orderId, callback){ /*TODO*/ },

        deleteOrder:function(orderId, callback){/**TODO */},

    }
}