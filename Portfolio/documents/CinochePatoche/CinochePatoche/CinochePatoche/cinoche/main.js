//CREATION DE L OBJET MOVIE
class Movie {
    constructor(id, title, img, year, description, genre) {
        this.id = id
        this.title = title
        this.img = img
        this.year = year
        this.description = description
        this.genre = genre
        this.isFavorite = false
    }

    getGenre() {
        return this.genre
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getImg() {
        return this.img;
    }

    getYear() {
        return this.year;
    }

    getFavorite() {
        return this.isFavorite;
    }

    changeFavorite() {
        this.isFavorite = (this.isFavorite === false ? true : false)
        return this.isFavorite
    }

    getDescription() {
        return this.description;
    }

}

//variable de type DOM
let content = document.getElementById("content")
let inputHTML = document.getElementById("in")
let butHTML = document.getElementById("but")
let contentFoot = document.getElementById("foot")
let anneeSort = document.getElementById("annee")
let alphabetSort = document.getElementById("alph")
let hiddenHTML = document.getElementById("hidden")
let myFavoriteHtml = document.getElementById("fav")
let descHTML = document.getElementById("desc")
hiddenHTML.style.display = "none"

let selectHTML = document.querySelector('select')
let frameHTML = document.getElementById("frame")
let alreadyInFav = false
let listOrigine
let listFilm = []
let currentPage = 0
let genre = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Aventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comédie" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentaire" }, { "id": 18, "name": "Drame" }, { "id": 10751, "name": "Familial" }, { "id": 14, "name": "Fantastique" }, { "id": 36, "name": "Histoire" }, { "id": 27, "name": "Horreur" }, { "id": 10402, "name": "Musique" }, { "id": 9648, "name": "Mystère" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science-Fiction" }, { "id": 10770, "name": "Téléfilm" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "Guerre" }, { "id": 37, "name": "Western" }]
let alreadySortAlphabet = false
let alreadySortAnnee = false

//CREATION DE LA LISTE COMPLETE AVEC LES FILMS
for (let j = 1; j <= 20; j++) {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=35b8d6fe6bf345f7a25f90c1f08e70a2&language=fr&page=" + j + "").then(function (rep) {
        rep.json().then(function (film) {


            for (let i = 0; i < film.results.length; i++) {


                let newFilm = new Movie(film.results[i].id, film.results[i].original_title, film.results[i].poster_path, film.results[i].release_date, film.results[i].overview, film.results[i].genre_ids)
                listFilm.push(newFilm)
            }
            if (listFilm.length == 400) ProcessFilms();;
        })

    })
}

//FONCTION PRINCIPALE DU PROGRAMME 
function ProcessFilms() {
    document.getElementById("home").addEventListener("click", () => {
        alreadySortAlphabet=false
        alreadySortAnnee=false
        listFilm = listOrigine
        alreadyInFav = false
        supprimerButtons()
        creationButton()
        currentPage = 0
        afficherFilm(currentPage)


    })

    genre.forEach(element => {
        let optionHTML = document.createElement("option")
        optionHTML.value = element.id
        optionHTML.innerText = element.name
        selectHTML.appendChild(optionHTML)
    });
    listOrigine = [...listFilm]
    let taille = listFilm.length
    afficherFilm(currentPage)

    let nbbutton = taille / 50
    for (let b = 0; b < nbbutton; b++) {
        let but = document.createElement("button")
        but.classList = "page"
        but.innerText = (b + 1)
        contentFoot.appendChild(but)
    }

    let buttonPage = document.querySelectorAll(".page")

    buttonPage.forEach(element => {
        element.addEventListener("click", () => {
            for (let y = 0; y < buttonPage.length; y++) {
                buttonPage[y].classList = "page"
            }
            element.classList += " current"
            currentPage = (element.innerHTML - 1)
            afficherFilm(currentPage)
        })
    });
    buttonPage[currentPage].classList += " current"


    //TRIER LES FILMS PAR ALPHABET
    alphabetSort.addEventListener("click", () => {
        let buttonPage = document.querySelectorAll(".page")
        if(alreadySortAlphabet){
            listFilm.reverse()
        }else{
            listFilm.sort((a, b) => a.getTitle().localeCompare(b.getTitle()));
            alreadySortAlphabet=true
        }
        currentPage = 0
        for (let y = 0; y < buttonPage.length; y++) {
            buttonPage[y].classList = "page"
        }
        buttonPage[0].classList += " current"
        afficherFilm(currentPage)
    })

    //TRIER LES FILMS PAR ANNEE
    anneeSort.addEventListener("click", () => {
        
        let buttonPage = document.querySelectorAll(".page")
        if(alreadySortAnnee){
            listFilm.reverse()
        }else{
            listFilm.sort((a, b) => new Date(a.getYear())-new Date(b.getYear()));
            alreadySortAnnee=true
        }
        currentPage = 0
    
        for (let y = 0; y < buttonPage.length; y++) {
            buttonPage[y].classList = "page"
        }
        buttonPage[0].classList += " current"
        afficherFilm(currentPage)
        

    })


    //RECHERCHER DES FILMS PAR TITRE
    inputHTML.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            let research = inputHTML.value
            inputHTML.value = ""
            alreadyInFav = false
            listFilm = getTableauByTitle(research)
            currentPage = 0
            supprimerButtons()
            creationButton()
            afficherFilm(currentPage)


            let buttonPage = document.querySelectorAll(".page")
            buttonPage[0].classList += " current"
        }

    })




    hiddenHTML.addEventListener("click", (event) => {
        if (event.target === hiddenHTML) {
            hiddenHTML.style.display = "none"
            frameHTML.src=""
        }
    })

    selectHTML.addEventListener("change", function () {
        alreadyInFav = false
        let indexSelect = this.selectedIndex

        getFilmByCategorie(selectHTML[indexSelect].value)
    })

    myFavoriteHtml.addEventListener("click", () => {
        alreadyInFav = true
        alreadySortAlphabet=false
        alreadySortAnnee=false
        getFavoriteFilm()
    })

}

