

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
        }
    }
}