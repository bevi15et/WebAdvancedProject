const passwordMinLength = 6

module.exports = function(){
    return{

        getErrorNewAccount: function(email, fullName, password, repeatPassword, adress, postalCode, callback){
            const errors = []
        
            if(!email.includes("@")){
                errors.push("Email is not valid")
            }else if(fullName.length == 0){
                errors.push("Full name missing")
            }else if(password.length < passwordMinLength){
                errors.push("Password too short, at least 6 characters")
            }else if(password != repeatPassword ){
                errors.push("Passords does not match")
            }else if(adress.length == 0){
                errors.push("Adress missing")
            }else if(postalCode.length == 0){
                errors.push("Postal code missing")
            }
            callback(errors)
        },

        getErrorUpdateAccount: function(email, fullName, adress, postalCode, callback){
            const errors = []

            if(!email.includes("@")){
                errors.push("Email not valid")
            }else if(fullName.length == 0){
                errors.push("Full name missing")
            }else if(adress.length == 0){
                errors.push("Adress missing")
            }else if(postalCode.length == 0){
                errors.push("Postal code missing")
            }
            callback(errors)

        },

        getErrorUpdatePassword: function(newPassword, repeatNewPassword, callback){
            const errors = []

            if(newPassword != repeatNewPassword){
                errors.push("Passwords doesn't match!")
            }else if(newPassword.length == 0){
                errors.push("Password missing")
            }else if(repeatNewPassword.length == 0){
                errors.push("Repeat password missing")
            }
            callback(errors)
        },

        signIn: function(email, password, callback){
            const errors = []
            
            if(!email.includes("@")){
                errors.push("Email not valid!")
            }else if(password.length == 0){
                errors.push("Password missing!")
            }
            callback(errors)
        },
        
    }
}

