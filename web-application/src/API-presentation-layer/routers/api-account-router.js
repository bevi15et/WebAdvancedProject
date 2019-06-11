const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

module.exports = function({accountManager}){

    // Create new account (C)
    router.post('/', function(req, res){

        const email = req.body.email
        const fullName = req.body.fullName
        const password = req.body.password
        const repeatPassword = req.body.repeatPassword
        const adress = req.body.adress
        const postalCode = req.body.postalCode
        
        accountManager.createAccount(
            email, 
            fullName, 
            password, 
            repeatPassword, 
            adress, 
            postalCode, 
            function(errors){
            
            if(errors.length > 0){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                res.status(201).json({
                    message: 'Account created successfully',
                    Full_name: fullName,
                    eMail: email,
                    Adress: adress,
                    Postal_code: postalCode
                })
            }
        })
    })
    
    // Get account information (R)
    router.get('/', function(req, res){
        const headerAuth = req.headers.authorization
        
        if(headerAuth){
            const token = headerAuth.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            account = decoded.account 
            
            accountManager.getAccountInformationById(account, function(errors, user){
                if(errors.length < 1){
                    res.status(200).json({
                        message: 'User found',
                        user: user
                    })
                }else{
                    res.status(401).json({
                        message: 'Not authorized',
                        error: errors,
                    })
                }
            })
        } else {
            res.status(401).json({
                message: 'Not authorized'
            })
        }
    })
   
    // Update account information (U)
    router.patch('/', function(req, res){
        const headerAuth = req.headers.authorization
        if(headerAuth) {
            const token = headerAuth.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            account = decoded.account
            
            const fullName = req.body.fullName
            const email = req.body.email
            const adress = req.body.adress
            const postalCode = req.body.postalCode

            accountManager.updateInformationById(
                account, 
                email, 
                fullName, 
                adress, 
                postalCode, 
                function(errors){

                if(errors.length > 0){
                    if(errors[0] == "not signed in!")
                        res.status(401).json({
                            message: 'Not autorized',
                            error: errors
                        })
                    else{
                        res.status(500).json({
                            message: 'Internal server error',
                            error: errors
                        })
                    }
                } else {
                    res.status(200).json({
                        message: 'Updated user successfully',
                        Full_name: fullName, 
                        eMail: email, 
                        Adress: adress, 
                        Postal_code: postalCode
                    })
                }
            })
        } else {
            res.status(401).json('Not authorized')
        }
    })

    // Delete account (D)
    router.delete('/', function(req, res){
        const headerAuth = req.headers.authorization
        var token = null
        var decoded = null

        if(headerAuth){
            token = headerAuth.split(" ")[1]
            decoded = jwt.verify(token, process.env.JWT_KEY)

            accountManager.deleteAccountById(decoded.account, function(errors){
               if(errors > 0){
                    res.status(500).json({
                        message: 'Internal server error',
                        error: errors
                    })
                }else{
                    res.status(200).json({
                        message: 'Account has been deleted'
                    })
                }
            })
        }else{
            res.status(401).json({
                message: 'Not authorized'
            })
        }
    })

    // login to account
    router.post('/login', function(req, res){

        const email = req.body.email
        const password = req.body.password

        accountManager.signIn(email, password, function(errors, account){
            if(errors.length < 1){
                const token = jwt.sign({
                    account: account    
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: '1h'
                })
                res.status(200).json({
                    message: "Logged in as: " + account.fullName,
                    token: token
                })
            }else{
                res.status(404).json({
                    message: 'Wrong user name or password'
                })
            }
        })
    })

    return router
}