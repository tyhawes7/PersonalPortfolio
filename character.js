import { people } from '../data/people.js'

const header = document.querySelector('header')
const main = document.querySelector('main')

const allCharsButton = document.createElement('button')
allCharsButton.textContent = 'All Characters'
allCharsButton.addEventListener('click', function () {
  console.log('Thanks!')
  populateDOM()
})
header.appendChild(allCharsButton)

function populateDOM() {
  people.forEach((person) => {
    const personFig = document.createElement('figure')
    const personImg = document.createElement('img')
    let charNum = getLastNumber(person.url)
    personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    const personCap = document.createElement('figcaption')
    personCap.textContent = 'Star wars character'

    personFig.appendChild(personImg)
    personFig.appendChild(personCap)
    main.appendChild(personFig)
  })
}

function getLastNumber(url) {
  const secondToLastLetterOfUrl = url[url.length - 2]
  return secondToLastLetterOfUrl
}
