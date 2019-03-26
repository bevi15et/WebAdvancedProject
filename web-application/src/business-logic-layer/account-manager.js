const bcrypt = require('bcryptjs')

module.exports = function({accountRepository, accountValidator}){
    return{
        
        createAccount: function(email, fullName, password, repeatPassword, adress, postalCode, callback){
            accountValidator.getErrorNewAccount(email, fullName, password, repeatPassword, adress, postalCode, function(errors)    {
                if(errors.length > 0){
                    callback(errors)
                }else{
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(password, salt, function(err, hash) {
                            if(err) {
                                errors.push("Failed to hash the password!")
                                callback(errors)
                            }else{
                                const account = {email: email, fullName: fullName, password: hash, 
                                    adress: adress, postalCode: postalCode}
                                accountRepository.createAccount(account, function(error){
                                    if(error){
                                        errors.push(error)
                                        callback(errors)
                                    }
                                    callback(errors)
                                })
                            }
                        })
                    })
                }
            })
        },



        signIn: function(email, password, callback){
            accountValidator.signIn(email, password, function(errors){
                if(errors.length > 0){
                    callback(errors, null)
                }else{
                    const userAccount = {email: email}
                    accountRepository.signIn(userAccount, function(error, dbAccount){
                        if(typeof dbAccount === "undefined"){
                            errors.push("Wrong Email and/or Password")
                            callback(errors, null)
                        }else{
                            bcrypt.compare(password, dbAccount.password, function(err, result){
                                if(result == true){
                                    callback(errors, dbAccount)
                                }else{
                                    errors.push("Wrong Email and/or Password")
                                    callback(errors, null)
                                }
                            })
                        }
                    })
                }
            })
        },


        getAccountInformationById: function(account , callback){
            var accountId
            if(account){
                accountId = account.accountId;
            }else{
                callback(["not signed in!"], null)
                return
            }

            accountRepository.getAccountInformationById(accountId, function(error, user){
                const errors = []
                if(error){
                    errors.push(error)
                }else if(user == null)
                    errors.push("no user found")
                callback(errors, user)
            })
            
        },
        


        updateInformationById: function(account, email, fullName, adress, postalCode, callback){
            var accountId 
            if(!account){
                callback(["not signed in!"])
                return
            }else{
                accountId = account.accountId
                accountValidator.getErrorUpdateAccount(email, fullName, adress, postalCode, function(errors){
                    if(errors.length > 0){
                        callback(errors)
                    }else{
                        const account = {accountId: accountId, email: email,
                            fullName: fullName, adress: adress, postalCode: postalCode}
    
                        accountRepository.updateInformationById(account, function(error){
                            if(error){
                                callback(error)
                            }else{
                                callback(errors)
                            }
                        })
                    }
                })
            }
              
        },


        updatePasswordById: function(account, newPassword, repeatNewPassword, callback){
            var accountId
            if(!account)    {
                callback(["not signed in!"])
                return
            }else{
                accountId = account.accountId
                accountValidator.getErrorUpdatePassword(newPassword, repeatNewPassword, function(errors){
                    if(errors.length > 0){
                        callback(errors)
                    }else{
                        bcrypt.genSalt(10, function(err, salt) {
                            if(err){
                                errors.push("Failed generating salt!")
                                callback(errors)
                            }else{
                                bcrypt.hash(newPassword, salt, function(err, hash) {
                                    if(err){
                                        errors.push("Failed to hash the password!")
                                        callback(errors)
                                    }else{
                                        const accountPw = {account: accountId, newPassword: hash}
                                        accountRepository.updatePasswordById(accountPw, function(error){
                                            if(error){
                                                errors.push("Internal database error, try again later!")
                                                callback(error)
                                            }else{
                                                callback(errors)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        },


        deleteAccountById: function(account, callback){
            let accountId
            const errors = []
            if(!account){
                callback("not signed in!")
                return
            }else{
                accountId = account.accountId
                accountRepository.deleteAccountById(accountId, function(error){
                    if(error){
                        errors.push("Internal database error, try again later!")
                        callback(error)
                    }else{
                        callback(errors)
                    }
                })
            }
        },


    }
}




