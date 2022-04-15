let container = document.querySelector(".container")
document.querySelector('button').addEventListener('click', getFetch)


function getFetch() {
  const choice = document.querySelector('input').value
  const url = `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/${choice}/psn`

  document.querySelector('.container').innerHTHML = ""

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

        //create section
        const section = document.createElement('section')
        section.classList.add(`match${i}`)
        //append section to container
        document.querySelector('.container').appendChild(section)

        //create ul to hold states within section
        const ul = document.createElement('ul')
        ul.classList.add(`list${i}`)
        //append ul to newly created section
        document.querySelector(`.match${i}`).appendChild(ul)


        //create li to hold states within section
        const li2 = document.createElement('li')
        //add text to newly created li
        li2.textContent = `Placement: ${playerStats.teamPlacement}`
        //append ul to newly created section
        document.querySelector(`.list${i}`).appendChild(li2)


        //create li to hold states within section
        const li = document.createElement('li')
        //add text to newly created li
        li.textContent = `Kills: ${playerStats.kills}`
        //append ul to newly created section
        document.querySelector(`.list${i}`).appendChild(li)


        //create li to hold states within section
        const li3 = document.createElement('li')
        //add text to newly created li
        li3.textContent = `Deaths: ${playerStats.deaths}`
        //append ul to newly created section
        document.querySelector(`.list${i}`).appendChild(li3)
    }
  }

  
  })
	.catch(err => console.error(err));

}