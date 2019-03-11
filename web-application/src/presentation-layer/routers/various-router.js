const express = require('express')

const router = express.Router()


router.get('/Selection', function(req, res){
    res.render("selection.hbs")
})

router.get('/Basket', function(req, res){
    res.render("basket.hbs")
})



router.get('/addProduct', function(req, res) {
    res.render("addProduct.hbs")
})


module.exports = router