

module.exports = function({accountRepository, accountValidator}){
    return{
        
        createAccount: function(email, fullName, password, repeatPassword, adress, postalCode, callback){
            const errors = []

            const errors = accountValidator.getErrorsNewAccount(email, fullName, password, repeatPassword, adress, postalCode, callback)
            if(errors.length > 0){
                callback(errors, null)
            }
            const account = {email: email, fullName: fullName, password: password, 
            adress: adress, postalCode: postalCode}
            
            accountRepository.createAccount(account, function(error, results){
                callback(error,results)
            })
        },
        
        getAccountByUsername: function(username, callback){
            accountRepository.getAccountByUsername(username, callback)
        },

    }
}




