localStorage = window.localStorage

document.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault()

    function handleClickOnAnchor(event){
        event.preventDefault()
        const uri = event.currentTarget.getAttribute("href")
        document.querySelector(".current-page").classList.remove("current-page")

        let id
        if(uri == "/"){
            id = "home"
        }else if(uri == "/Selection"){
            updateSelection()
            id = "selection"
        }else if(uri == "/Basket"){
            id = "basket"
        }else if(uri == "/accounts/Profile"){
            id = "profile"
        }else if(uri == "/products/addProduct"){
            id = "addProduct"
        }

        document.getElementById(id).classList.add("current-page")
    }

    const anchors = document.querySelectorAll("a")

    for(const anchor of anchors){
        anchor.addEventListener("click", function(event)    {
            handleClickOnAnchor(event)
        })
    }
    
    history.replaceState({uri: "/"}, "", "/")

    window.addEventListener("popstate", function(event){
        const state = event.state
        changePage(state.uri)
    })

})