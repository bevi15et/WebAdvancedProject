const db = require('./db')

module.exports = function(container){
    return {

        getAllAccounts: function(callback){

            const query = `SELECT * FROM accounts ORDER BY username`
            const values = []

            db.query(query, values, function(error, accounts){
                if(error){
                    container.getAllAccounts.callback(['databaseError'], null)  
                }else{
                    container.getAllAccounts.callback([], accounts)
                }
            })
        },

        getAccountByUsername: function(username, callback){

            const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
            const values = [username]

            db.query(query, values, function(error, accounts){
                if(error){
                    container.getAccountByUsername.callback(['databaseError'], null)
                }else{
                    container.getAccountByUsername.callback([], accounts[0])
                }
            })
        },

        createAccount: function(account, callback){

            const query = `INSERT INTO customerAccounts (fullName, email, adress, postalCode, password) VALUES (?, ?, ?, ?, ?)` 
            const values = [account.fullName, account.email, account.adress, account.postalCode, account.password]

            db.query(query, values, function(error, results){
                if(error){
                    container.createAccount.callback(error, null)
                }else{
                    container.createAccount.callback(null, results.insertID)
                }
            })
        }
    }
}