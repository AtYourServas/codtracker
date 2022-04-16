let container = document.querySelector(".container")
document.querySelector('button').addEventListener('click', getFetch)


function getFetch() {
  const choice = document.querySelector('input').value
  const url = `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/${choice}/psn`
  document.querySelector('.container').innerHTML = ""


  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'call-of-duty-modern-warfare.p.rapidapi.com',
		'X-RapidAPI-Key': '32e1430bf5msh1c1ebe3b00e5733p1d996cjsn39758a613648'
	}
};

fetch(url, options)
	.then(response => response.json())
	.then(response => {
  console.log(response)
  let matches = response.matches
  

  for (i = 0; i < 20; i++) {
    if (matches[i].mode == "br_brduos") {
        let player = matches[i].player
        let playerStats = matches[i].playerStats
        let date = new Date(matches[i].utcStartSeconds * 1000)
        let formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${appendLeadingZeroes(date.getHours())}:${appendLeadingZeroes(date.getMinutes())}`

      createSection(i)
      createList(i)
      createStatItem(i, formattedDate, '')
      createStatItem(i, 'Placement', playerStats.teamPlacement)
      createStatItem(i, 'Kills', playerStats.kills)
      createStatItem(i, 'Deaths', playerStats.deaths)
      createStatItem(i, 'K/D Ratio', playerStats.kdRatio.toFixed(2))
      createStatItem(i, 'Assists', playerStats.assists)
      createStatItem(i, 'Headshots', playerStats.headshots)
      createStatItem(i, 'Damage', playerStats.damageDone)
      createStatItem(i, 'Damage Taken', playerStats.damageTaken)

    }
  }


  })
	.catch(err => console.error(err));

//Functions

function createSection(num) {
    //create section
    const section = document.createElement('section')
    section.classList.add(`match${num}`)
    //append section to container
    document.querySelector('.container').appendChild(section)
}

function createList(num) {
   //create ul to hold states within section
  const ul = document.createElement('ul')
  ul.classList.add(`list${i}`)
  //append ul to newly created section
  document.querySelector(`.match${i}`).appendChild(ul)
}

function createStatItem (num, title, stat) {
 //create li to hold states within section
 const li = document.createElement('li')
 //add text to newly created li
 li.innerHTML = `<h4>${title}</h4> <p>${stat}</p>`
 //append ul to newly created section
 document.querySelector(`.list${num}`).appendChild(li)
}


  function appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }

}