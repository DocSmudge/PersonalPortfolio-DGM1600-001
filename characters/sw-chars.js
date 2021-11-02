import { people } from "../data/people.js";
import { getLastNumber,removeChildren } from "../utils/index.js";

const mainContent = document.querySelector("#main");

const maleCharacters = people.filter((person) => person.gender === "male");
const femaleCharacters = people.filter((person) => person.gender === "female");
const otherCharacters = people.filter((person) => {
  if (
    person.gender === "hermaphrodite" ||
    person.gender === "n/a" ||
    person.gender === "none"
  ) {
    return person;
  }
});


populateDOM(otherCharacters);
removeChildren(mainContent);

const header = document.createElement("header");
const maleButton = document.createElement("button");
const femaleButton = document.createElement("button");

femaleButton.textContent = "Female Characters";
maleButton.textContent = "Male Characters";


maleButton.addEventListener("click", () => populateDOM(maleCharacters));
femaleButton.addEventListener("click", () => populateDOM(femaleCharacters));

header.appendChild(maleButton);
header.appendChild(femaleButton);

document.body.insertBefore(header, mainContent);

function populateDOM(characters) {

  characters.forEach((element) => {
    const charFigure = document.createElement("figure");
    const charImg = document.createElement("img");
    const charNum = getLastNumber(element.url);
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;

    const charCaption = document.createElement("figcaption");
    charCaption.textContent = element.name;

    charFigure.appendChild(charImg);
    charFigure.appendChild(charCaption);
    mainContent.appendChild(charFigure);
  });
}

