const express = require('express')
const expressSession = require('express-session')

const router = express.Router()

router.use(expressSession({
    secret: "sdaajsndakjndajks", 
    resave: false,
    saveUninitialized: true
}))




router.get('/Selection', function(req, res){
    res.render("selection.hbs")
})

router.get('/Checkout', function(req, res){
    res.render("checkout.hbs")
})

router.get('/Profile', function(req, res){
    const isLoggedIn = req.session.isLoggedIn
    const model = {
        isLoggedIn: isLoggedIn
    }
    res.render("profile.hbs", model)
})

router.get('/addProduct', function(req, res) {
    res.render("addProduct.hbs")
})


module.exports = router