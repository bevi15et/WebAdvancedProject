const express = require('express')

const awilix = require('awilix')
const accountManagerfunc = require('../../business-logic-layer/account-manager')
const accountRepositoryfunc = require('../../data-acess-layer/account-repository')
const accountValidatorfunc = require('../../business-logic-layer/account-validator')
const db = require('../../data-acess-layer/db')
const container = awilix.createContainer()
container.register('accountManager', awilix.asFunction(accountManagerfunc))
container.register('accountRepository', awilix.asFunction(accountRepositoryfunc))
container.register('accountValidator', awilix.asFunction(accountValidatorfunc))
container.register('db', awilix.asValue(db))
const accountManager = container.resolve('accountManager')
const accountRepository = container.resolve('accountRepository')
const accountValidator = container.resolve('accountValidator')
const myDb = container.resolve('db')


const router = express.Router()



router.get('/log-out', function(req, res){
    req.session.isLoggedIn = false
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
        }else    
            res.render("profile.hbs")
    })
})


router.post('/changePassword', function(req, res){
    if(req.session.isLoggedIn){
        const isLoggedIn = req.session.isLoggedIn
        const accountId = req.session.loggedInAccount.accountId
        const newPassword = req.body.newPassword
        const repeatNewPassword = req.body.repeatNewPassword

        accountManager.updatePasswordById(accountId, newPassword, repeatNewPassword, function(errors){
            if(errors.length > 0){
                const model = {
                    isLoggedIn: isLoggedIn,
                    changePasswordError: errors
                }
                res.render('profile.hbs', model)
            }else{
                req.session.isLoggedIn = false
                req.session.loggedInAccount = null
                res.redirect('/accounts/Profile')
            }
        })
    }
})


router.post('/deleteAccount', function(req, res){
    if(req.session.isLoggedIn){
        const accountId = req.session.loggedInAccount.accountId

        accountManager.deleteAccountById(accountId, function(error){
            if(error.length > 0){
                //skriv ut error meddelande på sidan
                res.redirect('/accounts/Profile')
            }else{
                req.session.isLoggedIn = false
                req.session.loggedInAccount = null
                res.redirect('/accounts/Profile')
            }
        })
    }else
        res.redirect("/accounts/Profile")
})




router.post('/updateInformation', function(req, res){

    if(req.session.isLoggedIn){
        const isLoggedIn = req.session.isLoggedIn
        const account = req.session.loggedInAccount
        const fullName = req.body.fullName
        const email = req.body.email
        const adress = req.body.adress
        const postalCode = req.body.postalCode

        accountManager.updateInformationById(account.accountId, email, fullName, adress, postalCode, function(errors){
            if(errors.length > 0){
                const model = {
                    isLoggedIn: isLoggedIn,
                    fullName: account.fullName,
                    email: account.email,
                    adress: account.adress,
                    postalCode: account.postalCode,
                    updateError: errors
                }
                res.render('profile.hbs', model)
            }else{
                res.redirect('/accounts/Profile')
            }
        })
    }
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


module.exports = router