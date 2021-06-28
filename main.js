const searchForm = document.querySelector('form');
const searchResultDiv=  document.querySelector('.search-result');
const container = document.querySelector('.container');

let searchQuery = '';
// Use website EDAMAM.COM //
const APP_ID = ''; // use your own app id
const APP_KEY = ''; // use your own app key 


searchForm.addEventListener('submit',(e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
})

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(baseURL);
    const data= await response.json();
    generateHtml(data.hits)
    console.log(data);
}
function generateHtml(results) {
    let generatedHtml = '';
    results.map(result => {
        generatedHtml += 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a href="${result.recipe.url}" class="view-btn">View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet Labels: ${result.recipe.dietLabels}</p>
            <p class="item-data">Cuisine Type: ${result.recipe.cuisineType}</p>

        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHtml;
}