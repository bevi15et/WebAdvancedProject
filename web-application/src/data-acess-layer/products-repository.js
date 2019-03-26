

module.exports = function({db}){
    return {

        getAllProducts: function(callback){

            const query = `SELECT * FROM products`
            const values = []

            db.query(query, values, function(error, products){
                if(error){
                    callback(['databaseError'], null)  
                }else{
                    callback([], products)
                }
            })
        },

        getProductById: function(id, callback){

            const query = `SELECT * FROM products WHERE productId = ?`
            const values = [id]

            db.query(query, values, function(error, product){
                if(error){
                    callback(['databaseError'], null)
                }else{
                    callback([], product[0])
                }
            })
        },

        createProduct: function(product, callback){

            const query = `INSERT INTO products (productImage, productName, productDescription, price) VALUES (?, ?, ?, ?)` 
            const values = [product.productImage, product.productName, product.productDescription, product.productPrice]

            db.query(query, values, function(error){
                callback(error)
            })
        },

        
        getLatestProductId: function(callback){
            const query = `SELECT LAST_INSERT_ID() AS id`

            db.query(query, function(error, id){
                callback(error, id[0])
            })
        },

        
        getProductInformationById: function(productId, callback){
            const query = `SELECT productName, productDescription, price 
                            FROM products 
                            WHERE productId = ?`
            
            const value = [productId]
            db.query(query, value, function(error, product){
                if(error){
                    callback(['databaseError'], null)
                }else{
                    callback(null, product[0])
                }
            })
        },

        
        updateProductById: function(values, callback){
            
            const query = `UPDATE products 
                            SET productName = ?, productDescription = ?, price = ?
                            WHERE productId = ?`
            const values1 = [values.productName, values.productDescription, values.productPrice,values.productId]

            db.query(query, values1, function(error){
                callback(error)
            })
        },

        deleteProductByID: function(productId, callback){
            const query = `DELETE FROM products WHERE productId = ?`

            const value = [productId]
            db.query(query, value, function(error){
                callback(error)
            })
        }


    }
}