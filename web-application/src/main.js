const awilix = require('awilix')

const myApp = require('../src/presentation-layer/app')


//accounts
const accountRouter = require('./presentation-layer/routers/account-router')
const accountManagerfunc = require('./business-logic-layer/account-manager')
const accountRepositoryfunc = require('./data-acess-layer/account-repository')
const accountValidatorfunc = require('./business-logic-layer/account-validator')

//products
const productRouter = require('./presentation-layer/routers/product-router')
const productRouterSPA = require('./presentation-layer/routers/product-routerSPA')
const productManagerFunc = require('./business-logic-layer/product-manager')
const productRepositoryFunc = require('./data-acess-layer/products-repository')

//various
const variousRouter = require('./presentation-layer/routers/various-router')
const variousRouterSPA = require('./presentation-layer/routers/various-routerSPA')
const variousManagerFunc = require('./business-logic-layer/various-manager')
const variousRepositoryFunc = require('./data-acess-layer/various-repository')

//order
const orderRouter = require('./presentation-layer/routers/order-router')
const orderManagerFunc = require('./business-logic-layer/order-manager')
const orderRepositoryFunc = require('./data-acess-layer/order-repository')

//db
const db = require('./data-acess-layer/db')






const container = awilix.createContainer()

container.register('app', awilix.asFunction(myApp))

container.register('accountRouter', awilix.asFunction(accountRouter))
container.register('accountManager', awilix.asFunction(accountManagerfunc))
container.register('accountRepository', awilix.asFunction(accountRepositoryfunc))
container.register('accountValidator', awilix.asFunction(accountValidatorfunc))

container.register('productRouter', awilix.asFunction(productRouter))
container.register("productManager", awilix.asFunction(productManagerFunc))
container.register("productRepository", awilix.asFunction(productRepositoryFunc))

container.register('variousRouter', awilix.asFunction(variousRouter))
container.register("variousManager", awilix.asFunction(variousManagerFunc))
container.register("variousRepository", awilix.asFunction(variousRepositoryFunc))

container.register('db', awilix.asValue(db))

/*
container.register("orderManager", awilix.asFunction(orderManagerFunc))
container.register("orderRepository", awilix.asFunction(orderRepositoryFunc))
*/


const app = container.resolve("app")

app.listen(8080, function(){
    console.log("Web app listening on port 8080")
})

