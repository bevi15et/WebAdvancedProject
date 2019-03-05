const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10

<<<<<<< HEAD
module.exports = function(container){
    return{

        getErrorNewAccount: function(account){
            const errors = []
        
            if(!account.hasOwnProperty("username")){
                errors.push("usernameMissing")
            }else if(account.username.length < MIN_USERNAME_LENGTH){
                errors.push("usernameTooShort")
            }else if(MAX_USERNAME_LENGTH < account.username.length){
                errors.push("usernameTooLong")
            }
            return errors
        },

        

    }
}

=======
module.exports = function(containers){
    return{
        
        getErrorNewAccount: function(account){
            
            const errors = []

            if(!account.hasOwnProperty("username")){
                errors.push("usernameMissing")
            }else if(account.username.length < MIN_USERNAME_LENGTH){
                errors.push("usernameTooShort")
            }else if(MAX_USERNAME_LENGTH < account.username.length){
                errors.push("usernameTooLong")
            }

            return errors
            
        }
    }
}
>>>>>>> 47675ae88b956d73b10c6c658553cd72ad7e7c47
