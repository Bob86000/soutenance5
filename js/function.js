


function displayBasket() {
  Numberofarticle = 0;
  obsJsonlocalstorage = [];
  obsJsonlocalstorage = JSON.parse(localStorage.getItem('session')) || [];
  if (!obsJsonlocalstorage === false ) {
    for (let i = 0; i < obsJsonlocalstorage.length; i++) {
      Numberofarticle += parseInt(obsJsonlocalstorage[i].quantityarticle);
    }
    console.log(Numberofarticle);
  }
  document.getElementById("basketnumber").innerHTML = Numberofarticle;
}