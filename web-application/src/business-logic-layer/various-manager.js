

module.exports = function({variousRepository}){
    return{

        isLoggedInAsAdmin: function(account, callback){
            const errors = []
            if(account){
                variousRepository.isLoggedInAsAdmin(account, function(error, admin){
                    if(error){
                        errors.push("not logged in as admin")
                        callback(errors, null, null, null)
                        
                    }
                    variousRepository.getAllProducts(function(error, products) {
                        if(error){
                            errors.push("could not get the products")

                        } else {
                            callback(errors, admin, account, products)
                        
                        }
                    })
                })
            } else {
                variousRepository.getAllProducts(function(error, products) {
                    if(error){
                        errors.push("could not get the products")
                    
                    } else {
                        callback(errors, null, null, products)
                    
                    } 
                })
            }
        },

        adminCheck: function(account, callback){
            if(account){
                variousRepository.isLoggedInAsAdmin(account, function(error, admin) {
                    if(error){
                        console.log(error)    
                        callback("Not authorized", null)
                    
                    } else {
                        callback(null, admin)
                    
                    }
                })
            } else {
                callback("You must be logged in to complete action", null)
         
            }
        }
    }
}