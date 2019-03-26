document.addEventListener("DOMContentLoaded",function(event){
    event.preventDefault()


    selectionLoadPost = function(product){
        const parentDiv = document.createElement("div")
        parentDiv.classList.add("tile","is-parent")

            const article = document.createElement("article")
            article.classList.add("title","is-child","box")
            article.setAttribute("style","width:100%;")
            parentDiv.appendChild(article)

                const pTitle = document.createElement("p")
                pTitle.classList.add("title")
                pTitle.innerText = product.productName
                article.appendChild(pTitle)

                const pSubTitle = document.createElement("p")
                pSubTitle.classList.add("subtitle")
                pSubTitle.innerText = product.productPrice
                article.appendChild(pSubTitle)

                const aProduct = document.createElement("a")
                aProduct.classList.add("button", "is-primary","is-rounded")
                aProduct.innerText = "View"
                aProduct.onclick = function(){
                    //gå till nya sidan av det id
                }
                article.appendChild(aProduct)

                const imageFigure = document.createElement("figure")
                imageFigure.classList.add("image","is-4by3")
                article.appendChild(imageFigure)

                    const image = document.createElement("img")
                    image.src = "/uploads/"+product.productImage
                    imageFigure.appendChild(image)
        
        document.getElementById("selectionPostPlace").appendChild(parentDiv)

        for(let i = 0; i < 2; i++){
            const br = document.createElement("br")
            document.getElementById("selectionPostPlace").appendChild(br)  
        }
        
    }


    updateSelection = function(){
        const postPlace = document.getElementById("selectionPostPlace")
        while(postPlace.firstChild)
            postPlace.removeChild(postPlace.firstChild)
        fetch("/variousSPA/selection" ,{
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("accessToken")
            }
        }).then(function(response){
            return response.json()
        }).then(function(body){
            if(body.admin){
                document.getElementById("addProductButton").classList.remove("hidden")
            }
            for(const product of body.products)
                selectionLoadPost(product)
        }).catch(function(error){
            console.log(error)
        })
    }


})