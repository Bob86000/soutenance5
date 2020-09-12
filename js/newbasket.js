let cart = [];
cart = JSON.parse(localStorage.getItem("session")) || [];
let addOptionArticle = "";
let addArticle = "";
let contact= {};
let checkfirstname = false;
let checkname = false;
let checkaddress = false;
let checkcity = false;
let checkemail = false;
let checkproducts = false;
let products = [];

displayBasketPage();//affiche un modèle de la page principale en fonction des elements renvoyé du localstorage
displayBasket();//Fonction recurrente défini sur la page function.js, elle affiche le nombre d'article du panier en temps réel
displayFinalPrice();//calcule le prix de la commande finale
buttonAddOneMoreArticle();//ajoute un article au panier , et actualise toutes les données de la page et du localstorage
buttonRemoveOneArticle();//retire un article au panier , et actualise toutes les données de la page et du localstorage
buttonDeleteAllArticle();//retire tout les articles du panier , et actualise toutes les données de la page et du localstorage
document.getElementById("finalconfirmation").addEventListener("click", function (e) {//l'evenement va envoyer le formulaire et les données de la page 
    verifyFormAndSetContactObject(e);//verification du formulaire et mise en place de l'objet contact
    if (
      checkfirstname &&
      checkname &&
      checkaddress &&
      checkcity &&
      checkemail &&
      checkproducts
    ) {
      setProductsObject(e);//Mise en place de l'objet products
      let getHref = this;
      postResponseAndAddToLocalStorage(getHref);//Envoie des données vers l'api puis stocke la reponse et les données dans le localstorage
    }
});
displayOptionalArticle();//En bas de page affiche des articles supplémentaires

