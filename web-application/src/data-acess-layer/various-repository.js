

module.exports = function({db}){
    return{

        isLoggedInAsAdmin: function(account, callback){
            const query = `SELECT * FROM accounts WHERE admin = ? AND accountId = ?`
            const value = ["Yes", account.accountId]

            db.query(query, value, function(error, admin){
                if(admin){
                    callback(error, admin[0])
                }else{
                    callback(error, null)
                }
            })
        },

        
    }
}