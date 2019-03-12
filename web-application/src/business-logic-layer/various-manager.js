

module.exports = function({variousRepository}){
    return{

        isLoggedInAsAdmin: function(account, callback){
            if(account){
                variousRepository.isLoggedInAsAdmin(account, function(error, admin){
                    if(admin){
                        callback(error, admin, null)
                    }else{
                        callback(error, null, account)
                    }
                })
            }else{
                callback(null, null, null)
            }
        },


    }
}