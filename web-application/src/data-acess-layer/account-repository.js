

module.exports = function({db}){
    return {

        getAllAccounts: function(callback){

            const query = `SELECT * FROM accounts ORDER BY username`
            const values = []

            db.query(query, values, function(error, accounts){
                if(error){
                    callback(['databaseError'], null)  
                }else{
                    callback([], accounts)
                }
            })
        },

        getAccountByUsername: function(username, callback){

            const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
            const values = [username]

            db.query(query, values, function(error, accounts){
                if(error){
                    getAccountByUsername.callback(['databaseError'], null)
                }else{
                    getAccountByUsername.callback([], accounts[0])
                }
            })
        },

        createAccount: function(account, callback){

            const query = `INSERT INTO accounts (fullName, email, adress, postalCode, password) VALUES (?, ?, ?, ?, ?)` 
            const values = [account.fullName, account.email, account.adress, account.postalCode, account.password]

            db.query(query, values, function(error){
                callback(error)
            })
        },

        singIn: function(account, callback){
            const query = `SELECT * FROM accounts WHERE email = ? AND password = ?`
            const values = [account.email, account.password]

            db.query(query, values, function(error, account){
                if(error){
                    callback(error, null)
                }else {
                    callback(null, account[0])
                }
            })

        }


    }
}