class Pokemon {
    constructor(id, name, pokedexId, image, stats, apiEvolution, apiGeneration, apiTypes, apiResistance) {
        this.id = id
        this.name = name
        this.pokedexId = pokedexId
        this.image = image
        this.stats = stats
        this.apiEvolution = apiEvolution
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

fetch("https://pokebuildapi.fr/api/v1/pokemon").then(function (rep) {

    rep.json().then(function (poke) {


        for (let i = 0; i < poke.length; i++) {
            pokedex.push(new Pokemon(poke[i].id, poke[i].name, poke[i].pokedexId, poke[i].image, poke[i].stats, poke[i].apiEvolutions, poke[i].apiGeneration, poke[i].apiTypes, poke[i].apiResistances))
        }
        if (pokedex.length == poke.length) ProcessPokemon();
    })

})


function ProcessPokemon() {
    let copyPokedex=[...pokedex]
    pokedex.forEach(element => {
        let cartePokemon = document.createElement("div")
        cartePokemon.classList = "carte"
        let name = document.createElement("h2")
        name.innerText = element.getName()
        cartePokemon.appendChild(name)
        let avatar = document.createElement("img")
        avatar.src = element.getImage()
        cartePokemon.appendChild(avatar)
        pokedexHtml.appendChild(cartePokemon) 

        cartePokemon.addEventListener("click" , ()=>{
            hiddenHtml.innerHTML=""
            hiddenHtml.style.display='block'
            let image = document.createElement("img")
            let tit= document.createElement("h2")
            image.src= element.getImage()
            tit.innerText=element.getName()

            hiddenHtml.appendChild(image)
            hiddenHtml.appendChild(tit)
        })
    });


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
            let cartePokemon = document.createElement("div")
            cartePokemon.classList = "carte"
            let name = document.createElement("h2")
            name.innerText = element.getName()
            cartePokemon.appendChild(name)
            let avatar = document.createElement("img")
            avatar.src = element.getImage()
            cartePokemon.appendChild(avatar)
            pokedexHtml.appendChild(cartePokemon)
        });
    })
}