function displayBasketPage() {
  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < cart[i].option.length; j++) {
      addOptionArticle += `<div id="optionarticle${cart[i].name}${cart[i].option[j].name}" class="optionarticle">
            <div id="name${cart[i].name}${cart[i].option[j].name}" class="listarticleoption">
                <p>${cart[i].option[j].name}</p>
            </div>
            <div id="quantity${cart[i].name}${cart[i].option[j].name}" class="quantityoptionarticle">
                <p>${cart[i].option[j].quantity}</p>
            </div>
            <button id="add${cart[i].name}${cart[i].option[j].name}" class="add">
            </button>
            <button id="remove${cart[i].name}${cart[i].option[j].name}" class="remove">
            </button>
            <button id="delete${cart[i].name}${cart[i].option[j].name}" class="delete">
            </button>
        </div>`;
    }
    addArticle += `<div id="ctn${cart[i].name}" class="basketpage-ctnarticle3">
            <div id="name${cart[i].name}" class="listarticle">
                <p>${cart[i].name}</p>
            </div>
            <div id="quantity${cart[i].name}" class="quantityarticle">
                <p>${cart[i].quantity}</p>
            </div>
            <div id="price${cart[i].name}" class="pricearticle">
                <p>${cart[i].price / 1000}£</p>
            </div>
        </div>
        <div id="alloptionarticle${cart[i].name}" class="alloptionarticle">
            ${addOptionArticle}
        </div>`;
    addOptionArticle = "";
  }
  document.getElementById("articlebasketpage-ctn2").innerHTML = addArticle;
}
function displayFinalPrice() {
  let finalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    finalPrice += cart[i].price;
  }
  document.getElementById("ordervalidation").innerHTML = `
    <div class="finalconfirmationctn">
        <div class="finalconfirmation lowborder">
            <a id="finalconfirmation" href="validation.html" ><p>Passez la commande</p></a> 
        </div> 
        <div class="finalpricectn lowborder"> 
            <p>Montant total</p> 
        <p id="finalPrice">${finalPrice / 1000}£</p>
        </div>
    </div>`;
}
function displayOptionalArticle() {
  fetch("http://localhost:3000/api/furniture/")
    .then((responsefooter) => responsefooter.json())
    .then((produitfooter) => {
      let produitFooter = "";
      for (let i = 0; i < produitfooter.length; i++) {
        produitFooter += `
                <a href="produit.html?id=${produitfooter[i]._id}" class="asidectn asidefooter verylowborder"> 
                    <h4> ${produitfooter[i].name}</h4> 
                    <img src="${produitfooter[i].imageUrl}" />
                </a>`;
      }
      document.getElementById(
        "otherproduct-selection"
      ).innerHTML = produitFooter;
    });
}
function updateFinalPriceDisplay() {
  let numberOfArticle = 0;
  let finalPrice = 0;
  for (let j = 0; j < cart.length; j++) {
    numberOfArticle += parseInt(cart[j].quantity);
    finalPrice += cart[j].price;
  }
  document.getElementById("basketnumber").innerHTML = numberOfArticle;
  document.getElementById("finalPrice").innerHTML = `${finalPrice / 1000}£`;
}
function buttonAddOneMoreArticle() {
  addOneToStorage = document.getElementsByClassName("add");
  for (let i = 0; i < addOneToStorage.length; i++) {
    addOneItemToStorage(addOneToStorage[i]);
  }
  function addOneItemToStorage(DOMElement) {
    DOMElement.addEventListener("click", function (e) {
      let getIdFromDOMElement = e.currentTarget.id;
      getIdFromDOMElement = getIdFromDOMElement.slice(3);
      for (let j = 0; j < cart.length; j++) { //array of localstorage articles
        for (let k = 0; k < cart[j].option.length; k++) { // array of article options
          if (getIdFromDOMElement == cart[j].name + cart[j].option[k].name) { // if DOMId has same name & same option 
            let unityPrice = cart[j].price / cart[j].quantity;
            let modifyPrice = (Foundindex) => cart[Foundindex].price += unityPrice;
            modifyPrice(j);
            let modifyOptionQuantity = cart[j].option[k].quantity++;
            let modifyQuantity = cart[j].quantity++;
            let newPrice = cart[j].price;
            let newOptionQuantity = cart[j].option[k].quantity;
            let newQuantity = cart[j].quantity;
            localStorage.setItem("session", JSON.stringify(cart));
            document.getElementById("quantity" + cart[j].name + cart[j].option[k].name).innerHTML = "<p>" + newOptionQuantity + "</p>";
            document.getElementById("quantity" + cart[j].name).innerHTML ="<p>" + newQuantity + "</p>";
            document.getElementById("price" + cart[j].name).innerHTML ="<p>" + newPrice / 1000 + "£<p>";
            break;
          }
        }
      }
      updateFinalPriceDisplay();
    });
  }
}
function buttonRemoveOneArticle() {
  let removeOneToStorage = document.getElementsByClassName("remove");
  for (let i = 0; i < removeOneToStorage.length; i++) {
    removeOneItemToStorage(removeOneToStorage[i]);
  }
  function removeOneItemToStorage(DOMElement) {
    DOMElement.addEventListener("click", function (e) {
      let getIdFromDOMElement = e.currentTarget.id;
      getIdFromDOMElement = getIdFromDOMElement.slice(6);
      for (let j = 0; j < cart.length; j++) { //array of localstorage articles
        for (let k = 0; k < cart[j].option.length; k++) { // array of article options
          if (getIdFromDOMElement == cart[j].name + cart[j].option[k].name && cart[j].option[k].quantity > 0) { // if DOMId has same name and same option
            let unityPrice = cart[j].price / cart[j].quantity;
            let modifyPrice = (foundIndex) => cart[foundIndex].price -= unityPrice;
            modifyPrice(j);
            let modifyOptionQuantity = cart[j].option[k].quantity--;
            let modifyQuantity = cart[j].quantity--;
            let newPrice = cart[j].price;
            let newOptionQuantity = cart[j].option[k].quantity;
            let newQuantity = cart[j].quantity;
            localStorage.setItem("session", JSON.stringify(cart));
            if (newOptionQuantity < 1) { 
              //I remove DOM Elements of article option, udapte display and delete one array index of localStorage
              let optionDivElementToRemove = document.getElementById("optionarticle" + cart[j].name + cart[j].option[k].name);
              let parentNodeOfElementToRemove = document.getElementById("alloptionarticle" + cart[j].name);
              parentNodeOfElementToRemove.removeChild(optionDivElementToRemove);
              document.getElementById("quantity" + cart[j].name).innerHTML ="<p>" + newQuantity + "</p>";
              document.getElementById("price" + cart[j].name).innerHTML ="<p>" + newPrice / 1000 + "£</p>";
              let indextoDeleteOption = cart[j].option.map((e) => e.name).indexOf(cart[j].option[k].name);
              cart[j].option.splice(indextoDeleteOption, 1);
              localStorage.setItem("session", JSON.stringify(cart));
              if (cart[j].option.length == 0) { 
                // I remove DOM element of article, delete one array index of localStorage and update display
                let articleDivElementToRemove = document.getElementById("ctn" + cart[j].name);
                let articleDivElementToRemove2 = document.getElementById("alloptionarticle" + cart[j].name);
                let parentNodeOfElementsToRemove = document.getElementById("articlebasketpage-ctn2");
                parentNodeOfElementsToRemove.removeChild(articleDivElementToRemove);
                parentNodeOfElementsToRemove.removeChild(articleDivElementToRemove2);
                let indextoDeleteArticle = cart.map((e) => e.name).indexOf(cart[j].name);
                cart.splice(indextoDeleteArticle, 1);
                localStorage.setItem("session", JSON.stringify(cart));
              }
              break;
            } else if (newOptionQuantity > 0) { 
              document.getElementById("quantity" + cart[j].name + cart[j].option[k].name).innerHTML =
               "<p>" + newOptionQuantity + "</p>";
              document.getElementById("quantity" + cart[j].name).innerHTML = "<p>" + newQuantity + "</p>";
              document.getElementById("price" + cart[j].name).innerHTML = "<p>" + newPrice / 1000 + "£</p>";
              break;
            }
          }
        }
      }
      updateFinalPriceDisplay();
    });
  }
}
function buttonDeleteAllArticle() {
  let deleteAlltostorage = document.getElementsByClassName("delete");
  for (let i = 0; i < deleteAlltostorage.length; i++) {
    deleteAllItemToStorage(deleteAlltostorage[i]);
  }
  function deleteAllItemToStorage(DOMElement) {
    DOMElement.addEventListener("click", function (e) {
      let getIdFromDOMElement = e.currentTarget.id;
      getIdFromDOMElement = getIdFromDOMElement.slice(6);
      for (let j = 0; j < cart.length; j++) { //array of localstorage articles
        for (let k = 0; k < cart[j].option.length; k++) { // array of article options
          if (getIdFromDOMElement == cart[j].name + cart[j].option[k].name) { // if DOMId has same name and same option
            let optionDivElementToRemove = document.getElementById("optionarticle" + cart[j].name + cart[j].option[k].name);
            let parentNodeOfElementToRemove = document.getElementById("alloptionarticle" + cart[j].name);
            parentNodeOfElementToRemove.removeChild(optionDivElementToRemove);
            let unityPrice = cart[j].price / cart[j].quantity;
            let removePrice = unityPrice * cart[j].option[k].quantity;
            let modifyPrice = (foundIndex) => cart[foundIndex].price -= removePrice;
            modifyPrice(j);
            let modifyQuantity = (foundIndex,foundIndex2) => cart[foundIndex].quantity -= cart[foundIndex].option[foundIndex2].quantity;
            modifyQuantity(j,k);
            let modifyOptionQuantity = (foundIndex,foundIndex2) => cart[foundIndex].option[foundIndex2].quantity = 0;
            modifyOptionQuantity(j,k);
            let newPrice = cart[j].price;
            let newOptionQuantity = cart[j].option[k].quantity;
            let newQuantity = cart[j].quantity;
            document.getElementById("quantity" + cart[j].name).innerHTML = "<p>" + newQuantity + "</p>";
            document.getElementById("price" + cart[j].name).innerHTML = "<p>" + newPrice / 1000 + "£</p>";
            let indextoDeleteOption = cart[j].option.map((e) => e.name).indexOf(cart[j].option[k].name);
            cart[j].option.splice(indextoDeleteOption, 1);
            localStorage.setItem("session", JSON.stringify(cart));
            if (cart[j].option.length == 0) {
               // I remove DOM element of article, delete one array index of localStorage
              let articleDivElementToRemove = document.getElementById("ctn" + cart[j].name);
              let articleDivElementToRemove2 = document.getElementById("alloptionarticle" + cart[j].name);
              let parentNodeOfElementsToRemove = document.getElementById("articlebasketpage-ctn2");
              parentNodeOfElementsToRemove.removeChild(articleDivElementToRemove);
              parentNodeOfElementsToRemove.removeChild(articleDivElementToRemove2);
              let indextoDeleteArticle = cart.map((e) => e.name).indexOf(cart[j].name);
              cart.splice(indextoDeleteArticle, 1);
              localStorage.setItem("session", JSON.stringify(cart));
            }
            break;
          }
        }
      }
      updateFinalPriceDisplay();
    });
  }
}
function verifyFormAndSetContactObject(e) {

 //Form fields 
 contact = {
    firstName: document.getElementById("form__firstname").value,
    lastName: document.getElementById("form__name").value,
    address: document.getElementById("form__address").value,
    city: document.getElementById("form__city").value,
    email: document.getElementById("form__email").value,
  };
  e.preventDefault();

  //Verify Form fields
  if (
    /^[a-zA-Z-]{2,} ?[a-zA-Z-]* ?[a-zA-Z-]*$/.test(contact.firstName) &&
    typeof contact.firstName === "string"
  ) {
    checkfirstname = true;
    greenalert("alertfirstname");
  } else {
    document.getElementById("form__firstname").value = "";
    redalert("alertfirstname", "Le prénom");
  }
  if (
    /^[a-zA-Z-]{2,} ?[a-zA-Z-]* ?[a-zA-Z-]*$/.test(contact.lastName) &&
    typeof contact.lastName === "string"
  ) {
    checkname = true;
    greenalert("alertname");
  } else {
    document.getElementById("form__name").value = "";
    redalert("alertname", "Le nom");
  }
  if (
    /^[a-zA-Z0-9,._-]+ ?[a-zA-Z0-9,._-]{2,} ?[a-zA-Z0-9,. _-]*$/.test(
      contact.address
    ) &&
    typeof contact.address === "string"
  ) {
    checkaddress = true;
    greenalert("alertaddress");
  } else {
    document.getElementById("form__address").value = "";
    redalert("alertaddress", "L'adresse");
  }
  if (
    /^[a-zA-Z. _-]{2,}$/.test(contact.city) &&
    typeof contact.city === "string"
  ) {
    checkcity = true;
    greenalert("alertcity");
  } else {
    document.getElementById("form__city").value = "";
    redalert("alertcity", "La ville");
  }

  if (
    /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(contact.email) &&
    typeof contact.email === "string"
  ) {
    checkemail = true;
    greenalert("alertemail");
  } else {
    document.getElementById("form__email").value = "";
    redalert("alertemail", "L'email");
  }
  if (cart && cart.length > 0) {
    checkproducts = true;
  } else {
    alert("Un problème est survenu.Votre panier est vide");
  }
  if (
    checkproducts &&
    (!checkfirstname ||
      !checkname ||
      !checkaddress ||
      !checkcity ||
      !checkemail ||
      !checkproducts)
  ) {
    alert("Un problème est survenu.Vérifiez vos informations");
  }
  function redalert(DOMElement, strings) { //display a red alert below form fields if they are not correct
      document.getElementById(DOMElement).innerHTML = " ! " + strings + " n'est pas valide";
    }
  function greenalert(DOMElement) { //clear the red alert if form fields are correct
      document.getElementById(DOMElement).innerHTML = "";
    }

}
function setProductsObject(e) {
  e.preventDefault();
  for (let i = 0; i < cart.length; i++) {
    let finalproductsId = "";
    finalproductsId += cart[i].id;
    products.push(finalproductsId);
  }
}
function postResponseAndAddToLocalStorage(getHref) {
  fetch("http://localhost:3000/api/furniture/order", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("order", JSON.stringify(data));
      let cart = [];
      localStorage.setItem("session", JSON.stringify(cart));
      window.location = getHref.href;
    });
}
