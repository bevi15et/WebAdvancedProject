const sequelize = require('sequelize')

const ORMconnection = new sequelize('webAppDatabase', 'root', 'qwer', {
    host: 'ORMdatabase',
    dialect: 'PostgreSQL'
})

ORMconnection
  .authenticate()
  .then(() => {
    console.log('Sequelize connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the ORM database:', err)
  })

module.exports = ORMconnection