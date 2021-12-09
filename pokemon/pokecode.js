import { removeChildren } from "../utils/index.js";
async function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
}

function loadPokemon(offset = 0, limit = 25) {
  removeChildren(pokeGrid);
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    console.log(data);
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCard(pokeData)
      );
    }
  });
}

const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");
loadButton.addEventListener("click", () => {
  removeChildren(pokeGrid);
  loadPokemon();
});
const newButton = document.querySelector(".newPokemon");
newButton.addEventListener("click", () => {
  let pokeName = prompt("What is the name of your new pokemon?");
  let pokeHeight = prompt("What is the height of your Pokemon?");
  let pokeAbilities = prompt(
    "What are your Pokemon abilities?(use a comma separated list"
  );

  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    3785,
    getAbilitiesArray(pokeAbilities)
  );

  console.log(newPokemon);
  populatePokeCard(newPokemon);
});

const morePokemon = document.querySelector(".morePokemon");
morePokemon.addEventListener("click", () => {
  let startPoint = prompt("Which Pokemon ID do we want to start with?");
  let howMany = prompt("How many more Pokemon do you want to see?");
  loadPokemon(startPoint, howMany);
});

function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(",");
  console.log(tempArray);
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      },
    };
  });
}

function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement("div");
  const pokeCard = document.createElement("div");

  pokeScene.className = "scene";
  pokeCard.className = "card";

  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );
  const front = populateCardFront();
  const back = populateCardBack(singlePokemon);

  pokeCard.appendChild(front);
  pokeCard.appendChild(back);
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront() {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  return pokeFront;
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  const pokeCaption = document.createElement("h4");
  const label = document.createElement("h4");
  const abilityList = document.createElement("ul");
  const pokeImg = document.createElement("img");

  if (pokemon.id === 9001) {
    pokeImg.src = "../images/pokeBall.png";
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }

  pokeBack.className = "cardFace back";
  pokeCaption.innerHTML = `${pokemon.name}`;
  pokeBack.backgroundImg = "url('../images/pokemonColor.jpeg')";
  label.textContent = "Abilities:";

  pokemon.abilities.forEach((ability) => {
    let abilityItem = document.createElement("li");
    abilityItem.textContent = ability.ability.name;
    abilityList.appendChild(abilityItem);
  });
  pokeBack.appendChild(pokeImg);
  pokeBack.appendChild(pokeCaption);
  pokeBack.appendChild(label);
  pokeBack.appendChild(abilityList);
  return pokeBack;
}

class Pokemon {
  constructor(name, height, weight, abilities) {
    (this.id = 9001),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities);
  }
}

//   pokeFront.appendChild(pokeImg);
//   pokeFront.appendChild(pokeCaption);
