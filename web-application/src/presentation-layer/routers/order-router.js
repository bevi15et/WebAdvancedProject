const express = require('express')
const router = express.Router()

router.get('/addProductToBasket', function(req, res){
    res.send("Added to basket.")
})

module.exports = router