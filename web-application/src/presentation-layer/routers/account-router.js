const express = require('express')
const router = express.Router()
module.exports = function({accountManager}){


    router.get('/log-out', function(req, res){
        req.session.isLoggedIn = false
        req.session.loggedInAccount = null
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
                console.log(user.fullName)
                res.render("profile.hbs", model)
            }else{
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
        
        accountManager.createAccount(email, fullName, password, repeatPassword, adress, postalCode, function(errors){
            
            if(errors.length > 0){
                const model = {
                    errors: errors,
                    isLoggedIn: isLoggedIn
                }
                res.render('profile.hbs', model)
            }else{
                res.redirect('/accounts/Profile')
            }
        })
    })


    router.post('/login', function(req, res)    {

        const email = req.body.email
        const password = req.body.password

        accountManager.signIn(email, password, function(errors, account){
            if(account){
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