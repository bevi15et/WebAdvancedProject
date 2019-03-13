

module.exports = function({variousRepository}){
    return{

        isLoggedInAsAdmin: function(account, callback){
            const errors = []
            if(account){
                variousRepository.isLoggedInAsAdmin(account, function(error, admin){
                    if(error){
                        errors.push("not logged in as admin")
                        callback(errors, null, null, null)
                        return
                    }
                    variousRepository.getAllProducts(function(error, products) {
                        if(error){
                            errors.push("could not get the products")
                        }else{
                            callback(errors, admin, account, products)
                        }
                    })
                })
            }else{
                variousRepository.getAllProducts(function(error, products) {
                    if(error){
                        errors.push("could not get the products")
                    }else{
                        callback(errors, null, null, products)
                    } 
                })
            }
        },




    }
}