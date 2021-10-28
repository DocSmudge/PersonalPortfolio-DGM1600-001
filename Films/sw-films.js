import { films } from '../data/films.js'

let filmList = document.querySelector('#filmList')


for(let i = 0; i < films.length; i++) {
let figure = document.createElement('figure')
let figImg = document.createElement('img')
figImg.src = `https://starwars-visualguide.com/assets/img/films/${i+1}.jpg`
let figCaption = document.createElement('figCaption')
figCaption.textContent = films[i].title

figure.appendChild(figImg)
figure.appendChild (figCaption)
filmList.appendChild(figure)
}

// add a function later that will get the URL property and use Array.find() to match titles with posters.


