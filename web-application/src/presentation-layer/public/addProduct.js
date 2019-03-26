document.addEventListener("DOMContentLoaded",function(event){
    event.preventDefault()

    


    document.getElementById("addProductCreateProductButton").addEventListener("click",function(event){
        event.preventDefault()


        const values = document.querySelectorAll(".addProductFields")

        fetch("/productSPA",{
            method: "POST",
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                newProductName: encodeURI(values[0].value),
                newProductDescription: encodeURI(values[1].value),
                newProductPrice: encodeURI(values[2].value)
            })
        }).then(function(response){
            return response.json()
        }).then(function(body){
            updateSelection()
            document.getElementById("selection").classList.remove("hidden")
            document.getElementById("addProduct").classList.add("hidden")
        })

    })



})