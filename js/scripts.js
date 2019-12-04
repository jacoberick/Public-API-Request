$.ajax({
  url: "https://randomuser.me/api/?results=12",
  method: "GET",
  dataType: "json",
  success: response => {
    randUserGen = response.results;
  }
}).done(() => {
  // call functions here
  // randUserGen has been assigned to the results
  console.log(randUserGen);
});
