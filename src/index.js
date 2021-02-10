// write your code here

// See the first spice blend (the spice blend with an ID of 1), 
// including its title, image, and list of ingredients, 
// when the page loads.
fetch('http://localhost:3000/spiceblends/1')
    .then(response => response.json())
    .then(spiceBlendObject => {
        const spiceBlendDetailDiv = document.querySelector('#spice-blend-detail')
        const spiceDetailImg = spiceBlendDetailDiv.querySelector('img')
        const titleH2 = spiceBlendDetailDiv.querySelector('h2')
        const ingredientsUl = spiceBlendDetailDiv.querySelector('ul')

        spiceDetailImg.src = spiceBlendObject.image
        titleH2.textContent = spiceBlendObject.title

        spiceBlendObject.ingredients.forEach(ingredient => {
            const li = document.createElement('li')
            li.textContent = ingredient.name
            ingredientsUl.append(li)
        })
    })


// Update the title of the spice blend on the page when the #update-form 
// is submitted, and still see that change when reloading the page 
// (the new title should be persisted on the server).

const updateForm = document.querySelector('#update-form')
updateForm.addEventListener('submit', event => {
    event.preventDefault()
    // console.log(event.target.title.value) // using name attribute on the input element
    // console.log(event.target[0].value)
    const titleInput = document.querySelector('#spiceblend-title').value
    // optimistic
    // const titleH2 = document.querySelector('h2.title')
    // titleH2.textContent = titleInput

    fetch('http://localhost:3000/spiceblends/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: titleInput })
    })
        .then(response => response.json())
        .then(updatedSpiceBlend => {
            // pessimistic
            const titleH2 = document.querySelector('h2.title')
            titleH2.textContent = updatedSpiceBlend.title
        })
})



// Add a new ingredient to the spice blend when the #ingredient-form 
// is submitted. The new ingredient should be displayed on the page 
// (no persistence needed for now).
const ingredientForm = document.querySelector('#ingredient-form')
ingredientForm.addEventListener('submit', event => {
    event.preventDefault()
    const nameInput = event.target.name.value
    console.log(nameInput)

    const li = document.createElement('li')
    li.textContent = nameInput

    const ingredientUl = document.querySelector('.ingredients-list')
    ingredientUl.append(li)
})