//CREE LE NOMBRE DE BOUTON DE PAGE SELON LE TABLEAU
function creationButton() {
    let taille = listFilm.length
    let nbbutton = taille / 50
    for (let b = 0; b < nbbutton; b++) {
        if (b === 0) {
            let but = document.createElement("button")
            but.classList = "page current"
            but.innerText = (b + 1)
            contentFoot.appendChild(but)
        } else {
            let but = document.createElement("button")
            but.classList = "page"
            but.innerText = (b + 1)
            contentFoot.appendChild(but)
        }

    }

    let buttonPage = document.querySelectorAll(".page")
    buttonPage.forEach(element => {
        element.addEventListener("click", () => {
            deleteFocus()
            element.classList += " current"
            currentPage = (element.innerHTML - 1)
            afficherFilm(currentPage)
        })
    });


}

//ENLEVE LE FOCUS DE TOUT LES BOUTONS DE PAGE
function deleteFocus() {
    let buttonPage = document.querySelectorAll(".page")
    for (let b = 0; b < buttonPage.length; b++) {
        buttonPage[b].classList = "page"
    }
}

//CHANGE LE FOCUS DU BOUTON ET SUPPRIME L ANCIEN FOCUS
function changeButton(index) {
    buttonPage.forEach(element => {
        element.addEventListener("click", () => {
            enleverButton()
            element.classList += " current"
            currentPage = (element.innerHTML - 1)
            afficherFilm(currentPage)
        })
    });
    ajouterButton(currentPage)
}

//SUPPRIME TOUT LES BOUTONS DE PAGES
function supprimerButtons() {
    contentFoot.innerHTML = ""
}

//AJOUTE LE FOCUS SUR UN BOUTON
function ajouterButton(index) {
    buttonPage[currentPage].classList += " current"
}

