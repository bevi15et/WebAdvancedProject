const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

module.exports = function({orderManager, productManager}){
    
    //CRUD on orders

    //See all orders
    router.get('/', (req, res) => {
        const headerAuth = req.headers.authorization

        if(headerAuth) {
            const token = headerAuth.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            account = decoded.account

            orderManager.showHistory(account, true, function(orderHistory, error) {
                if(error){
                    res.status(500).json({
                        message: 'Internal server error',
                        error: error
                    })
                } else {
                    res.status(200).json({
                        message: 'Order history found',
                        orderHistory: orderHistory
                    })
                }
            })
        
        } else {
            res.status(404).json({
                message: 'Please create an account to proceed'
            })
        }
    })

    //Create a new order
    router.post('/', (req, res) => {
        const headerAuth = req.headers.authorization

        if(headerAuth) {
            try {
                const token = headerAuth.split(" ")[1]
                const decoded = jwt.verify(token, process.env.JWT_KEY)
                const account = decoded.account
                const basket = decoded.basket    
            
                orderManager.placeOrder(account, true, basket, function(orderNumber, error){
                    if(error == 'Internal server error'){
                        res.status(500).json({
                            message: error
                        })
                    }else if(error == 'user not logged in'){
                        res.status(401).json({
                            message: 'Not autorized'
                        })
                    }else{
                        res.status(201).json({
                            message: 'Order successfully placed',
                            orderNumber: orderNumber
                        })
                    }
                })
            } catch (error) {
                res.status(401).json({
                    message: 'Auth failed'
                })
            }
        }else{
            res.status(401).json({
                message: 'Not authorized'
            })
        }
    })

    //Add or remove items to/from order
    router.patch('/', (req, res) => {
        
    })

    //Delete order
    router.delete('/', (req, res) => {
        
    })

    return router
}
