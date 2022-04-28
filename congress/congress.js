import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'


const senatorsDiv = document.querySelector('.senatorsDiv')

function simplifiedSenators() {
    return senators.map(senator => {
      const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
      return {
        id: senator.id,
        name: `${senator.first_name}${middleName}${senator.last_name}`,
        gender: senator.gender,
        party: senator.party,
        imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
        seniority: senator.seniority,
        state: senator.state,
        missedVotesPct: senator.missed_votes_pct,
        loyaltyPct: senator.votes_with_party_pct
      }
    })
  }

  function populateSenatorDiv(senatorsArray) {
    senatorsArray.forEach(senator => {
      const senFigure = document.createElement('figure')
      const figImg = document.createElement('img')
      const figCaption = document.createElement('figcaption')
  
      figImg.src = senator.imgURL
      figCaption.textContent = senator.name
  
      senFigure.appendChild(figImg)
      senFigure.appendChild(figCaption)
      senatorsDiv.appendChild(senFigure)
    })
  }
  
  populateSenatorDiv(simplifiedSenators())
  
  const mostSeniorMember = simplifiedSenators().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)
  
  function simplifiedMembers(people){
    return people.map((member) => {
      const middleName = member.middle_name ? ` ${member.middle_name} ` : ` `
      return {
        id: member.id,
        name: `${member.first_name}${middleName}${member.last_name}`,
        gender: member.gender,
        party: member.party,
        imgURL: `https://www.govtrack.us/static/legislator-photos/${member.govtrack_id}-200px.jpeg`,
        seniority: member.seniority,
        state: member.state,
        missedVotesPct: member.missed_votes_pct,
        loyaltyPct: member.votes_with_party_pct
      }
    })
  }


  if (member.party === 'R'){
    figCaption.style.setProperty('background-color', '#A60A33')
   }
   if (member.party === 'R'){
     figImg.style.setProperty('border-color', '#A60321')
    }

   if (member.party === 'D'){
     figCaption.style.setProperty('background-color', '#023373')
   }

   if (member.party === 'D'){
     figImg.style.setProperty('border-color', '#022859')
   }

seniorityHeader.textContent = `The most senior Senator is ${mostSeniorMember.name} and the biggest fans of vacations are TBD...`

simplifiedSenators().forEach(senator => {
  if(senator.loyaltyPct === 100) {
    let listItem = document.createElement('li')
    listItem.textContent = senator.name
    loyaltyList.appendChild(listItem)
  }
})

populateStats(simplifiedMembers(allMembersOfCongress))

  function populateStats(allCongress) {
    removeChildren(congressStats);

  }
  const loyaltyLine = document.createElement("p");
  loyaltyLine.textContent = `The members who have 100% voting loyalty to their parties are:`

  const loyaltyList = document.createElement("ul");

  const biggestMissedVotesPct = allCongress.reduce((acc, member) => acc.missedVotesPct > member.missedVotesPct ? acc : member)
  
  const biggestVactionerList = allCongress.filter(member => member.missedVotesPct === biggestMissedVotesPct.missedVotesPct).map(member => member.name).join(' and ')
  
  seniorityHeader.textContent = `The most senior member is Don Young and the biggest fan of vacations is ${biggestVactionerList}.`;

  //seniorityHeader.textContent = `The most senior Member is ${mostSeniorMember.name} and the biggest fan of vacations is ${biggestVactionerList}.`

  allCongress.forEach(member => {
   if(member.loyaltyPct === 100) {
          let listItem = document.createElement('li')  
          listItem.textContent = member.name
          loyaltyList.appendChild(listItem)
    }
  })