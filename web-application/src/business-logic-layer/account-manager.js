const bcrypt = require('bcryptjs')

module.exports = function({accountRepository, accountValidator}){
    return{
        
        createAccount: function(email, fullName, password, repeatPassword, adress, postalCode, callback){
            console.log("inside account manager, calling account validator.");
            const errors = []
            
            accountValidator.getErrorNewAccount(email, fullName, password, repeatPassword, adress, postalCode, function(error)    {
                if(error){
                    console.log("account validator returned an error: ", error);
                    
                    callback(error)
                }else{
                    bcrypt.genSalt(10, function(err, salt) {
                        if(err) {
                            errors.push("Failed to enhance the password!")
                            console.log(errors);
                            
                            callback(errors)
                        }
                        bcrypt.hash(password, salt, function(err, hash) {
                            if(err) {
                                errors.push("Failed to hash the password!")
                                console.log(errors);

                                callback(errors)
                            }else{
                                const account = {
                                    email: email, 
                                    fullName: fullName, 
                                    password: hash, 
                                    adress: adress, 
                                    postalCode: postalCode
                                }
                                accountRepository.createAccount(account, function(message, error){
                                    if(error){
                                        console.log("error from account repository: ", error);
                                        
                                        errors.push(error)
                                        callback(null, errors)
                                    }
                                    console.log(message);
                                    
                                    callback(account, null)
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
                    console.log("validation failed");
                    
                }else{
                    console.log("validation successfull");
                    
                    const userAccount = {email: email}
                    accountRepository.signIn(userAccount, function(error, dbAccount){
                        if(typeof dbAccount == "undefined"){
                            console.log(error);
                            
                            callback("Wrong Email and/or Password", null)
                        }else{
                            console.log("About to compare passwords!");
                            bcrypt.compare(password, dbAccount.password, function(errors, result){
                                if(result == true){
                                    callback(errors, dbAccount)
                                }else{
                                    callback("Wrong Email and/or Password", null)
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
            const errors = []
            if(!account){
                callback("not signed in!")
                return
            }else{
                console.log(account.accountId);
                
                accountRepository.deleteAccountById(account.accountId, function(error){
                    if(error){
                        console.log(error)
                        
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




