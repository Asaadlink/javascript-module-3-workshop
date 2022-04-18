async function renderPokemon(response) {
    const jsonBody = await response.json();
  
    // Create all elements
    const pokemonContainer = document.createElement('div');
    const pokemonTitleContainer = document.createElement('div');
    const pokemonName = document.createElement('p');
    const pokemonId = document.createElement('p');
    const pokemonImg = document.createElement('img');
    const pokemonTypeContainer = document.createElement('div');
    const pokemonAbilityContainer = document.createElement('div');
  
    // Style the Ability Container
    pokemonAbilityContainer.style.display = 'block';
    pokemonAbilityContainer.style.backgroundColor = 'tomato';
    pokemonAbilityContainer.style.borderRadius = '10px';
    pokemonAbilityContainer.style.padding = '1em';
    pokemonAbilityContainer.style.margin = '1em 0';
  
    // Style the Type Container
    pokemonTypeContainer.style.display = 'flex';
    pokemonTypeContainer.style.justifyContent = 'space-around';
    pokemonTypeContainer.style.backgroundColor = 'chocolate';
    pokemonTypeContainer.style.borderRadius = '10px';
  
    // Style the Tite Container
    pokemonTitleContainer.style.display = 'flex';
    pokemonTitleContainer.style.justifyContent = 'space-between';
  
    // Style the Main Container
    pokemonContainer.style.backgroundColor = 'lightgreen';
    pokemonContainer.style.padding = '1em';
    pokemonContainer.style.fontFamily = 'sans-serif';
    pokemonContainer.style.color = 'white';
    pokemonContainer.style.borderRadius = '10px';
    pokemonContainer.style.margin = '1em';
  
    // Replace the contents of the name, id and image
    pokemonName.innerText = jsonBody['name'].toUpperCase();
    pokemonId.innerText = `#${jsonBody['id']}`;
    pokemonImg.src = jsonBody['sprites']['other']['dream_world']['front_default'];
  
    // Style the image element
    pokemonImg.style.width = '-webkit-fill-available';
  
    // Add all different types for the pokemon
    jsonBody['types'].forEach(type => {
      const typeNameElement = document.createElement('p');
      typeNameElement.innerText = type['type']['name'];
      pokemonTypeContainer.appendChild(typeNameElement);
    });
  
    // Add the pokemon abilities
    const abilitiesFetch = jsonBody['abilities'].map(ability => fetch(ability['ability']['url']));
    const fetchedAbilities = await Promise.all(abilitiesFetch);
  
    const unresolvedJsonAbilities = fetchedAbilities.map(fetchedAbility => fetchedAbility.json())
    const jsonAbilities = await Promise.all(unresolvedJsonAbilities);
    jsonAbilities.forEach(jsonAbility => {
      const abilityParagraph = document.createElement('p');
      abilityParagraph.innerText = jsonAbility['effect_entries'][0]['short_effect'];
      pokemonAbilityContainer.appendChild(abilityParagraph);
    });
  
    // Append all the elements to the main container and to the body
    pokemonTitleContainer.appendChild(pokemonName);
    pokemonTitleContainer.appendChild(pokemonId);
    pokemonContainer.appendChild(pokemonTitleContainer);
    pokemonContainer.appendChild(pokemonImg);
    pokemonContainer.appendChild(pokemonTypeContainer);
    pokemonContainer.appendChild(pokemonAbilityContainer);
    document.querySelector('body').appendChild(pokemonContainer);
  }
  // Initial fetch
  fetch('https://pokeapi.co/api/v2/pokemon/1')
  .then(renderPokemon);
  
  document.querySelector('#search-button').addEventListener('click', _event => {
    const pokemonId = document.querySelector('#search-input').value;
  
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(
      response => renderPokemon(response)
    )
    .catch(error => {
      console.error(error);
      const errorMessage = document.createElement('h1');
      errorMessage.innerText = 'There was an error with the server, try again.';
      document.querySelector('body').appendChild(errorMessage);
    });
  });
