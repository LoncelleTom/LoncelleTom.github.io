class Card {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.return = false
    }


    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getReturn() {
        return this.return;
    }

    sameCard(target) {
        return (this.id === target.getId() ? true : false)
    }

    returnCard() {
        this.return = (this.return === true ? false : true)
    }

    
}

let contentHTMLM = document.getElementById("content")
let cardList = []
let firstCardIndex
let lastCardIndex
let cpt = 0
let temps = 180
let start = false
let minute
let seconde

creationList()
cardList = mix(cardList)
afficher(cardList)

let cptVictory = 0
let cptDefeat = 10
let decompte
let listElement = document.querySelectorAll(".card")
let etat = document.getElementById("etat")
let but = document.getElementById("but")
let restant = document.getElementById("coup")
let commencerTimer = document.getElementById("startWithTimer")
let commencerTour = document.getElementById("startWithTour")
let tour = false
let isTimer = false


function creationList() {
    cardList.push(new Card(1, "&#9889"))
    cardList.push(new Card(2, "&#127757"))
    cardList.push(new Card(3, "&#x1F318"))
    cardList.push(new Card(4, "&#x1F34D"))
    cardList.push(new Card(5, "&#x1F37B"))
    cardList.push(new Card(6, "&#128064"))
    cardList.push(new Card(7, "&#x1F47D"))

    cardList.forEach(element => {
        cardList.push(new Card(element.getId(), element.getName()))
    });
}

commencerTimer.addEventListener("click", () => {
    commencerTimer.classList.add("d-none")
    commencerTour.classList.add("d-none")
    contentHTMLM.classList.remove("d-none")
    restant.classList.remove("d-none")
    isTimer = true
    playWithTimer()
})

commencerTour.addEventListener("click", () => {
    commencerTimer.classList.add("d-none")
    commencerTour.classList.add("d-none")
    contentHTMLM.classList.remove("d-none")
    restant.classList.remove("d-none")
    tour = true
    playWithTour()
})

function playWithTimer() {
    for (let i = 0; i < listElement.length; i++) {
        listElement[i].addEventListener("click", () => {
            if (cpt === 0 && cardList[i].getReturn() === false && cptDefeat > 0) {
                if (start === false) {
                    decompte = setInterval(timer, 1000)
                }
                start = true
                firstCardIndex = i
                cpt++
                cardList[firstCardIndex].returnCard()
                retourner(cardList[firstCardIndex], listElement[firstCardIndex])
            } else if (cpt === 1 && cardList[i].getReturn() === false) {
                lastCardIndex = i
                cpt++
                cardList[lastCardIndex].returnCard()
                retourner(cardList[lastCardIndex], listElement[lastCardIndex])
                round()
                

            }
        })
    }

}

function playWithTour() {
    restant.innerText = cptDefeat + " tentative(s) restante(s)"
    for (let i = 0; i < listElement.length; i++) {
        listElement[i].addEventListener("click", () => {
            if (cpt === 0 && cardList[i].getReturn() === false && cptDefeat > 0) {

                firstCardIndex = i
                cpt++
                cardList[firstCardIndex].returnCard()
                retourner(cardList[firstCardIndex], listElement[firstCardIndex])
            } else if (cpt === 1 && cardList[i].getReturn() === false) {
                lastCardIndex = i
                cpt++
                cardList[lastCardIndex].returnCard()
                retourner(cardList[lastCardIndex], listElement[lastCardIndex])
                round()
                

            }
        })
    }

}


function round() {
    let firstCard = cardList[firstCardIndex]
    let secondCard = cardList[lastCardIndex]


    if (!cardList[firstCardIndex].sameCard(cardList[lastCardIndex])) {
       
        cardList[firstCardIndex].returnCard()
        cardList[lastCardIndex].returnCard()
        if (tour === true) {

            cptDefeat--

            restant.innerText = cptDefeat + " tentative(s) restante(s)"
        }
        setTimeout(cacher, 1000);

        if (tour === true && cptDefeat === 0) {
            etat.innerText = "Défaite"
            setTimeout(defait, 1500);
            but.classList.remove("d-none")
        }
    } else {
        cpt = 0
        cptVictory++
        if (cptVictory === cardList.length / 2) {
            etat.innerText = "Félicitation"
            but.classList.remove("d-none")
            if (isTimer === true) {
                clearInterval(decompte)
            }
        }
    }
}

etat.addEventListener("click", () => {
    location.reload()
})

but.addEventListener("click", () => {
    location.reload()
})

function mix(tab) {

    tab.forEach(element => {
        let different = false
        let random = Math.floor(Math.random() * tab.length);
        let random2
        do {
            random2 = Math.floor(Math.random() * tab.length);
            different = random === random2 ? false : true
        } while (different === false)
        tab = permuter(random, random2, tab)
    });
    console.log(tab)
    return tab
}

function afficher(tab) {
    tab.forEach(element => {
        let cardHTML = document.createElement("div")

        contentHTMLM.appendChild(cardHTML)
        cardHTML.classList.add("card")
    });
}

function permuter(index1, index2, tab) {
    let temp = tab[index1]
    tab[index1] = tab[index2]
    tab[index2] = temp
    return tab
}

function retourner(card, element) {
    let pHTML = document.createElement("p")
    pHTML.innerHTML = card.getName()
    element.appendChild(pHTML)
}

function cacher() {
    listElement[firstCardIndex].innerHTML = ""
    listElement[lastCardIndex].innerHTML = ""
    cpt = 0
}

function defait() {
    for (let j = 0; j < cardList.length; j++) {
        retourner(cardList[j], listElement[j])
    }
}

function timer() {
    temps--
    minute = parseInt(temps / 60)
    seconde = temps - minute * 60
    if (temps === 0) {
        clearInterval(decompte)
        etat.innerText = "Défaite"
        setTimeout(defait, 1500);
        but.classList.remove("d-none")
    } else {
        restant.innerText = minute + " : " + seconde
    }

}

