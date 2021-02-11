// write your code here
const spiceBlendUrl = 'http://localhost:3000/spiceblends'
const spiceImages = document.querySelector('#spice-images')
let currentSpiceBlend = 1
const ingredientForm = document.querySelector('#ingredient-form')
const updateForm = document.querySelector('#update-form')


/* Helper Functions */
function displayHighlightedSpice() {
    fetch(`${spiceBlendUrl}/${currentSpiceBlend}`)
        .then(response => response.json())
        .then(spiceBlendObject => {
            renderOneSpiceDetail(spiceBlendObject)
        })
}

function renderOneSpiceDetail(spiceBlendObject) {
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
}

function displayAllSpices() {
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
}

function initializeApp() {
    displayAllSpices()
    displayHighlightedSpice()
}

function handleUpdateForm(event) {
    event.preventDefault()
    // console.log(event.target.title.value) // using name attribute on the input element
    // console.log(event.target[0].value)
    const titleInput = document.querySelector('#spiceblend-title').value
    // optimistic
    // const titleH2 = document.querySelector('h2.title')
    // titleH2.textContent = titleInput
    event.target.reset()
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
}

function handleNewIngredientForm(event) {
    event.preventDefault()
    const nameInput = event.target.name.value

    const li = document.createElement('li')
    li.textContent = nameInput

    const ingredientUl = document.querySelector('.ingredients-list')
    ingredientUl.append(li)
    event.target.reset()


    fetch('http://localhost:3000/ingredients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nameInput, spiceblendId: parseInt(currentSpiceBlend) })
    })
        .then(response => response.json())
        .then(newIngredient => console.log(newIngredient))
}

function handleSpiceImagesClick(event) {
    // event.target.tagName === "IMG"
    if (event.target.matches('img')) {
        currentSpiceBlend = event.target.dataset.id
        displayHighlightedSpice()
    }

}



/* Event Listeners */
updateForm.addEventListener('submit', handleUpdateForm)

ingredientForm.addEventListener('submit', handleNewIngredientForm)

spiceImages.addEventListener('click', handleSpiceImagesClick)




/* Initial Render */
initializeApp()






