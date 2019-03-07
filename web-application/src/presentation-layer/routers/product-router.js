const express = require('express')


const router = express.Router()

router.get('/CreateItem', function(req, res){
    res.render("createItem.hbs")
})

router.get('/updateItem', function(req, res){
    res.render("updateItem.hbs")
})

router.get('/addProduct', function(req, res){
    res.render("addProduct.hbs")
})

router.get('/productDetails', function(req, res){
    res.render("productDetails.hbs")
})

module.exports = router