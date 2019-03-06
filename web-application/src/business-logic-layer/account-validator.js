

module.exports = function(){
    return{

        getErrorNewAccount: function(email, fullName, password, repeatPassword, adress, postalCode, callback){
            const errors = []
        
            if(!validateEmail(email)){
                errors.push("emailNotValid")
            }else if(fullName.length == 0){
                errors.push("fullNameMissing")
            }else if(password != repeatPassword ){
                errors.push("passordsNotMatching")
            }else if(adress.length == 0){
                errors.push("adressMissing")
            }else if(postalCode.length == 0){
                errors.push("postalCodeMissing")
            }
            callback(errors)
        },

        validateEmail(email){
            var regex = /\S+@\S+/;
            return regex.test(email);
        }
    }
}

