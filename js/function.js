function displayBasket() {
  let Numberofarticle = 0;
  cart = JSON.parse(localStorage.getItem("session")) || [];
  if (!cart === false) {
    for (let i = 0; i < cart.length; i++) {
      Numberofarticle += parseInt(cart[i].quantity);
    }
  }
  document.getElementById("basketnumber").innerHTML = Numberofarticle;
}
function displayErrorPage() {
  document.querySelector("main").innerHTML = "<img id='error-img' src='img/error500.jpg' >";
  document.getElementById("error-img").style.width = "100%";
  }