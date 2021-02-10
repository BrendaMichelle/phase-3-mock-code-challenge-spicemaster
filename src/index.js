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