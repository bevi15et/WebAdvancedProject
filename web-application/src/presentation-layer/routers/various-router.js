const express = require('express')


const awilix = require('awilix')
const variousManagerfunc = require('../../business-logic-layer/various-manager')
const variousRepositoryfunc = require('../../data-acess-layer/various-repository')
const db = require('../../data-acess-layer/db')
const container = awilix.createContainer()
container.register("variousManager", awilix.asFunction(variousManagerfunc))
container.register("variousRepository", awilix.asFunction(variousRepositoryfunc))
container.register("db", awilix.asValue(db))
const variousManager = container.resolve('variousManager')
const variousRepository = container.resolve('variousRepository')
const myDb = container.resolve('db')


const router = express.Router()


router.get('/Selection', function(req, res){

    const isLoggedIn = req.session.isLoggedIn
    const account = req.session.loggedInAccount

    variousManager.isLoggedInAsAdmin(account, function(errors, admin, user){
        if(admin){
            const model = {
                isLoggedInAsAdmin: admin,
                errors: errors
            }
            res.render("selection.hbs", model)
        }else if(user){
            const model = {
                isLoggedIn: isLoggedIn,
                errors: errors
            }
            res.render("selection.hbs", model)
        }else{
            res.render("selection.hbs")
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