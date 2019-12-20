const express = require('express')
const router = express.Router()
module.exports = function({accountManager, orderManager}){


    router.get('/log-out', function(req, res){
        const basket = req.session.basket
        const orderId = req.session.orderId
        const account = req.session.loggedInAccount
        const orderPlaced = req.session.orderPlaced
        const package = [account, orderId]

        if(basket && basket.length > 0){
            orderManager.saveBasket(package, null, basket, function(error){
                if(error) {
                    console.log(error);

                } else {
                    console.log("router order save...");

                }
            })
        } else if (!orderPlaced) {
            orderManager.removeOrder(orderId, null, function(error){
                if(error){
                    console.log(error);
                    
                } else {
                    console.log("router order delete on logout");
                    
                }
            })

        }

        req.session.isLoggedIn = false
        req.session.loggedInAccount = null
        req.session.basket = null
        req.session.orderId = null
        req.session.orderPlaced = null
        res.render('profile.hbs')
    })

    router.get('/Profile', function(req, res)   {   
        const isLoggedIn = req.session.isLoggedIn
        const account = req.session.loggedInAccount

        accountManager.getAccountInformationById(account, function(errors, user){
            if(user){
                const model = {
                    isLoggedIn: isLoggedIn,
                    fullName: user.fullName,
                    email: user.email,
                    adress: user.adress,
                    postalCode: user.postalCode,
                    errors: errors
                }
                res.render("profile.hbs", model)
            
            } else {
                console.log(errors)
                res.render("profile.hbs")
            
            }
        })
    })

    router.post('/changePassword', function(req, res){
        const isLoggedIn = req.session.isLoggedIn
        const account = req.session.loggedInAccount
        const newPassword = req.body.newPassword
        const repeatNewPassword = req.body.repeatNewPassword

        accountManager.updatePasswordById(account, newPassword, repeatNewPassword, function(errors){
            if(errors.length > 0){
                const model = {
                    isLoggedIn: isLoggedIn,
                    changePasswordError: errors
                }
                res.render('profile.hbs', model)
            }else{
                res.redirect('/accounts/Profile')
            }
        })
    })

    router.post('/deleteAccount', function(req, res){
            const isLoggedIn = req.session.isLoggedIn
            const account = req.session.loggedInAccount

            accountManager.deleteAccountById(account, function(errors){
                if(errors.length > 0){
                    const model = {
                        isLoggedIn: isLoggedIn,
                        errors: errors
                    }
                    res.render('profile.hbs', model)
                }else{
                    req.session.isLoggedIn = false
                    req.session.loggedInAccount = null
                    res.redirect('/accounts/Profile')
                }
            })
    })

    router.post('/updateInformation', function(req, res){

        const isLoggedIn = req.session.isLoggedIn
        const account = req.session.loggedInAccount
        const fullName = req.body.fullName
        const email = req.body.email
        const adress = req.body.adress
        const postalCode = req.body.postalCode

        accountManager.updateInformationById(account, email, fullName, adress, postalCode, function(errors){
            if(errors.length > 0){
                if(errors[0] == "not signed in!")
                    res.status(404)
                else{
                    const model = {
                        isLoggedIn: isLoggedIn,
                        fullName: account.fullName,
                        email: account.email,
                        adress: account.adress,
                        postalCode: account.postalCode,
                        updateError: errors
                    }
                    res.render('profile.hbs', model)
                }
            }else{
                res.redirect('/accounts/Profile')
            }
        })
    })

    router.post('/create_account', function(req, res){

        const isLoggedIn = req.session.isLoggedIn
        const email = req.body.email
        const fullName = req.body.fullName
        const password = req.body.password
        const repeatPassword = req.body.repeatPassword
        const adress = req.body.adress
        const postalCode = req.body.postalCode
        console.log("calling account manager");
        
        
        accountManager.createAccount(email, fullName, password, repeatPassword, adress, postalCode, function(account, errors){
            if(!errors){
                console.log("no errors, creating model");
                
                const model = {
                    errors: errors,
                    isLoggedIn: isLoggedIn,
                    name: account.fullName
                }
                res.render('profile.hbs', model)
            }else{
                console.log("account manager returned error");
                
                res.render('/accounts/Profile', {error: errors})
            }
        })
    })

    router.post('/login', function(req, res)    {

        const email = req.body.email
        const password = req.body.password
        const errors = []

        accountManager.signIn(email, password, function(error, account){
            if(error){
                console.log(error);
                errors.push(error)
                
            } else if(account){
        /*      console.log("inside if account");
                
                orderManager.getLastSavedOrder(null, account, function(error, orderId){
                    console.log("called manager: getLastSavedOrder");
                    
                    if(error){
                        console.log(error);
                        errors.push(error)
                        
                    } else if (orderId) {
                        req.session.orderId = orderId

                    } else {
                        console.log("No saved baskets");

                    }
                })*/

                req.session.loggedInAccount = account
                req.session.isLoggedIn = true
                res.redirect('/Selection')

            }else{
                res.render('profile.hbs', {errors: errors})
            
            }
        })
    })

    return router
}