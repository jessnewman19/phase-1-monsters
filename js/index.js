//When the page loads, show the first 50 monsters. 
// Each monster's name, age, and description should be shown.
document.addEventListener("DOMContentLoaded", () => { 
  fetch("http://localhost:3000/monsters/?_limit=50")
  .then(response => response.json())
  .then(data => { 
    showMonsters(data)
    createForm()
    forwardButtonClick()
    backButtonClick()
    })
  })

  function showMonsters(monsterData) {
    const monsterContainer = document.getElementById("monster-container")
    monsterData.forEach(monster => { 
      let monsterDiv = document.createElement("div")
      let monsterH2 = document.createElement("h2")
      let monsterH4 = document.createElement("h4")
      let monsterP = document.createElement("p")

      //Create variables to loop through
      let monsterName = monster.name 
      let monsterAge = monster.age 
      let monsterDescription = monster.description 

      // Add content to each element 
      monsterH2.innerText = monsterName 
      monsterH4.innerText = monsterAge
      monsterP.innerText = monsterDescription

      //Append elements to the DOM for each iteration
      monsterContainer.appendChild(monsterDiv)
      monsterDiv.appendChild(monsterH2)
      monsterDiv.appendChild(monsterH4)
      monsterDiv.appendChild(monsterP)
    })
  }

  let pageNumber = 1
  function forwardButtonClick () { 
    //Identify the next button
    const forwardButton = document.getElementById("forward")
    forwardButton.addEventListener("click", (e) => { 
      document.getElementById("monster-container").textContent = ""
      pageNumber++
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
      .then(response => response.json())
      .then(data => { 
        showMonsters(data)
    })
      .catch(error => alert(`No more pages: ${error}`))
  })
}
  
function backButtonClick () { 
  //Identify the next button
  const backButton = document.getElementById("back")
  backButton.addEventListener("click", (e) => { 
    document.getElementById("monster-container").textContent = ""
    pageNumber--
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(response => response.json())
    .then(data => { 
      showMonsters(data)
      if (pageNumber<1) { 
        window.alert("Ain't no more monsters here!")
      }
  })
    .catch(error => console.log(error))
})
}

  function createForm() { 
    //Create form, add form id, and add to document
    const form = document.createElement("form")
    form.id = "monster-form"
    document.getElementById("create-monster").appendChild(form)

    //Create nameinput, add id/placeholder, add to the form
    const nameInput = document.createElement("input")
    nameInput.id = "name"
    nameInput.placeholder = "name..."
    form.append(nameInput)

  //Create ageInput, add id/placeholder, add to the form
    const ageInput = document.createElement("input")
    ageInput.id = "age"
    ageInput.placeholder = "age..."
    form.append(ageInput)

    //Create descriptionInput, add id/placeholder, add to the form
    const descriptionInput = document.createElement("input")
    descriptionInput.id = "description"
    descriptionInput.placeholder = "description..."
    form.append(descriptionInput)

    //Create button, add title, add to the form
    const btn = document.createElement("button")
    btn.textContent = "Create"
    form.append(btn)
    
    //Add event listener for the CREATE button
    form.addEventListener("submit", (e) => { 
      e.preventDefault()
      createNewData(e)
      form.reset()
    })
  }
  // Above your list of monsters, you should have a form to 
  // create a new monster. You should have fields for name, age, 
  // and description, and a 'Create Monster Button'. When you 
  // click the button, the monster should be added to the list 
  // and saved in the API.

  function createNewData(e) { 
    let newName = e.target.name.value
    let newAge = e.target.age.value
    let newDescription =e.target.description.value
    let newMonsterArray = { 
      "name": newName, 
      "age": newAge, 
      "description": newDescription,
    }
    fetch(url, { 
      method: "POST", 
      headers: { 
        "content-type": "application/json"
      },
      body: JSON.stringify(newMonsterArray)
    })
    .then(response => response.json())
    .then(data => { 
      console.log(data)
    })
    .catch(error => console.log(error))
  }

  //At the end of the list of monsters, show a button. 
  // When clicked, the button should load the next 50 
  // monsters and show them.