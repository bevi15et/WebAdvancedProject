const mysql = require('mysql')

const connection = mysql.createConnection({
	host     : 'database',
	user     : 'root',
	password : 'qwer',
	database : 'webAppDatabase'
})

module.exports = connection
