const express = require('express')
const router = express.Router()



router.get('/', function(req, res){

    res.render('index.hbs')
})


router.get('/selection', function(req, res){
    console.log("trigegereadwad")

    const isLoggedIn = req.session.isLoggedIn
    const account = req.session.loggedInAccount

    variousManager.isLoggedInAsAdmin(account, function(errors, admin, user, products){
        if(admin){
            const model = {
                products: products,
                error: errors,
                admin:true
            }
            res.status(200).json(model)
        }else if(user){
            const model = {
                products: products,
                isLoggedIn: user,
                error: errors,
                admin:false
            }
            res.status(200).json(model)
        }else{
            const model = {
                products: products,
                error: errors,
                admin:false
            }
            res.status(200).json(model)
        }
    })

})

router.get('/Basket', function(req, res){
    res.render("basket.hbs")
})



router.get('/addProduct', function(req, res) {
    res.render("addProduct.hbs")
})


module.exports = router