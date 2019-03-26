

document.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault



})


selectionViewButtonClicked = function(){
    fetch('/productSPA/productDetails/:id', {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("accessToken")
        }
    }).then(function(response){
        return response.json()
    }).then(function(body){
        if(body.admin){
            
        }
    })
}