import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let data = await fetch(`${config.backendEndpoint}/reservations/`);
    let response = await data.json();
    return response;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  if (reservations && reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";

    reservations.forEach((obj) => {
      let element = `<tr>
        <td scope="col"><b>${obj.id}</b></td>
        <td scope="col">${obj.name}</td>
        <td scope="col">${obj.adventureName}</td>
        <td scope="col">${obj.person}</td>
        <td scope="col">${new Date(obj.date).toLocaleString("en-IN", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })}</td>
        <td scope="col">${obj.price}</td>
        <td scope="col">${new Date(obj.time).toLocaleString("en-IN", { dateStyle: "long" })}, ${new Date(
        obj.time
      ).toLocaleString("en-IN", { timeStyle: "medium" })}</td>
        <td scope="col">
        <button class="reservation-visit-button" id="${obj.id}">
        <a href="/frontend/pages/adventures/detail/?adventure=${obj.adventure}">
        Visit Adventure
        </a>
        </button>
        </td>
      </tr>`;
      document.getElementById("reservation-table").insertAdjacentHTML("beforeend", element);
    });
  } else {
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  }
}

export { fetchReservations, addReservationToTable };
