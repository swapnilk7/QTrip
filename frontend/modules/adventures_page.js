import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let data = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    let response = await data.json();
    return response;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    let col = document.createElement("div");
    col.setAttribute("class", "col-6 col-lg-3 mb-3");

    col.innerHTML = `
    <a href="detail/?adventure=${key.id}" id="${key.id}">
    <div class="card activity-card">
    <p class="category-banner">${key.category}</p>
    <img src='${key.image}' class="card-img-top" alt='${key.name}' />
    <div class="card-body d-md-flex justify-content-between">
        <h5 class="card-title">${key.name}</h5>
        <p class="card-text">${key.currency} ${key.costPerHead}</p>
      </div>
      <div class="card-body d-md-flex justify-content-between">
        <h5 class="card-title">Duration</h5>
        <p class="card-text">${key.duration} Hours</p>
      </div>
    </div>
  </a>
    `;
    document.getElementById("data").appendChild(col);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter((obj) => obj.duration >= low && obj.duration <= high);
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter((obj) => categoryList.includes(obj.category));
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters.duration.length > 0 && filters.category.length === 0) {
    let range = filters.duration.split("-");
    list = filterByDuration(list, range[0], range[1]);
  } else if (filters.duration.length === 0 && filters.category.length > 0) {
    list = filterByCategory(list, filters.category);
  } else if (filters.duration.length > 0 && filters.category.length > 0) {
    let range = filters.duration.split("-");
    list = list.filter(
      (obj) => obj.duration >= range[0] && obj.duration <= range[1] && filters.category.includes(obj.category)
    );
  } else {
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(localStorage.getItem("filters"));
  if (filters) return filters;
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if (filters.category && filters.category.length > 0) {
    let listDiv = document.getElementById("category-list");
    filters.category.forEach((item) => {
      let element = document.createElement("p");
      element.innerHTML = `
        <p class="category-filter">${item}</p>
      `;
      listDiv.appendChild(element);
    });
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
