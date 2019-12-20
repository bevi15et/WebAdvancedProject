const express = require('express')
const router = express.Router()

module.exports = function({variousManager}){

    router.get('/', function(req, res){
        res.render('home.hbs')
    })


    router.get('/Selection', function(req, res){

        const isLoggedIn = req.session.isLoggedIn
        const account = req.session.loggedInAccount

        variousManager.isLoggedInAsAdmin(account, function(errors, admin, user, products){
            if(admin){
                const model = {
                    products: products,
                    isLoggedInAsAdmin: admin,
                    error: errors
                }
                res.render("selection.hbs", model)
            }else if(user){
                const model = {
                    products: products,
                    isLoggedIn: user,
                    error: errors
                }
                res.render("selection.hbs", model)
            }else{
                const model = {
                    products: products,
                    error: errors
                }
                res.render("selection.hbs", model)
            }
        })

    })

    router.get('/Basket', function(req, res){
        const basket = req.session.basket
        res.render("basket.hbs", {products: basket})
    })



    router.get('/addProduct', function(req, res) {
        const account = req.session.loggedInAccount

        variousManager.adminCheck(account, function(error, admin){
            if(error){
                console.log(error);
                res.render("profile.hbs", {message: error})
            
            } else if(admin) {
                res.render("addProduct.hbs")
    
            } else {
                res.render("profile.hbs", {message: "Not authorized"})
            }       
        })

    })

    return router
}