//AFFICHER LES FILMS PAR  DANS LA LISTE ORIGINE
function afficherFilm(index) {

    let buttonPage = document.querySelectorAll(".page")

    content.innerHTML = ""
    let tailleTab = listFilm.length

    let tailleFilm = (tailleTab % 50 === 0 ? 50 : tailleTab % 50)

    if (listFilm.length === 0) {
        let h1=document.createElement("h1")
        h1.innerText="Aucun film trouvé"
        h1.classList="pas"
        content.appendChild(h1)
    } else {
        if (buttonPage.length === index + 1) {
            for (let q = (index * 50); q < ((index * 50) + tailleFilm); q++) {
                let div = document.createElement("div")
                div.classList = "film"
                div.style.backgroundImage = ("url(https://image.tmdb.org/t/p/w300/" + listFilm[q].getImg() + ")")
                div.style.backgroundSize="cover"
                content.appendChild(div)


                let favo = document.createElement("span")
                let rep = listFilm[q].getFavorite()
                if (rep === true) {
                    favo.innerHTML = "&#129505"
                } else {
                    favo.innerHTML = "&#128420"
                }
                favo.style.display = "none"
                div.appendChild(favo)


                let title = document.createElement("h1")
                title.innerText = listFilm[q].getTitle()
                div.appendChild(title)
                title.style.display = "none"

                div.addEventListener("click", (event) => {

                    if (event.target.nodeName === "SPAN") {

                        let rep = listFilm[q].changeFavorite()
                        if (rep === true) {
                            favo.innerHTML = "&#129505"
                        } else {
                            favo.innerHTML = "&#128420"
                        }
                        if (alreadyInFav === true) {
                            getFavoriteFilm()
                        }
                    } else {
                        getVideoYoutubeByid(listFilm[q].getId(), listFilm[q].getDescription())
                        hiddenHTML.style.display = "block"
                    }

                })

                div.addEventListener("mouseover", () => {
                    title.style.display = "block"
                    favo.style.display = "block"
                })

                div.addEventListener("mouseleave", () => {
                    title.style.display = "none"
                    favo.style.display = "none"
                })


            }
        } else {
            for (let q = (index * 50); q < ((index + 1) * 50); q++) {
                let div = document.createElement("div")
                div.classList = "film"

                div.style.backgroundImage = ("url(https://image.tmdb.org/t/p/w300/" + listFilm[q].getImg() + ")")
                div.style.backgroundSize="cover"
                content.appendChild(div)

                let favo = document.createElement("span")
                let rep = listFilm[q].getFavorite()
                if (rep === true) {
                    favo.innerHTML = "&#129505"
                } else {
                    favo.innerHTML = "&#128420"
                }
                favo.style.display = "none"
                div.appendChild(favo)


                let title = document.createElement("h1")
                title.innerText = listFilm[q].getTitle()
                div.appendChild(title)
                title.style.display = "none"

                div.addEventListener("click", (event) => {

                    if (event.target.nodeName === "SPAN") {
                        let resp = listFilm[q].changeFavorite()

                        if (resp === true) {

                            favo.innerHTML = "&#129505"
                        } else {

                            favo.innerHTML = "&#128420"
                        }

                        if (alreadyInFav === true) {
                            getFavoriteFilm()
                        }
                    } else {
                        getVideoYoutubeByid(listFilm[q].getId(), listFilm[q].getDescription())
                        hiddenHTML.style.display = "block"
                    }

                })

                div.addEventListener("mouseover", () => {
                    title.style.display = "block"
                    favo.style.display = "block"
                })

                div.addEventListener("mouseleave", () => {
                    title.style.display = "none"
                    favo.style.display = "none"
                })


            }
        }




    }


}

//RETOURNE UN TABLEAU AVEC LES FILMS CONTENANT LA RECHERCHE PAR TITRE
function getTableauByTitle(search) {
    let mot = search.toLowerCase()
    let newList = listOrigine.filter(word =>
        (word.getTitle().toLowerCase())
            .indexOf(mot) !== -1);
    return newList
}

//RETOURNE UN FILM SUR BASE DE SON ID
function getFilmById(id) {
    let url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=35b8d6fe6bf345f7a25f90c1f08e70a2"
}

//RETOURNE LE IFRAME DU TEASER DU FILM + DESCRIPTION DU FILM
function getVideoYoutubeByid(id, description) {
    let url = "https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=35b8d6fe6bf345f7a25f90c1f08e70a2"
    let urlYoutube = "https://www.youtube.com/embed/"
    let youtubeKey
    fetch(url)
        .then(function (res) {
            res.json().then(function (filmi) {
                for (let i = 0; i < filmi.results.length; i++) {

                    if (filmi.results[i].name === "Official Trailer") {
                        youtubeKey = filmi.results[i].key

                    }
                }
                descHTML.innerText = description
                frameHTML.src = urlYoutube + youtubeKey
            })
        })

}

//RETOURNE LA LISTE DES FILMS QUI FONT PARTIE D'UNE CERTAINE CATEGORIE
function getFilmByCategorie(id_genre) {
    if (id_genre !== "") {
        listFilm = listOrigine.filter(film => film.getGenre().indexOf(parseInt(id_genre)) !== -1);

        supprimerButtons()
        creationButton()
        currentPage = 0
        afficherFilm(currentPage)

    } else {
        listFilm = listOrigine

        supprimerButtons()
        creationButton()
        currentPage = 0
        afficherFilm(currentPage)

    }
}

//RETOURNE LA LISTE DES FILMS FAVORIS
function getFavoriteFilm() {
    listFilm = listOrigine.filter(film => film.getFavorite() === true);
    supprimerButtons()
    creationButton()
    currentPage = 0
    afficherFilm(currentPage)
}

