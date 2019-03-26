

module.exports = function({db}){
    return {


        createAccount: function(account, callback){

            const query = `INSERT INTO accounts (fullName, email, adress, postalCode, password) VALUES (?, ?, ?, ?, ?)` 
            const values = [account.fullName, account.email, account.adress, account.postalCode, account.password]

            db.query(query, values, function(error){
                callback(error)
            })
        },


        signIn: function(account, callback){
            const query = `SELECT * FROM accounts WHERE email = ?`

            db.query(query, account.email, function(error, account){
                if(error){
                    callback(error, null)
                }else {
                    callback(error, account[0])
                }
            })

        },


        getAccountInformationById: function(id, callback){
            const query = `SELECT fullName, email, adress, postalCode FROM accounts WHERE accountId = ?`
            const value = [id]
            db.query(query, value, function(error, user){
                if(user){
                    callback(error, user[0])
                }else{
                    callback(error, null)
                }
            })
        },
        

        updateInformationById: function(account, callback){
            const query =  `UPDATE accounts 
                            SET fullName = ?, email = ?, adress = ?, postalCode = ? 
                            WHERE accountId = ?`
            const values = [account.fullName, account.email, account.adress, account.postalCode, account.accountId]

            db.query(query, values, function(error){
                callback(error)
            })
        },


        updatePasswordById: function(accountPw, callback){
            const query = `UPDATE accounts SET password = ? WHERE accountId = ?`
            const values = [accountPw.newPassword, accountPw.account]

            db.query(query, values, function(error){
                callback(error)
            })
        },


        deleteAccountById: function(accountId, callback){
            const query = `DELETE FROM accounts WHERE accountId = ?`
            const value = [accountId]

            db.query(query, value, function(error){
                callback(error)
            })
        },







    }
}