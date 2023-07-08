import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const adventureId = params.get("adventure");
  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let data = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let response = await data.json();
    return response;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let doc = document;
  doc.getElementById("adventure-name").innerHTML = adventure.name;
  doc.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  doc.getElementById("adventure-content").innerText = adventure.content;
  adventure.images.forEach((image) => {
    let img = `<img src="${image}" class="d-none activity-card-image">`;
    doc.getElementById("photo-gallery").insertAdjacentHTML("beforeend", img);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let carousel = document.createElement("div");
  carousel.setAttribute("id", "carouselGallery");
  carousel.setAttribute("class", "carousel slide");
  carousel.setAttribute("data-bs-ride", "carousel");

  let indicators = document.createElement("div");
  indicators.setAttribute("class", "carousel-indicators");

  let inner = document.createElement("div");
  inner.setAttribute("class", "carousel-inner");

  images.forEach((img, index) => {
    let image, btn;
    if (index > 0) {
      btn = `<button type="button" data-bs-target="#carouselGallery" data-bs-slide-to="${index}"  aria-label="Slide ${
        index + 1
      }"></button>`;

      image = `<div class="carousel-item">
      <img src="${img}" class="d-block w-100 activity-card-image">
      </div>`;
    } else {
      btn = `<button type="button" data-bs-target="#carouselGallery" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide ${
        index + 1
      }"></button>`;

      image = `<div class="carousel-item active">
      <img src="${img}" class="d-block w-100 activity-card-image">
      </div>`;
    }
    indicators.insertAdjacentHTML("beforeend", btn);
    inner.insertAdjacentHTML("beforeend", image);
  });

  let btnIcon = ` <button class="carousel-control-prev" type="button" data-bs-target="#carouselGallery" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselGallery" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>`;

  let photoGallery = document.getElementById("photo-gallery");
  carousel.appendChild(indicators);
  carousel.appendChild(inner);
  carousel.insertAdjacentHTML("beforeend", btnIcon);
  photoGallery.appendChild(carousel);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure && adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = `${adventure.costPerHead}`;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = `${cost}`;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.getElementById("myForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    try {
      const body = { name: formProps.name, date: formProps.date, person: formProps.person, adventure: adventure.id };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      let res = await fetch(`${config.backendEndpoint}/reservations/new`, options);
      let data = await res.json();
      alert("Success!");
    } catch (error) {
      alert("Failed!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
