// write your code here
const spiceBlendUrl = 'http://localhost:3000/spiceblends'
const spiceImages = document.querySelector('#spice-images')
let currentSpiceBlend = 1

// See the first spice blend (the spice blend with an ID of 1), 
// including its title, image, and list of ingredients, 
// when the page loads.
function displayHighlightedSpice() {
    fetch(`${spiceBlendUrl}/${currentSpiceBlend}`)
        .then(response => response.json())
        .then(spiceBlendObject => {
            const spiceBlendDetailDiv = document.querySelector('#spice-blend-detail')
            const spiceDetailImg = spiceBlendDetailDiv.querySelector('img')
            const titleH2 = spiceBlendDetailDiv.querySelector('h2')
            const ingredientsUl = spiceBlendDetailDiv.querySelector('ul')

            spiceDetailImg.src = spiceBlendObject.image
            titleH2.textContent = spiceBlendObject.title

            ingredientsUl.innerHTML = ''

            // const lis = ingredientsUl.querySelectorAll('li')
            // lis.forEach(li => li.remove())

            spiceBlendObject.ingredients.forEach(ingredient => {
                const li = document.createElement('li')
                li.textContent = ingredient.name
                ingredientsUl.append(li)
            })
        })
}



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

    fetch(`http://localhost:3000/spiceblends/${currentSpiceBlend}`, {
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
// Persist new ingredients to the server when the #ingredient-form is submitted. 
// Make sure to follow the format listed above to make a POST request 
// to /ingredients. In the body of the request, the spiceblendId will 
// need to be a number (not a string).
const ingredientForm = document.querySelector('#ingredient-form')
ingredientForm.addEventListener('submit', event => {
    event.preventDefault()
    const nameInput = event.target.name.value
    console.log(nameInput)

    const li = document.createElement('li')
    li.textContent = nameInput

    const ingredientUl = document.querySelector('.ingredients-list')
    ingredientUl.append(li)


    fetch('http://localhost:3000/ingredients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nameInput, spiceblendId: parseInt(currentSpiceBlend) })
    })
        .then(response => response.json())
        .then(newIngredient => console.log(newIngredient))
})


// See all spice blend images in the #spice-images div when the page loads. 
// Request the data from the server to get all the spice blends. 
// Then, display the image for each of the spice blends using an img tag 
// inside the #spice-images div.

fetch(spiceBlendUrl)
    .then(response => response.json())
    .then(spiceBlendsArr => {
        spiceBlendsArr.forEach(spiceBlend => {
            const img = document.createElement('img')
            img.src = spiceBlend.image
            img.dataset.id = spiceBlend.id
            spiceImages.append(img)
        })
    })



// Click on an image from the #spice-images div and see all the info 
// about that spice blend displayed inside the #spice-blend-detail div. 
// You will need to make another GET request with the spice blend's ID to 
// get the information about the spice blend that was clicked.
spiceImages.addEventListener('click', event => {
    // event.target.tagName === "IMG"
    if (event.target.matches('img')) {
        console.log(event.target)
        currentSpiceBlend = event.target.dataset.id
        displayHighlightedSpice()
    }
})






/* Initial Render */
displayHighlightedSpice()






