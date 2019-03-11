const express = require('express')

const router = express.Router()


router.get('/Selection', function(req, res){
    //TILLFÄLLIGT
    if(req.session.isLoggedIn){
        const isLoggedInAsAdmin = req.session.loggedInAccount.admin
        const model = {
            isLoggedInAsAdmin: isLoggedInAsAdmin
        }
        res.render("selection.hbs", model)
    }else{
        res.render("selection.hbs")
    }
    

})

router.get('/Basket', function(req, res){
    res.render("basket.hbs")
})



router.get('/addProduct', function(req, res) {
    res.render("addProduct.hbs")
})


module.exports = router