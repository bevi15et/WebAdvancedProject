const accountRepository = require('../data-acess-layer/account-repository')
const accountValidator = require('./account-validator')

module.exports = function(container){
    return{
        
        createAccount: function(email, fullName, adress, postalCode, password, callback){
            const errors = []

            const errors = accountValidator.getErrorsNewAccount(account)
            if(errors.length > 0){
                callback(errors, null)
                return
            }
            container.accountRepository.createAccount(account, function(error,results){
                if(error){
                    errors.push("database error")
                }
                callback(errors)
            })
        },
        
        getAccountByUsername: function(username, callback){
            container.accountRepository.getAccountByUsername(username, callback)
        },

    }
}




