const express = require('express')

const router = express.Router()


router.get('/Selection', function(req, res){
    res.render("selection.hbs")
})

router.get('/Basket', function(req, res){
    res.render("basket.hbs")
})



module.exports = router