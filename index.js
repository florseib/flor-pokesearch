const searchForm = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const pokemonContainer = document.querySelector("#pokemon-container");

const searchPokemon = async (e) => {
  e.preventDefault();
  pokemonContainer.innerHTML = "";
  let searchValue = input.value.trim();
  input.value = "";

  if (!searchValue) {
    pokemonContainer.innerHTML = `<span class="warning">Por favor ingrese un valor válido</span>`;
    return;
  }

  let selectedPokemon = await fetchPokemon(searchValue)
    .then((res) => {
      renderPokemon(res);
    })
    .catch((ex) => {
      pokemonContainer.innerHTML = `<span class="warning">${ex}</span>`;
    });

  if (selectedPokemon) {
    renderPokemon(selectedPokemon);
  }
};

async function fetchPokemon(searchValue) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`).then(
    async (res) => {
      if (res.status === 404)
        throw "No existe un Pokémon con ese número de Pokédex.";

      let data = await res.json();

      return data;
    }
  );
}

function renderPokemon(pokemon) {
  pokemonContainer.innerHTML = `<h2>${pokemon.species.name.toUpperCase()}</h2>
    <h3>Tipo(s): ${pokemon.types
      .map((type) => renderTypeName(type.type.name))
      .join(", ")}</h3>
    <h3>Peso: ${pokemon.weight / 10} kg</h3>
    <h3>Altura: ${pokemon.height / 10} m</h3>
     <img src="${
       pokemon.sprites.other.home.front_default
     }" class="pokemon-image">`;
}

const renderTypeName = (type) => {
  // agrego line breaks entre los cases y los reparto en grupos más o menos lógicos para que no se arme un masacote ilegible
  switch (type) {
    case "normal":
      return "normal";
    case "flying":
      return "Volador";

    case "fire":
      return "Fuego";
    case "water":
      return "Agua";
    case "grass":
      return "Planta";
    case "electric":
      return "Eléctrico";
    case "ice":
      return "Hielo";

    case "ground":
      return "Tierra";
    case "rock":
      return "Roca";
    case "steel":
      return "Acero";

    case "poison":
      return "Veneno";
    case "bug":
      return "Bicho";

    case "dark":
      return "Siniestro";
    case "fighting":
      return "Lucha";
    case "psychic":
      return "Psíquico";

    case "fairy":
      return "Hada";
    case "dragon":
      return "Dragón";
    case "ghost":
      return "Fantasma";
  }
};

function init() {
  searchForm.addEventListener("submit", searchPokemon);
}

init();
