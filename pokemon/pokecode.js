import { removeChildren } from '../utils/index.js'

const getAPIData = async (url) => {
    try {
      const result = await fetch(url)
      return await result.json()
    } catch (error) {
      console.error(error)
    }
  }

  class Pokemon {
    constructor(name, height, weight, abilities, types, moves) {
      this.id = 9001,
      this.name = name,
      this.height = height,
      this.weight = weight,
      this.abilities = abilities,
      this.types = types,
      this.moves = moves
    }
  }
  
  const pokeHeader = document.querySelector('header')
  const pokeGrid = document.querySelector('.pokegrid')
  const loadButton = document.createElement('button')
  loadButton.contex
  
  const newButton = document.createElement('button')
 

  newButton.textContent = 'New Pokemon'
  pokeHeader.appendChild(newButton)
  newButton.addEventListener('click', () => {
    

    const newPokemon = new Pokemon(
      pokeName, 
      makeTypesArray(pokeTypes),
      pokeHeight, 
      pokeWeight,
      makeMovesArray(pokeMoves))
      makeAbilitiesArray(pokeAbilities), 
      console.log(newPokemon)
      populatePokeCard(newPokemon)
  })

  function makeAbilitiesArray(commaString) { 
    return commaString.split(',').map((abilityName) => {
      return { ability: { name: abilityName } }
    })
    }
    
  function makeTypesArray(spacedString) { 
    return spacedString.split(' ').map((typeName) => {
      return { type: { name: typeName } }
    })
    }

 function makeMovesArray(spacedString) { 
   return spacedString.split('').map((movesName)=> {
          return { type: { name: movesName}}
    })
  }

  const loadedPokemon = []

  async function loadPokemon(offset = 0, limit = 25) {
    const data = await getAPIData(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    for (const nameAndUrl of data.results) {
      const singlePokemon = await getAPIData(nameAndUrl.url)
      const simplifiedPokemon = {
        id: singlePokemon.id,
        height: singlePokemon.height,
        weight: singlePokemon.weight,
        name: singlePokemon.name,
        abilities: singlePokemon.abilities,
        types: singlePokemon.types,
        moves: singlePokemon.moves.slice(0, 3),
      } 
      loadedPokemon.push(simplifiedPokemon)
      populatePokeCard(simplifiedPokemon)
    }
  }
  
  function populatePokeCard(pokemon) {
    const pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => pokeCard.classList.toggle('is-flipped'))
    pokeCard.appendChild(populateCardFront(pokemon))
    pokeCard.appendChild(populateCardBack(pokemon))
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
  }
  
  function populateCardFront(pokemon) {
    const pokeFront = document.createElement('figure')
    pokeFront.className = 'cardFace front'

    const pokeType = pokemon.types[0].type.name
    const pokeType2 = pokemon.types[1]?.type.name
     console.log(pokeType, pokeType2)
    pokeFront.style.setProperty('background', getPokeTypeColor(pokeType))
  
    if(pokeType2) {
      pokeFront.style.setProperty('background', `linear-gradient(${getPokeTypeColor(pokeType)}, ${getPokeTypeColor(pokeType2)})`)
    } 


    const pokeImg = document.createElement('img')
    if (pokemon.id === 9001) {
      pokeImg.src = '../images/pokeball.png'
    } else {
      pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    }
    const pokeCaption = document.createElement('figcaption')
    pokeCaption.textContent = pokemon.name
  
    pokeFront.appendChild(pokeImg)
    pokeFront.appendChild(pokeCaption)
    return pokeFront
  }
  
  function populateCardBack(pokemon) {
    const pokeBack = document.createElement('div')
    pokeBack.className = 'cardFace back'

    const typeLabel = document.createElement("h4");
    typeLabel.textContent = "Type";
    pokeBack.appendChild(typeLabel);

    const typesList = document.createElement('dl')
    pokemon.types.forEach((pokeType) => {
      const typeItem = document.createElement('dt')
      typeItem.textContent = pokeType.type.name 
      typesList.appendChild(typeItem)
    })
    pokeBack.appendChild(typesList)

    const abilitylabel = document.createElement('h4')
    abilitylabel.textContent = 'Abilities'
    pokeBack.appendChild(abilitylabel)

    const abilityList = document.createElement('ul')
    pokemon.abilities.forEach((abilityItem) => {
      const listItem = document.createElement('li')
      listItem.textContent = abilityItem.ability.name
      abilityList.appendChild(listItem)
    })

    pokeBack.appendChild(abilityList)

    const moveslabel = document.createElement('h4')
    moveslabel.textContent = 'Moves'
    pokeBack.appendChild(moveslabel)

    const movesList = document.createElement('ul')
    pokemon.moves.forEach((movesItem) => {
      const pokeMovesItem = document.createElement('li');
      pokeMovesItem.textContent = movesItem.move.name;
      movesList.appendChild(pokeMovesItem);
    })

    pokeBack.appendChild(movesList)

    const pokeHeight = document.createElement('h5')
    pokeHeight.textContent = `Height: ${pokemon.height}`

    const pokeWeight = document.createElement('h5')
    pokeWeight.textContent = `Weight: ${pokemon.weight}`

    pokeBack.appendChild(pokeHeight)
    pokeBack.appendChild(pokeWeight)

    return pokeBack
  }

  
  function getPokeTypeColor(pokeType) {
    let color
    switch (pokeType) {
      case 'grass':
        color = '#78C84F'
        break
      case 'fire':
        color = '#F29252'
        break
      case 'water':
        color = '#6C93F1'
        break
      case 'bug':
        color = '#A8B820'
        break
      case 'normal':
        color = '#A8A878'
        break
      case 'flying':
        color = '#A790F0'
        break
      case 'poison':
        color = '#A040A0'
        break
      case 'electric':
        color = '#F9D135'
        break
      case 'psychic':
        color = '#F85888'
        break
      case 'ground':
        color = '#E0C068'
        break
      case 'fighting':
        color = '#C03128'
        break
      case 'rock':
        color = '#B7A039'
        break
      case 'ghost':
        color = '#705898'
        break
      case 'steel':
        color = '#B8B8D0'
        break
      case 'ice':
        color = '#99D8D8'
        break
      case 'dragon':
        color = '#7038F8'
        break
      case 'dark':
        color = '#6F5848'
        break
      case 'fairy':
        color = '#EE99AC'
        break
      default:
        color = '#829EAA'
    }
    return color
  }
  
  function filterPokemonByType(type) {
    return loadedPokemon.filter((pokemon) => {
      if(pokemon.types[0].type.name === type) return pokemon
      if((pokemon.types[1]?.type.name) && (pokemon.types[1].type.name === type)) {
        return pokemon
      } 
    })
  }
  
  
  await loadPokemon(0, 150)

  console.log(filterPokemonByType('grass'))

const selectType = document.querySelector('.type-selector');
selectType.addEventListener('change', (event) => {
  console.log(`You like ${event.target.value}`);
  const filteredByType = filterPokemonByType(event.target.value)
  removeChildren(pokeGrid) 
  filteredByType.forEach(pokemon => populatePokeCard(pokemon))
})