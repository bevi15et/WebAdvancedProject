const accountRepository = require('../data-acess-layer/account-repository')
const accountValidator = require('./account-validator')

module.exports = function(container){
    return{
<<<<<<< HEAD
        
        createAccount: function(account, callback){

            container.accountRepository.createAccount(callback)
            
            const errors = accountValidator.getErrorsNewAccount(account)
            if(errors.length > 0){
                callback(errors, null)
                return
            }
            accountRepository.createAccount(account, callback)
        },
        
        getAccountByUsername: function(username, callback){
            container.accountRepository.getAccountByUsername(username, callback)
        },




    }
}




=======

        createAccount: function(account, callback){
    
            const errors = accountValidator.getErrorsNewAccount(account)
        
            if(errors.length > 0){
                callback(errors, null)
                retrurn
            }
        
            accountRepository.createAccount(account, callback)
        },
                
        getAccountByUsername: function(username, callback){
            accountRepository.getAccountByUsername(username, callback)
        }
        

    }
}


>>>>>>> 47675ae88b956d73b10c6c658553cd72ad7e7c47
