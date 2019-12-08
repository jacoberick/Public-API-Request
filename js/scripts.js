// AJAX Request
let users = [];
$.ajax({
  url: "https://randomuser.me/api/?results=12",
  method: "GET",
  dataType: "json",
  success: response => {
    let randUsers = response.results;
    randUsers.forEach(details => {
      let user = new User(details);
      users.push(user);
    });
  }
}).done(() => {
  // gallery creation and appendage
  addUsers(users);
  $("#gallery").after(`<div id="modal" class="modal-container hide"></div>`);
});

class User {
  constructor(details) {
    this.details = details;
    //
    this.id = details.login.username;
    this.photo = details.picture.large;
    this.name = `${details.name.first} ${details.name.last}`;
    this.email = details.email;
    this.phone = details.phone;
    this.dob = details.dob.date.slice(0, 10);
    this.location = `${details.location.city}, ${details.location.state}`;
    this.street = `${details.location.street.number} ${
      details.location.street.name
    }`;
    this.detailed = `${this.street} ${this.location} ${
      details.location.postcode
    }`;
  }

  // generate a card layout with user details
  generateCard() {
    let userHtml = `<div class="card ${this.id}">
      <div class="card-img-container">
        <img class="card-img" src=${this.photo} alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${this.name}</h3>
        <p class="card-text">${this.email}</p>
        <p class="card-text cap">${this.location}</p>
      </div>
    </div>`;
    // append results
    $("#gallery").append(userHtml);
  }

  // set modal to active user using a template that utilizes contructor data
  setModal() {
    let modalHtml = `<div class="modal ${this.id}">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src=${this.photo} alt="profile picture">
        <h3 id="name" class="modal-name cap">${this.name}</h3>
        <p class="modal-text">${this.email}</p>
        <p class="modal-text cap">${this.detailed}</p>
        <hr>
        <p class="modal-text">${this.phone}</p>
        <p class="modal-text">${this.location}</p>
        <p class="modal-text">Birthday: ${this.dob}</p>
      </div>
    </div>`;
    // set the modal
    $("#modal")
      .empty()
      .append(modalHtml)
      .addClass("show");
  }
}

// method to add users to the DOM
const addUsers = users => {
  users.forEach(user => {
    user.generateCard();
  });
};

// set the modal by finding which user was clicked and invoking instance method
$("#gallery").on("click", ".card", e => {
  const that = $(e.currentTarget);
  const id = that.attr("class").split(" ")[1];
  let user = users.filter(user => {
    return user.id === id;
  })[0];
  user.setModal();
});

// hide the modal
$(document).on("click", "#modal, #modal-close-btn", () => {
  $("#modal")
    .removeClass("show")
    .addClass("hide");
});
