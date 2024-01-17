class Pokemon {
    constructor(id, name, pokedexId, image, stats, apiEvolution, apiPreEvolution, apiGeneration, apiTypes, apiResistance) {
        this.id = id
        this.name = name
        this.pokedexId = pokedexId
        this.image = image
        this.stats = stats
        this.apiEvolution = apiEvolution
        this.apiPreEvolution= apiPreEvolution
        this.apiGeneration = apiGeneration
        this.apiTypes = apiTypes
        this.apiResistance = apiResistance

    }

    getId() {
        return this.id
    }

    getName() {
        return this.name;
    }

    getPokedexId() {
        return this.pokedexId;
    }

    getImage() {
        return this.image;
    }

    getStats() {
        return this.stats;
    }

    getEvolution() {
        return this.apiEvolution;
    }

    getPreEvolution(){
        return this.apiPreEvolution;
    }

    getGeneration() {
        return this.apiGeneration;
    }

    getTypes() {
        return this.apiTypes;
    }

    getResistances() {
        return this.apiResistance;
    }



}

let pokedex = []
let temp=[]
let pokedexHtml = document.getElementById("pokedex")
let homehtml = document.getElementById("home")
let alphabetHtml = document.getElementById("alphabet")
let isSort = false;
let hiddenHtml = document.getElementById("hidden")
let inputHtml = document.getElementById("search")
let buthidden = document.getElementById("buthid")
let genehtml = document.getElementById("gene")
let typehtml = document.getElementById("type")
let po = document.getElementById("po")


fetch("https://pokebuildapi.fr/api/v1/pokemon").then(function (rep) {

    rep.json().then(function (poke) {
        

        for (let i = 0; i < poke.length; i++) {
           
            pokedex.push(new Pokemon(poke[i].id, poke[i].name, poke[i].pokedexId, poke[i].image, poke[i].stats, poke[i].apiEvolutions, poke[i].apiPreEvolution,poke[i].apiGeneration, poke[i].apiTypes, poke[i].apiResistances))
        }

        if (pokedex.length == poke.length) ProcessPokemon(pokedex);
    })

})

fetch("https://pokebuildapi.fr/api/v1/types").then(function (rep) {

    rep.json().then(function (poke) {
        
           
        for (let i = 0; i < poke.length; i++) {
            let options = document.createElement("option")
            options.innerText=poke[i].name
            options.value=poke[i].name

            typehtml.appendChild(options)
        }

       
    })

})

homehtml.addEventListener("click" , (e)=>{
    e.preventDefault()
    ProcessPokemon(pokedex)
})

buthidden.addEventListener("click", ()=>{
    hiddenHtml.style.display="none"
    ProcessPokemon(pokedex)
})

genehtml.addEventListener("change", (event) => {
 
    if(genehtml.value==0){
        ProcessPokemon(pokedex)
    }else{
        getPokemonBygeneretion(genehtml.value)
    }
})

typehtml.addEventListener("change", (event) => {
  
    if(typehtml.value==-1){
        ProcessPokemon(pokedex)
    }else{
        getPokemonByType(typehtml.value)
    }
})

inputHtml.addEventListener("keyup", (e)=>{
    if(e.key=="Enter"){
        const temp = pokedex.filter(word => word.getName().toLowerCase().includes(inputHtml.value.toLowerCase()));
        pokedexHtml.innerHTML = ""
        temp.forEach(element => {
            afficherCarte(element)
        });
    }
   
})

alphabetHtml.addEventListener("click", () => {
    if (isSort === false) {
        pokedex.sort(function (a, b) {
            return a.getName().localeCompare(b.getName());
        })
        isSort = true
    } else {
        pokedex.sort(function (a, b) {
            return b.getName().localeCompare(a.getName());
        })
        isSort = false
    }

    pokedexHtml.innerHTML = ""
    pokedex.forEach(element => {
        afficherCarte(element)
    });
})

function ProcessPokemon(tab) {

    pokedex.sort(function (a, b) {
        return a.getId()>b.getId();
    })
    pokedexHtml.innerHTML=""   
    let copyPokedex=[...tab]
    tab.forEach(element => {
       afficherCarte(element)

    });
    

  
}



function afficherCarte(pokemon){
    let cartePokemon = document.createElement("div")
    cartePokemon.classList = "carte"
    let name = document.createElement("h2")
    name.innerText = pokemon.getName()
    cartePokemon.appendChild(name)
    let avatar = document.createElement("img")
    avatar.src = pokemon.getImage()
    cartePokemon.appendChild(avatar)
    pokedexHtml.appendChild(cartePokemon) 

    cartePokemon.addEventListener("click", ()=>{
   
        hiddenHtml.style.display="block"
        document.getElementById("nom").innerText=pokemon.getName()
        document.getElementById("im").src=pokemon.getImage()
        document.getElementById("hp").innerText="Hp : "+pokemon.getStats().HP
        document.getElementById("attack").innerText="Attaque : "+pokemon.getStats().attack
        document.getElementById("def").innerText="Defense : "+pokemon.getStats().defense
        document.getElementById("speed").innerText="Speed : "+pokemon.getStats().speed
        document.getElementById("gen").innerText="Génération : "+pokemon.getGeneration()
        po.innerHTML=""
        pokemon.getTypes().forEach(element => {
            
            let type = document.createElement("li") 
            type.innerText=element.name
            po.appendChild(type)         
        });
    })
}


function getPokemonBygeneretion(generation){
    fetch("https://pokebuildapi.fr/api/v1/pokemon/generation/"+generation).then(function (rep) {

    rep.json().then(function (poke) {
        
        temp=[]
        for (let i = 0; i < poke.length; i++) {
           
            temp.push(new Pokemon(poke[i].id, poke[i].name, poke[i].pokedexId, poke[i].image, poke[i].stats, poke[i].apiEvolutions, poke[i].apiPreEvolution,poke[i].apiGeneration, poke[i].apiTypes, poke[i].apiResistances))
        }

        if (temp.length == temp.length) {
        
            
        ProcessPokemon(temp);
        }
    })
})
}


function getPokemonByType(typ){
    fetch("https://pokebuildapi.fr/api/v1/pokemon/type/"+typ).then(function (rep) {

    rep.json().then(function (poke) {
        
        temp=[]
        for (let i = 0; i < poke.length; i++) {
           
            temp.push(new Pokemon(poke[i].id, poke[i].name, poke[i].pokedexId, poke[i].image, poke[i].stats, poke[i].apiEvolutions, poke[i].apiPreEvolution,poke[i].apiGeneration, poke[i].apiTypes, poke[i].apiResistances))
        }

        if (temp.length == temp.length) {
        
            
        ProcessPokemon(temp);
        }
    })
})
}