const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const searchStatus = document.querySelector("#status");
const results = document.querySelector("#results");

searchBtn.addEventListener("click", runSearch);

async function runSearch() {
    searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        searchStatus.textContent = "Please enter a search term.";
        results.innerHTML = "";
        return;
    }

    searchStatus.textContent = "Loading...";
    results.innerHTML = "";
    searchInput.value = "";

    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        searchStatus.textContent = "Something went wrong. Please try again.";
        console.error(error);
    }
}

if (!data.meals) {
    searchStatus.textContent = "No results found.";
    return;
}

searchStatus.textContent = `Found ${data.meals.length} result(s).`;
results.innerHTML = data.meals.map(meal => `  
    <div class="card">
    <h3>${meal.strMeal}</h3>
    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Area:</strong> ${meal.strArea}</p>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200" />
  </div>`).join("");