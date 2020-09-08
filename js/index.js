let responseElement = "";
let cart = [];

displayBasket(); //Fonction recurrente défini sur la page function.js, elle affiche le nombre d'article du panier en temps réel
fetch("http://localhost:3000/api/furniture")
  .then((res) => res.json())
  .then((home) => {
    home.forEach((element) => {
      displayElement(element);// Affiche les elements du tableau renvoyé par la reponse serveur
    });
  })
  .catch(error => {
    displayErrorPage();// Affiche une image d'erreur si le serveur ne repond pas
  });
function displayElement(element) {
  responseElement += `<a class="sectionctn lowborder" href="produit.html?id=${element._id}">
       <div class="imgctn verylowborder">
           <img  src="${element.imageUrl}" />
       </div> 
       <div class="textctn">
           <h2>${element.name}</h2>
           <p>${element.description}</p>
       </div>
   </a>`;
  document.getElementById("sectionid").innerHTML = responseElement;
}
