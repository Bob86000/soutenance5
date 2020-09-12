let cart = [];
cart = JSON.parse(localStorage.getItem("session")) || [];
let id = "";
let varnishProduit = "";
let sentData = {};
let produitFooter = "";

getId();//Obtenir l'id du parametre URL de la page
displayBasket();//Fonction recurrente défini sur la page function.js, elle affiche le nombre d'article du panier en temps réel
fetch("http://localhost:3000/api/furniture/" + id)
  .then((responsed) => responsed.json())
  .then((produit) => {
    displayMainPage(produit);//affiche un modèle de la page principale en fonction des elements renvoyé de produit
    displayVarnish(produit);//affiche un modèle des options de vernis en fonction des elements renvoyé de produit
    displayVarnishSelected();// modifie l'affichage de la page quand un vernis est selectionné
    displayTotalPrice(produit);// modifie le prix affiché de la page quand une quantité est selectionné
    sendToStorage(document.getElementById('buybutton'));// rajoute un evenement a un element DOM(le boutton acheter) 
    sendToStorage(document.getElementById('basketbutton'));// rajoute un evenement a un element DOM(le boutton ajouter au panier) 

    function sendToStorage(DOMElement) {// L'evenement va créer le localstorage sous forme de tableau qui enregistre les données qui seront manipulé
      DOMElement.addEventListener("click", function () {
        selectedDataToSend(produit);//Les données qui seront rajouter au localstorage a chaque clic
        displayBasket();//Fonction recurrente défini sur la page function.js, elle affiche le nombre d'article du panier en temps réel
      });
    }
  })
  .catch((error) => {
    displayErrorPage();// Affiche une image d'erreur si le serveur ne repond pas
  });
displayOptionalArticle();//En bas de page affiche des articles supplémentaires

function displayMainPage(produit) {
  document.getElementById("article").innerHTML = 
          `<div class="productpagectn lowborder" id="productpagectn">
              <h2 id="namearticle">${produit.name}</h2>
              <div class="articlectn-header1">
                  <div class="articlectn-choice">
                      <button id="articlectn_button" class="ajout_evenement_pourderoulement">
                          <label for="vernis">
                              Choix du vernis
                          </label>
                          <select name="varnishbutton" id="vernis">
                          </select>
                      </button>
                  </div>
              </div>
              <div class="articlectn-main1 verylowborder">
                  <img src="${produit.imageUrl}" />  
              </div>
              <div class="articlectn-footer1">
                  <p>"${produit.description}"</p>
              </div>
          </div>
          <div class="articlectn-buyctn lowborder">
              <h3>${produit.name}</h3>
              <div class="articlectn-header2">
                  <p id="ajustvarnish">
                      Fournie avec le vernis <span>${produit.varnish[0]}</span>.
                  </p>
                  <p>Le délai de livraison pour cet article est de 14 jours environ.</p>
              </div>
              <div class="articlectn-main2">
                  <p>
                      Prix du produit :<span id="price">${
                        produit.price / 1000
                      }</span>£
                  </p>
                  <label for="quantity">
                      Selection de la quantité
                  </label> 
                  <input type="number" id="number" name="quantity" value="1" min="1" max="15">
              </div>
              <div class="articlectn-footer2">
                  <a href="panier.html">
                      <button id="buybutton">
                          <p>
                              Acheter cet article
                          </p>
                      </button>
                  </a>
                  <button id="basketbutton" >
                      <p>
                          Ajouter au panier
                      </p>
                  </button>
              </div>
          </div>`;
}
function displayVarnish(produit) {
  for (let j = 0; j < produit.varnish.length; j++) {
    varnishProduit += `<option id="${produit.varnish[j]}" class="varnishclass" value="${produit.varnish[j]}">
                ${produit.varnish[j]}
            </option>`;
  }
  document.getElementById("vernis").innerHTML = varnishProduit;
}
function displayVarnishSelected() {
  let varnishchoice = document.getElementById("vernis");
  varnishchoice.addEventListener("change", function (e) {
    document.getElementById("ajustvarnish").innerHTML = `Fournie avec le vernis <span>${e.currentTarget.value}</span>.`;
  });
}
function displayTotalPrice(produit) {
  let calculate = {
    fullprice: (targetValue) => (targetValue * produit.price) / 1000,
  };
  document.getElementById("number").addEventListener("change", function (e) {
    document.getElementById("price").innerHTML = calculate.fullprice(e.currentTarget.value);
  });
}
function displayOptionalArticle() {
    fetch("http://localhost:3000/api/furniture/")
      .then((responsefooter) => responsefooter.json())
      .then((produitfooter) => {
        for (let i = 0; i < produitfooter.length; i++) {
          if (id !== produitfooter[i]._id) {
            produitFooter += `
                      <a href="produit.html?id=${produitfooter[i]._id}" class="asidectn verylowborder asidefooter"> 
                          <h4> ${produitfooter[i].name}</h4> 
                          <img src="${produitfooter[i].imageUrl}" />
                      </a>`;
          }
        }
        document.getElementById("otherproduct-selection").innerHTML = produitFooter;
      });
}
function getId() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    id = urlParams.get("id");
}
function selectedDataToSend(produit) { 

  //Data before send them inside Localstorage

  sentData = {
    id : produit._id,
    name: produit.name,
    option: [
      {
        name: document.getElementById("vernis").value,
        quantity: parseInt(document.getElementById("number").value),
      },
    ],
    price: parseInt(document.getElementById("price").innerHTML * 1000),
    quantity: parseInt(document.getElementById("number").value),
  };

  //Then I modify Localstorage

  let cartProduct = cart.find((element) => element.name === sentData.name);
  let copyOfCartProduct = cartProduct;
  if (cartProduct === undefined) {
    cart.push(sentData);
  } else {
    cartProduct.quantity += sentData.quantity;
    cartProduct.price += sentData.price;
    cartProduct = cartProduct.option.find(
      (option) => option.name === sentData.option[0].name
    );
    if (cartProduct !== undefined) {
      cartProduct.quantity += sentData.option[0].quantity;
    } else {
      copyOfCartProduct.option.push(sentData.option[0]);
    }
  }
  localStorage.setItem("session", JSON.stringify(cart));
}

