

module.exports = function({productRepository, variousManager}){
    return{


        createProduct: function(account, image, name, description, price, callback){
            if(!image)
                image = {filename:"standard.png"}
            if(account){
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
                        }else if(errors){
                            callback(errors)
                        }
                    })
            }else{
                callback(["you are not authorized!"])
            }
        },

        getProductInformationById: function(account, productId, callback){
            const errors = []
            if(account){
                variousManager.isLoggedInAsAdmin(account, function(errors, admin, user){
                    if(admin){
                        productRepository.getProductInformationById(productId, function(error, product){
                            if(error){
                                errors.push("couldn't get product information!")
                            }else if(product == null){
                                errors.push("no product found!")
                            }else{
                                callback(errors, product)
                                return
                            }
                        })
                    }else{
                        errors.push("You are not authorized!")
                        callback(errors)
                    }
                })
            }else{
                errors.push("youre not authorized")
                callback(errors)
            }
        },

        
        updateProductById: function(account, productName, productDescription, productPrice, productId, callback){
            const errors = []
            if(productName.length == 0){
                errors.push("Title is missing!")
            }else if(productDescription.length == 0){
                errors.push("Description is missing!")
            }else if(productPrice.length == 0){
                errors.push("Price is missing")
            }

            if(account){
                variousManager.isLoggedInAsAdmin(account, function(error, admin){
                    if(admin){
                        const product = {
                            productName: productName,
                            productDescription: productDescription,
                            productPrice: productPrice,
                            productId: productId
                        }
                        productRepository.updateProductById(product, function(error){
                            if(error){
                                callback(error)
                            }
                        })
                    }else{
                        errors.push("You are not authorized")
                    }
                })
            }
            callback(errors)

        },

        deleteProductByID: function(account, productId, callback){
            const errors = []
            if(account){
                variousManager.isLoggedInAsAdmin(account, function(error, admin){
                    if(error.length > 0){
                        errors.push("You are not authorized, error!" + error)
                        callback(errors)
                    }else if(admin){
                        productRepository.deleteProductByID(productId, function(error){
                            if(error){
                                errors.push("Couldn't delete product!")
                                callback(errors)
                                return
                            }else{
                                callback(errors)
                                return
                            }
                        })
                    }else{
                        errors.push("You are not authorized, else!")
                        callback(errors)
                    }
                })
            }else{
                errors.push("You are not authorized, not logged in!")
                callback(errors)
            }
        }

        

    }
}