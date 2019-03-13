

module.exports = function({productRepository, variousManager}){
    return{


        createProduct: function(account, image, name, description, price, callback){
            if(!image){
                callback(["image is empty"])
            }else if(account){
                    variousManager.isLoggedInAsAdmin(account, function(errors, admin, user){
                        if(admin){
                            const values = {
                                productImage: image.filename,
                                productName: name,
                                productDescription: description,
                                productPrice: price
                            }
                            productRepository.createProduct(values, function(error){
                                if(error){
                                    callback(error)
                                }else{
                                    callback(null)
                                }
                            })
                        }else if(user){
                            callback(["you are not authorized!"])
                        }
                    })
            }else{
                callback(["you are not authorized!"])
            }
        },

        

    }
}