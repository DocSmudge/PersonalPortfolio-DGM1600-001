import { films } from '../data/films.js'

let filmList = document.querySelector('#filmList')

filmList.textContent = 'This is my content. here is more content'

let myImg=document.createElement('img')
myImg.src = 'https://starwars-visualguide.com/assests/img/films/1.jpg'
filmList.appendChild('myImg')


