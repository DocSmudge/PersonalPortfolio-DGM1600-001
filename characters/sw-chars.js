import { people } from "../data/people.js";
import { getLastNumber, removeChildren } from "../utils/index.js";

const mainContent = document.querySelector("#main"); //returns the first element that matches a specified CSS selector in the document.
const maleCharacters = people.filter((person) => person.gender === "male");
const femaleCharacters = people.filter((person) => person.gender === "female");
const otherCharacters = people.filter((person) => {
  //
  if (
    person.gender === "hermaphrodite" ||
    person.gender === "n/a" ||
    person.gender === "none"
  ) {
    return person;
  }
});

function populateDOM(characters) {
  characters.forEach((character) => {
    /* Creating Elements */
    const charFigure = document.createElement("figure");
    // <figure></figure>

    const charImg = document.createElement("img");
    // <img src=""></img>

    const charCaption = document.createElement("figcaption");
    // <figcapton></figcapton>

    // Grabbing the id from url
    const charNum = getLastNumber(character.url);

    /* minipulating elements */
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;
    // <img src="https://starwars-visualguide.com/assets/img/characters/3.jpg"/>

    charCaption.textContent = character.name;
    // <figcapton>name</figcapton>

    /* Putting it all together */
    charFigure.appendChild(charImg);
    // <figure>
    //   <img src="https://starwars-visualguide.com/assets/img/characters/3.jpg"></img>
    // </figure>
    charFigure.appendChild(charCaption);
    // <figure>
    //   <img src="https://starwars-visualguide.com/assets/img/characters/3.jpg"></img>
    //   <figcapton>name</figcapton>
    // </figure>
    mainContent.appendChild(charFigure);
    // <main id='main'>
    //   <figure>
    //     <img src="https://starwars-visualguide.com/assets/img/characters/3.jpg"></img>
    //     <figcapton>name</figcapton>
    //   </figure>
    // </main>
  });
}

function handleCharacterSelect(activeCharacters) {
  //activeCharacters is the paramater for this function
  removeChildren(mainContent);
  populateDOM(activeCharacters);
}

// Creating
const header = document.createElement("header");
const maleButton = document.createElement("button");
const femaleButton = document.createElement("button");
const otherButton = document.createElement("button");

// Mutating
femaleButton.textContent = "Female Characters";
maleButton.textContent = "Male Characters";
otherButton.textContent = "Other Characters";

// Adding to DOM
header.appendChild(maleButton);
header.appendChild(femaleButton);
header.appendChild(otherButton);

//Buttons
maleButton.addEventListener("click", () =>
  handleCharacterSelect(maleCharacters)
);
femaleButton.addEventListener("click", () =>
  handleCharacterSelect(femaleCharacters)
);
otherButton.addEventListener("click", () =>
  handleCharacterSelect(otherCharacters)
);

document.body.insertBefore(header, mainContent); // This moves the header to the top of the document, above main content.
