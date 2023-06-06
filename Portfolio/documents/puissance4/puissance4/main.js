ligne1=[0,0,0,0,0,0,0]
ligne2=[0,0,0,0,0,0,0]
ligne3=[0,0,0,0,0,0,0]
ligne4=[0,0,0,0,0,0,0]
ligne5=[0,0,0,0,0,0,0]
ligne6=[0,0,0,0,0,0,0]

let popHtml = document.getElementById("pop")
let grilleHtml= document.getElementById("grille")
let ligne1Html = document.getElementById("ligne1")
let ligne2Html = document.getElementById("ligne2")
let ligne3Html = document.getElementById("ligne3")
let ligne4Html = document.getElementById("ligne4")
let ligne5Html= document.getElementById("ligne5")
let ligne6Html = document.getElementById("ligne6")
let playerhtml = document.getElementById("player")
let restartHtml = document.getElementById("restart")
let cptplayer = 1
let cptremplis=0
let but1Html= document.getElementById("but1")
let but2Html= document.getElementById("but2")
let but3Html= document.getElementById("but3")
let but4Html= document.getElementById("but4")
let but5Html= document.getElementById("but5")
let but6Html= document.getElementById("but6")
let but7Html= document.getElementById("but7")
let pohtml= document.getElementById("po")
creategrid()

restartHtml.addEventListener("click", ()=>{
    location.reload()
})

but1Html.addEventListener("click", (event)=>{
    event.preventDefault()
    getFirstLigneCanPlace(1)

})

but2Html.addEventListener("click", (event)=>{
    event.preventDefault()
    getFirstLigneCanPlace(2)
})

but3Html.addEventListener("click", (event)=>{
    event.preventDefault()
    getFirstLigneCanPlace(3)
})

but4Html.addEventListener("click", (event)=>{
    event.preventDefault()
    getFirstLigneCanPlace(4)
})

but5Html.addEventListener("click", (event)=>{
    event.preventDefault()
    getFirstLigneCanPlace(5)
})

but6Html.addEventListener("click", (event)=>{
    event.preventDefault()
    getFirstLigneCanPlace(6)
})
but7Html.addEventListener("click", (event)=>{
    event.preventDefault()
    getFirstLigneCanPlace(7)
})


function getFirstLigneCanPlace(index){
    if(ligne1[index-1]==0){
        ligne1[index-1]=insertJeton(cptplayer)
        playerPlay(cptplayer)
        isWinVertical(index-1)
        iswinHorizontal(ligne1)
        isWinObliqueeMontant(index-1,1)
        isWinObliqueDescendant(index-1,1)
    }else if(ligne2[index-1]==0){
        ligne2[index-1]=insertJeton(cptplayer)
        playerPlay(cptplayer)
        iswinHorizontal(ligne2)
        isWinVertical(index-1)
        isWinObliqueeMontant(index-1,2)
        isWinObliqueDescendant(index-1,2)
    }else if(ligne3[index-1]==0){
        ligne3[index-1]=insertJeton(cptplayer)
        playerPlay(cptplayer)
        iswinHorizontal(ligne3)
        isWinVertical(index-1)
        isWinObliqueeMontant(index-1,3)
        isWinObliqueDescendant(index-1,3)
    }else if(ligne4[index-1]==0){
        ligne4[index-1]=insertJeton(cptplayer)
        playerPlay(cptplayer)
        iswinHorizontal(ligne4)
        isWinVertical(index-1)
        isWinObliqueeMontant(index-1,4)
        isWinObliqueDescendant(index-1,4)
    } else if(ligne5[index-1]==0){
        ligne5[index-1]=insertJeton(cptplayer)
        playerPlay(cptplayer)
        iswinHorizontal(ligne5)
        isWinVertical(index-1)
        isWinObliqueeMontant(index-1,5)
        isWinObliqueDescendant(index-1,5)
    }else if(ligne6[index-1]==0){
        ligne6[index-1]=insertJeton(cptplayer)
        playerPlay(cptplayer)
        iswinHorizontal(ligne6)
        isWinVertical(index-1)
        isWinObliqueeMontant(index-1,6)
        isWinObliqueDescendant(index-1,6)
    }
    if(cptremplis==42){
        popHtml.style.display="block"
        pohtml.innerText="Draw"
    }
    creategrid()
}

function creategrid(){
    ligne6Html.innerHTML=""
    ligne5Html.innerHTML=""
    ligne4Html.innerHTML=""
    ligne3Html.innerHTML=""
    ligne2Html.innerHTML=""
    ligne1Html.innerHTML=""
    
    createList(ligne6,ligne6Html)
    createList(ligne5,ligne5Html)
    createList(ligne4,ligne4Html)
    createList(ligne3,ligne3Html)
    createList(ligne2,ligne2Html)
    createList(ligne1,ligne1Html)
}

function createList(ligneTab ,  ligneHtlm){
    
    ligneTab.forEach(element => {
        let newdiv= document.createElement("div")
        if(element==0){
        newdiv.classList="white"
        newdiv.classList+=" card"
        }else if(element==1){
            newdiv.classList="red"
            newdiv.classList+=" card"
        }else{
            newdiv.classList="yellow"
            newdiv.classList+=" card"
        }
        ligneHtlm.appendChild(newdiv)
    });
}

function playerPlay(){
   
    if(cptplayer==1){
        cptremplis++
        cptplayer++
        playerhtml.innerText=("Joueur 2")
        playerhtml.classList="yellowPlayer"
    }else{
        cptremplis++
        cptplayer--
        playerhtml.innerText=("Joueur 1")
        playerhtml.classList="redPlayer"
    }
}

