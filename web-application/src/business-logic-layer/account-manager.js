

module.exports = function({accountRepository, accountValidator}){
    return{
        
        createAccount: function(email, fullName, password, repeatPassword, adress, postalCode, callback){
            accountValidator.getErrorNewAccount(email, fullName, password, repeatPassword, adress, postalCode, function(errors)    {
                if(errors.length > 0){
                    callback(errors)
                }else{
                    const account = {email: email, fullName: fullName, password: password, 
                        adress: adress, postalCode: postalCode}
                        
                    accountRepository.createAccount(account, function(error){
                        if(error){
                            errors.push("Internal database error, try again later!")
                        }
                        callback(errors)
                    })
                }
            })
        },



        signIn: function(email, password, callback){
            accountValidator.signIn(email, password, callback, function(errors){
                if(errors.length > 0){
                    callback(errors)
                }else{
                    const account = {email: email, password: password}
                    accountRepository.signIn(account, function(error, account){
                        if(error){
                            errors.push("Wrong email and/or password")
                            callback(errors, null)
                        }else{
                            callback(errors, account)
                        }
                    })
                }
            })
        },
        



        getAccountByUsername: function(username, callback){
            accountRepository.getAccountByUsername(username, callback)
        },

    }
}




