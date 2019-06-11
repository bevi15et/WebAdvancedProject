const awilix = require('awilix')

const myApp = require('../src/presentation-layer/app')
const myApi = require('../src/API-presentation-layer/api-app')

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

//API
const apiAccounrRouter = require('./API-presentation-layer/routers/api-account-router')
const apiOrderRouter = require('./API-presentation-layer/routers/api-order-router')



const container = awilix.createContainer()

container.register('app', awilix.asFunction(myApp))
container.register('myApi', awilix.asFunction(myApi))

container.register('apiAccounrRouter', awilix.asFunction(apiAccounrRouter))
container.register('apiOrderRouter', awilix.asFunction(apiOrderRouter))

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

container.register("orderRouter", awilix.asFunction(orderRouter))
container.register("orderManager", awilix.asFunction(orderManagerFunc))
container.register("orderRepository", awilix.asFunction(orderRepositoryFunc))

const apiApp = container.resolve("myApi")
const app = container.resolve("app")

app.listen(8080, function(){
    console.log("Web app listening on port 8080")
})
apiApp.listen(8081, function(){
    console.log("Web API listening on port 8081")
})

