import { people } from'../data/people.js.js'

people.forEach(element => {
    const charFigure = document.createElement('figure')
    const charImg = document .createElement('img')
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/1.jpg`
    charFigure.appendChild(charImg)
    mainContent.appendChild(charFigure)
}