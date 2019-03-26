const express = require('express')
const awilix = require('awilix')

const container = awilix.createContainer()
const orderManagerFunc = require('../../business-logic-layer/order-manager')
const orderRepositoryFunc = require('../../data-acess-layer/order-repository')
const db = require('../../data-acess-layer/db')

container.register("orderManager", awilix.asFunction(orderManagerFunc))
container.register("orderRepository", awilix.asFunction(orderRepositoryFunc))
container.register("db", awilix.asValue(db))

const orderManager = container.resolve('orderManager')
const orderRepository = container.resolve('orderRepository')
const mydb = container.resolve('db')

const router = express.Router()

router.get('/addProductToBasket/:id', function(req, res){
    const orderId = req.session.orderId
    const accountId = req.session.loggedInAccount.accountId   
    const productId = req.params.id

    console.log("in router: login: ", accountId, ", orderId: ", orderId, ", productId: ", productId)            
    
    orderManager.addProductToBasket(productId, accountId, function(newOrderId, error){
        if(error) {
            res.render('productDetails.hbs', {message: "Error occured when adding item to basket"})
        }
        req.session.orderId = newOrderId
        res.render('productDetails.hbs', {message:"Item was added to basket"})
    })
})

router.get('/Basket', function(req, res){
    const isLoggedIn = req.session.isLoggedIn
    const orderId = req.session.orderId

    orderManager.showBasket(isLoggedIn, orderId, function(basket, error){
        if(error){
            res.render("basket.hbs", {error: "An error occured when fetching basket"})
            return
        } else {   
//todo  use basket.productId to get product name and price from product-repository... and don't forget to authorize through product-manager 
            const model = {
                productName: "temp test",
                productPrice: 2313,
                basket: basket
            }
        
            res.render("basket.hbs", model)
        }
    })
})

module.exports = router