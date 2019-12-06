//AJAX Request
$.ajax({
  url: "https://randomuser.me/api/?results=12",
  method: "GET",
  dataType: "json",
  success: response => {
    randUserGen = response.results;
  }
}).done(() => {
  //gallery creation and appendage
  randUserGen.forEach(user => {
    let thumbPhoto = user.picture.large;
    let userName = `${user.name.first} ${user.name.last}`;
    let email = user.email;
    let location = `${user.location.city}, ${user.location.state}`;
    let userID = user.login.username;
    //HTML construction for gallery
    let userHtml = `<div class="card ${userID}">
        <div class="card-img-container">
            <img class="card-img" src=${thumbPhoto} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${userName}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${location}</p>
        </div>
    </div>`;

    //HTML appendage for gallery
    $("#gallery").append(userHtml);

    //modal HTML construction
    let modalHtml = `
    <div class="modal-container hide ${userID}">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src=${thumbPhoto} alt="profile picture">
              <h3 id="name" class="modal-name cap">${userName}</h3>
              <p class="modal-text">${email}</p>
              <p class="modal-text cap">${location}</p>
              <hr>
              <p class="modal-text">(555) 555-5555</p>
              <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
              <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
      </div>`;
    $("#gallery").after(modalHtml);
    //modal HTML appendage
  });

  // on click to show user modal
  $(".card").on("click", function(e) {
    let selectedUserID =
      "." +
      $(this)
        .attr("class")
        .split(" ")[1];
    $(selectedUserID).addClass("show");
  });

  //on click of exit button on modal to hide modal window
  $(".modal-close-btn").on("click", function(e) {
    $(".modal-container").removeClass("show");
  });
});
