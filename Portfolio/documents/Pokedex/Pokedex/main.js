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
let pokedexHtml = document.getElementById("pokedex")
let alphabetHtml = document.getElementById("alphabet")
let isSort = false;
let hiddenHtml = document.getElementById("hidden")
let inputHtml = document.getElementById("search")

fetch("https://pokebuildapi.fr/api/v1/pokemon").then(function (rep) {

    rep.json().then(function (poke) {
        

        for (let i = 0; i < poke.length; i++) {
           
            pokedex.push(new Pokemon(poke[i].id, poke[i].name, poke[i].pokedexId, poke[i].image, poke[i].stats, poke[i].apiEvolutions, poke[i].apiPreEvolution,poke[i].apiGeneration, poke[i].apiTypes, poke[i].apiResistances))
        }

        if (pokedex.length == poke.length) ProcessPokemon();
    })

})


function ProcessPokemon() {
    let copyPokedex=[...pokedex]
    pokedex.forEach(element => {
       afficherCarte(element)

    });
    

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
            copyPokedex.sort(function (a, b) {
                return a.getName().localeCompare(b.getName());
            })
            isSort = true
        } else {
            copyPokedex.sort(function (a, b) {
                return b.getName().localeCompare(a.getName());
            })
            isSort = false
        }

        pokedexHtml.innerHTML = ""
        copyPokedex.forEach(element => {
            afficherCarte(element)
        });
    })
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
        console.log(pokemon)
        hiddenHtml.style.display="block"
    })
}