function insertJeton(cptplayer){
    if(cptplayer==1){
        return 1
    }else if(cptplayer==2){
        return 2
    }
}

function isWinVertical(index){
    let last 
    let neww 
    let cpt=0
    let i = 1
    neww=ligne1[index]
    
    if(ligne1[index]==ligne2[index] && ligne2[index]==ligne3[index] && ligne3[index]==ligne4[index] && ligne1[index]!=0){
        playerhtml.innerText=("Win")
        popHtml.style.display="block"
    }else if(ligne2[index]==ligne3[index] && ligne3[index]==ligne4[index] && ligne4[index]==ligne5[index] && ligne2[index]!=0){
    playerhtml.innerText=("Win")
    popHtml.style.display="block"
    }else if(ligne3[index]==ligne4[index] && ligne4[index]==ligne5[index] && ligne5[index]==ligne6[index] && ligne3[index]!=0){
        playerhtml.innerText=("Win")
        popHtml.style.display="block"
    }else{

    }

    
}

function iswinHorizontal(ligne){
    let last 
    let neww
    let cpt=0
ligne.forEach(element => {
    
   
    neww=element
    if(neww==last && neww!=0 && last!=0){
        cpt++
    }else{
        cpt=0
        last=element
    }
    if(cpt>=3){
    
        playerhtml.innerText=("Win")
        popHtml.style.display="block"
    }else{
       
    }
});

 
}


function isWinObliqueeMontant(index , ligne){
    
    if(ligne==1){
    
        if(ligne1[index]==ligne2[index+1] && ligne2[index+1]==ligne3[index+2] && ligne3[index+2]==ligne4[index+3] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{

        }

    }else if(ligne==2){
        if(ligne1[index-1]==ligne2[index] && ligne2[index]==ligne3[index+1] && ligne3[index+1]==ligne4[index+2]  ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne2[index]==ligne3[index+1] && ligne3[index+1]==ligne4[index+2] && ligne4[index+2]==ligne5[index+3] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{
            
        }
    }else if(ligne==3){
        if(ligne1[index-2]==ligne2[index-1] && ligne2[index-1]==ligne3[index] && ligne3[index]==ligne4[index+1]  ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne2[index-1]==ligne3[index] && ligne3[index]==ligne4[index+1] && ligne4[index+1]==ligne5[index+2] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne3[index]==ligne4[index+1] && ligne4[index+1]==ligne5[index+2] && ligne5[index+2]==ligne6[index+3] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{
            
        }
    }else if(ligne==4){
        if(ligne1[index-3]==ligne2[index-2] && ligne2[index-2]==ligne3[index-1] && ligne3[index-1]==ligne4[index]  ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne2[index-2]==ligne3[index-1] && ligne3[index-1]==ligne4[index] && ligne4[index]==ligne5[index+1] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne3[index-1]==ligne4[index] && ligne4[index]==ligne5[index+1] && ligne5[index+1]==ligne6[index+2] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{
            
        }
    }else if(ligne==5){
         if(ligne2[index-3]==ligne3[index-2] && ligne3[index-2]==ligne4[index-1] && ligne4[index-1]==ligne5[index] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne3[index-2]==ligne4[index-1] && ligne4[index-1]==ligne5[index] && ligne5[index]==ligne6[index+1] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{

        }
    }else if(ligne==6){
        if(ligne3[index-2]==ligne4[index-1] && ligne4[index-1]==ligne5[index] && ligne5[index]==ligne6[index+1] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{

        }
    }else{

    }


}

function isWinObliqueDescendant( index , ligne){
    if(ligne==1){
    
        if(ligne1[index]==ligne2[index-1] && ligne2[index-1]==ligne3[index-2] && ligne3[index-2]==ligne4[index-3] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{

        }

    }else if(ligne==2){
        if(ligne1[index+1]==ligne2[index] && ligne2[index]==ligne3[index-1] && ligne3[index-1]==ligne4[index-2]  ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne2[index]==ligne3[index-1] && ligne3[index-1]==ligne4[index-2] && ligne4[index-2]==ligne5[index-3] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{
            
        }
    }else if(ligne==3){
        if(ligne1[index+2]==ligne2[index+1] && ligne2[index+1]==ligne3[index] && ligne3[index]==ligne4[index-11]  ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne2[index+1]==ligne3[index] && ligne3[index]==ligne4[index-1] && ligne4[index-1]==ligne5[index-2] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne3[index]==ligne4[index-1] && ligne4[index-1]==ligne5[index-2] && ligne5[index-2]==ligne6[index-3] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{
            
        }
    }else if(ligne==4){
        if(ligne1[index+3]==ligne2[index+2] && ligne2[index+2]==ligne3[index+1] && ligne3[index+1]==ligne4[index]  ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne2[index+2]==ligne3[index+1] && ligne3[index+1]==ligne4[index] && ligne4[index]==ligne5[index-1] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne3[index+1]==ligne4[index] && ligne4[index]==ligne5[index-1] && ligne5[index-1]==ligne6[index-2] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{
            
        }
    }else if(ligne==5){
         if(ligne2[index+3]==ligne3[index+2] && ligne3[index+2]==ligne4[index+1] && ligne4[index+1]==ligne5[index] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else if(ligne3[index+2]==ligne4[index+1] && ligne4[index+1]==ligne5[index] && ligne5[index]==ligne6[index-1] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{

        }
    }else if(ligne==6){
        if(ligne3[index+2]==ligne4[index+1] && ligne4[index+1]==ligne5[index] && ligne5[index]==ligne6[index-1] ){
            playerhtml.innerText=("Win")
            popHtml.style.display="block"
        }else{

        }
    }else{

    }

}