import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'


const members = [...senators, ...representatives] //spread method - modern way to combine arrays like a genius! (not genus lol)

console.log(members.length)

const senatorDiv = document.querySelector('.senators')

function SimplifiedMembers(chamberFilter){
   const filter = members.filter(member => chamberFilter ? member.short_title === chamberFilter : members)
    
    return senators.map(senator => {
        let middleName = senator.middle_name ? `${senator.middle_name}` : ` `
        return {
             id: senator.id,
             name: `${senator.first_name} ${middleName}${senator.last_name}`,
             party: senator.party,
             gender: senator.gender,
             seniority: +senator.seniority,
             imgURL:`https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
             missedVotesPct: senator.missed_votes_pct,
             loyaltyPct: senator.votes_with_party_pct,
             
         }
    })
}

function populateSenatorDiv(simpleSenators){
    simpleSenators.forEach(senator =>{
        const senFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')

        figImg.src = senator.imgURL
        figCaption.textContent = senator.name
        
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    })

}
const filterSenators = (prop, value) =>  SimplifiedSenators().filter(senator => senator[prop] === value)
    
    
    //console.log(filterSenators('gender', 'F'))

     const mostSeniorSenator = SimplifiedSenators().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)

     //console.log(mostSeniorSenator)

     const mostLoyal = SimplifiedSenators().reduce((acc, senator) => {
         if (senator.loyaltyPct === 100) { 
         acc.push(senator)
     }
     return acc
    }, [])
    
    //console.log(mostLoyal)

    populateSenatorDiv(SimplifiedSenators())

    //pausing at 40:17 on 11/16 recording. He's right in the middle of solving the const filter issue. Double check to make sure line 12 matches his. Commit this first thing.