let butHtml = document.getElementById("voir")
let hiddenhtml = document.getElementById("hidd")
let hidenhtml = document.getElementById("hid")
let imgHtml = document.getElementById("prese")
let petit = document.getElementById("petit")
let closeHtml = document.getElementById("close")
 
let carrousel=["image\\accueil_pasconnecter.png","image\\connexion.png","image\\inscription.png","image\\accueil_connecter.png","image\\mes_Event.png","image\\creation_Event.png","image\\mes_reservations.png"]
imgHtml.src=carrousel[0]

carrousel.forEach(element => {
    let img= document.createElement("img")
    img.classList="petit-carrousel"
    img.src=element
    petit.appendChild(img)

    img.addEventListener("click", ()=>{
        imgHtml.src=element
    })
    
});

butHtml.addEventListener("click",()=>{
    hiddenhtml.classList.toggle("hidden")
    hidenhtml.classList.toggle("hidden")
})

closeHtml.addEventListener("click", (e)=>{
    e.preventDefault()
    hiddenhtml.classList.toggle("hidden")
    hidenhtml.classList.toggle("hidden")
})
