import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'


const members = [...senators, ...representatives] //spread method - modern way to combine arrays like a genius! (not genus lol)
const loyaltyHeading = document.querySelector('.mostLoyal')
const seniorityHeading = document.querySelector('.seniority')
members.forEach(member => console.log(member.short_title))
const senatorDiv = document.querySelector('.senators') //connecting this to senator Div in html



function SimplifiedMembers(chamberFilter){ // Here we're creating a function called SimplifiedMembers, and we're going to pass into it the chamberFilter Array
   const filteredArray = members.filter(member => chamberFilter ? member.short_title === chamberFilter : member)
    
    return filteredArray.map(senator => { //Here we will return a filteredArray and run the map function over it (the map function creates a new array populated with the results of calling a provided function on every element in the calling array. We're passing the item "senator")
        let middleName = senator.middle_name ? `${senator.middle_name}` : ` ` //here is our logic for the middle name property. The ternary operator here is asking, Senator object, do you have a middle name? if true lets use your middle name. if false give us an empty string.
      //returning each object (id,name, party etc are properties of the senator object)
        return  {
             id: senator.id,
             name: `${senator.first_name} ${middleName} ${senator.last_name}`,
             party: senator.party,
             gender: senator.gender,
             seniority: +senator.seniority,
             imgURL:`https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
             missedVotesPct: senator.missed_votes_pct,
             loyaltyPct: senator.votes_with_party_pct,
             
         }
    })
}
// this forEach loop is looking at each senator in the function, and creating imgs, figures and figCaption elements for each one.
function populateSenatorDiv(simpleSenators){
   
    clearSenatorData()
    clearMostLoyalMembers()
    clearMostSeniorMember()
 
    simpleSenators.forEach(senator =>{
       
        
        const senFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')
       

        figImg.src = senator.imgURL // this is assigning the image url to the figImg source.
        figCaption.textContent = senator.name // this is assigning the text content to the value senator.name
    
        
        senFigure.appendChild(figImg) // this is adding to DOM
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
        senFigure.appendChild(seniorityHeading)
        senatorDiv.appendChild(loyaltyHeading)
    })
 
}
   
    //this is a new function, we're calling the simplifiedMembers array and sorting through it with reduce. We take our accumlator and our senator and eventually return the senator that meets the criteria using a ternary operator. 
    // the ternary operator states this: accumulator (the first time through this is just the first hit it gets), and seniority assigned to it, if your seniority is greater then the senator (2nd paramater), return the accumulater, otherwise return the senator that replaces it.
    const mostSeniorMember = SimplifiedMembers().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator) 
   

  
// this is calling the simplifiedMembers function, and calling a reduce. We then give it an accumulator and a senator and state, if the senator's loyalty percentage is exactly equal to 100, 
    //then that accumulator gets initialized to that new senator.

let mostLoyal = SimplifiedMembers().reduce((acc, senator) => {
    if (senator.loyaltyPct === 100) { 
  acc.push(senator)
}
return acc
}, [])




const senator_button = document.querySelector('#senator_button');
senator_button.addEventListener('click', () => {
    console.log('click')
    populateSenatorDiv(SimplifiedMembers('Sen.'))
})

const representative_button = document.querySelector('#representative_button');
representative_button.addEventListener('click', () => {
   console.log('click')
    populateSenatorDiv(SimplifiedMembers('Rep.'))
})


const loyal_button = document.querySelector('#loyal_button');
loyal_button.addEventListener('click', () =>{
   
    populateSenatorDiv(mostLoyal)
    loyaltyHeading.textContent = 'These are the most loyal members of Congress, who vote with their party 100% of the time.'
    
    
})


const senior_button = document.querySelector('#senior_button');
senior_button.addEventListener('click', () => {
    let seniorArray = []
    seniorArray.push(mostSeniorMember)
    populateSenatorDiv(seniorArray)
    seniorityHeading.textContent = `The Most Senior Member of Congress Is: ${mostSeniorMember.name} who has been in congress for ${mostSeniorMember.seniority} years.` //this is putting a heading into the document
    
})


function clearSenatorData(){
   while ( senatorDiv.firstChild){
        senatorDiv.removeChild(senatorDiv.firstChild)
     
    }
}

function clearMostSeniorMember(){
    while (seniorityHeading.firstChild){
        seniorityHeading.removeChild(seniorityHeading.firstChild)
    }
}
function clearMostLoyalMembers(){
    while (loyaltyHeading.firstChild){
        loyaltyHeading.removeChild(loyaltyHeading.firstChild)
    }
}
