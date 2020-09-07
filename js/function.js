function displayBasket() {
  Numberofarticle = 0;
  obsJsonlocalstorage = [];
  obsJsonlocalstorage = JSON.parse(localStorage.getItem("session")) || [];
  if (!obsJsonlocalstorage === false) {
    for (let i = 0; i < obsJsonlocalstorage.length; i++) {
      Numberofarticle += parseInt(obsJsonlocalstorage[i].quantityarticle);
    }
  }
  document.getElementById("basketnumber").innerHTML = Numberofarticle;
}
function displayErrorPage() {
  document.querySelector("main").innerHTML = "<img id='error-img' src='img/error500.jpg' >";
  document.getElementById("error-img").style.width = "100%";
  }