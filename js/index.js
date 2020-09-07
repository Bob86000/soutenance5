let responseElement = "";

displayBasket();

fetch("http://localhost:3000/api/furniture")
  .then((res) => res.json())
  .then((home) => {
    home.forEach((element) => {
      displayElement(element);
    });
  })
  .catch(error => {
    displayErrorPage();
  });

function displayElement(x) {
  responseElement += `<a class="sectionctn lowborder" href="produit.html?id=${x._id}">
       <div class="imgctn verylowborder">
           <img  src="${x.imageUrl}" />
       </div> 
       <div class="textctn">
           <h2>${x.name}</h2>
           <p>${x.description}</p>
       </div>
   </a>`;
  document.getElementById("sectionid").innerHTML = responseElement;
}
