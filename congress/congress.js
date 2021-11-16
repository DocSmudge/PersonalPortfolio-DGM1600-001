import { senators } from '../data/senators.js'

const senatorDiv = document.querySelector('.senators')

function SimplifiedSenators(){
    return senators.map(senator => {
        let middleName = senator.middle_name ? `${senator.middle_name}` : ` `
        return {
             id: senator.id,
             name: `${senator.first_name}${middleName}${senator.last_name}`,
             party: senator.party,
             gender: senator.gender,
             seniority: +senator.seniority,
             imgURL:`https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`
             
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
    
    
    console.log(filterSenators('gender', 'F'))

     const mostSeniorSenator = SimplifiedSenators().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)
     console.log(mostSeniorSenator)
    
    populateSenatorDiv(SimplifiedSenators())