const passwordMinLength = 6

module.exports = function(){
    return{

        getErrorNewAccount: function(email, fullName, password, repeatPassword, adress, postalCode, callback){
            const errors = []
        
            if(!email.includes("@")){
                errors.push("email not valid")
            }else if(fullName.length == 0){
                errors.push("full name missing")
            }else if(password.length < passwordMinLength){
                errors.push("password too short, at least 6 characters")
            }else if(password != repeatPassword ){
                errors.push("passords does not match")
            }else if(adress.length == 0){
                errors.push("adress missing")
            }else if(postalCode.length == 0){
                errors.push("postal code missing")
            }
            callback(errors)
        },

        signIn: function(email, password, callback){
            const errors = []

            if(email.length == 0){
                errors.push("enter email please!")
            }else if(password.length == 0){
                errors.push("enter password please!")
            }
            callback(errors)
        },
        
    }
}

