getId();
displayBasket();

fetch("http://localhost:3000/api/furniture/"+urlParams.get('id'))
.then( responsed => responsed.json())
.then(produit =>{
  console.log(produit.name);
  displayMainPage(produit);
  displayVarnish(produit);
  displayVarnishSelected();
  displayTotalPrice(produit);
  addTwoButtonEvent(sendtostorage);

  function sendtostorage(p) {
    p.addEventListener('click', function() {             
      dataSelectedToSend();
      if (obsJsonlocalstorage == false) {
        addDataIfNoArticle();
      }
      else {
        if (!obsJsonlocalstorage.find(articleExists => articleExists.namearticle == valueSendToStorage.namearticle )) {
          addDataIfNotSameArticle();
        }
        else {
          for (let k = 0; k < obsJsonlocalstorage.length; k++) {
            for (let m=0; m < obsJsonlocalstorage[k].numberofoptionarticle.length; m++ ) {
              if (valueSendToStorage.namearticle === obsJsonlocalstorage[k].namearticle &&
                valueSendToStorage.numberofoptionarticle[0].optionarticle == obsJsonlocalstorage[k].numberofoptionarticle[m].optionarticle) {
                  modifyDataIfSameArticleSameOption(k,m);
                  break;    
              } 
              else if (valueSendToStorage.namearticle === obsJsonlocalstorage[k].namearticle &&
                 !obsJsonlocalstorage[k].numberofoptionarticle.find(optionarticleExists =>
                 optionarticleExists.optionarticle == valueSendToStorage.numberofoptionarticle[0].optionarticle)) {  
                   modifyDataIfSameArticleNewOption(k);
                   break;
              }
            }
                
          }
        }
      }
      displayBasket();
    })
  }
})
displayOptionalArticle(); 
        
function getId() {
   queryString = window.location.search;
  console.log(queryString);
   urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get('id'));
}
function displayMainPage(x) {
    document.getElementById("article").innerHTML =
    `<div class="productpagectn lowborder" id="productpagectn">
        <h2 id="namearticle">${x.name}</h2>
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
            <img src="${x.imageUrl}" />  
        </div>
        <div class="articlectn-footer1">
            <p>"${x.description}"</p>
        </div>
    </div>
    <div class="articlectn-buyctn lowborder">
        <h3>${x.name}</h3>
        <div class="articlectn-header2">
            <p id="ajustvarnish">
                Fournie avec le vernis <span>${x.varnish[0]}</span>.
            </p>
            <p>Le délai de livraison pour cet article est de 14 jours environ.</p>
        </div>
        <div class="articlectn-main2">
            <p>
                Prix du produit :<span id="price">${x.price / 1000}</span>£
            </p>
            <label for="quantity">
                Selection de la quantité
            </label> 
            <input type="number" id="number" name="quantity" value="1" min="1" max="15">
        </div>
        <div class="articlectn-footer2">
            <a href="panier.html">
                <button class="addtocard">
                    <p>
                        Acheter cet article
                    </p>
                </button>
            </a>
            <button class="addtocard" >
                <p>
                    Ajouter au panier
                </p>
            </button>
        </div>
    </div>`
}
function displayVarnish(x) {
    varnishProduit ='';
    for (let j = 0; j < x.varnish.length; j++) {
      varnishProduit += 
      `<option id="${x.varnish[j]}" class="varnishclass" value="${x.varnish[j]}">
          ${x.varnish[j]}
      </option>`;
    }
    document.getElementById("vernis").innerHTML = varnishProduit;
  }
function displayVarnishSelected() {    
  let  varnishchoice = document.getElementById("vernis");
  varnishchoice.addEventListener('change', function(e) {
    document.getElementById("ajustvarnish").innerHTML= `Fournie avec le vernis <span>${e.currentTarget.value}</span>.`
  });
}
function displayTotalPrice(x) { 
  let calculate = {
    fullprice: (y) => (y*x.price)/1000
  };
  document.getElementById("number").addEventListener('change', function(e) {
    document.getElementById("price").innerHTML = calculate.fullprice(e.currentTarget.value);
  });
} 
function addTwoButtonEvent(x) {
  let addtocard = document.getElementsByClassName('addtocard');
  for(let n=0; n<addtocard.length; n++){   
    x(addtocard[n]);
  }
}
function dataSelectedToSend() {
    valueSendToStorage = {
      namearticle : document.getElementById("namearticle").innerHTML,
      numberofoptionarticle : [{
        optionarticle : document.getElementById("vernis").value,
        quantityoptionarticle : document.getElementById("number").value
      }],
      pricearticle : (document.getElementById("price").innerHTML)*1000, 
      quantityarticle : document.getElementById("number").value
    };
}
  function addDataIfNoArticle() {
    console.log("Il n'y avait aucun article dans la panier? "+(obsJsonlocalstorage == false));
    obsJsonlocalstorage.push(valueSendToStorage);
    localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
    obsJsonlocalstorage = JSON.parse(localStorage.getItem('session'));
    console.log("L'article selectionné a bien été envoyé dans le panier? "+(!obsJsonlocalstorage == false));
    console.table(obsJsonlocalstorage);
  }
  function addDataIfNotSameArticle() {
    console.log( "L'article selectionné n'existe pas dans le panier? "+ (!obsJsonlocalstorage.find(articleExists => articleExists.namearticle == valueSendToStorage.namearticle )));
    for (let i = 0; i < obsJsonlocalstorage.length; i++){
    var lengthBeforepush = i;}                      
    obsJsonlocalstorage.push(valueSendToStorage);
    localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
    for (let j = 0; j < obsJsonlocalstorage.length; j++){
    var lengthafterpush = j;}
    console.log("Il y avait déjà un article dans le panier et un article différent est ajouté? " +( lengthBeforepush < lengthafterpush) )
    console.table(obsJsonlocalstorage);
}
function modifyDataIfSameArticleSameOption(k,m) {
                    
    console.log("L'article existe déjà dans le panier? " + (valueSendToStorage.namearticle === obsJsonlocalstorage[k].namearticle) + " et l'option de personnalisation existait également dans le panier? " + (valueSendToStorage.numberofoptionarticle[0].optionarticle == obsJsonlocalstorage[k].numberofoptionarticle[m].optionarticle));
    console.log("Ici l'article et l'option de personnalisation existait deja on additionne les quantités");
            
        let modifyValueSendToStorage =
    {
        namearticle : obsJsonlocalstorage[k].namearticle,
        numberofoptionarticle : obsJsonlocalstorage[k].numberofoptionarticle,
        pricearticle : parseInt(obsJsonlocalstorage[k].pricearticle) + parseInt(valueSendToStorage.pricearticle), 
        quantityarticle : parseInt(obsJsonlocalstorage[k].quantityarticle) + parseInt(valueSendToStorage.quantityarticle)
    };

        let modifynumberofoptionarticle = {
            optionarticle : obsJsonlocalstorage[k].numberofoptionarticle[m].optionarticle,
            quantityoptionarticle : parseInt(obsJsonlocalstorage[k].numberofoptionarticle[m].quantityoptionarticle) + parseInt(valueSendToStorage.numberofoptionarticle[0].quantityoptionarticle)
        };

    obsJsonlocalstorage[k] = modifyValueSendToStorage;
    obsJsonlocalstorage[k].numberofoptionarticle[m] = modifynumberofoptionarticle;
                 
    localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
    console.table(obsJsonlocalstorage);
                  
}
function modifyDataIfSameArticleNewOption(k) {
    console.log("L'article existe déjà dans le panier? " + (valueSendToStorage.namearticle === obsJsonlocalstorage[k].namearticle) + " et l'option de personnalisation est différente? " + (!obsJsonlocalstorage[k].numberofoptionarticle.find(optionarticleExists => optionarticleExists.optionarticle == valueSendToStorage.numberofoptionarticle[0].optionarticle)));
    console.log("Ici l'option de personnalisation n'existait pas on la rajoute dans le tableau de l'article");
                     
    let modifyValueSendToStorage =
{
    namearticle : obsJsonlocalstorage[k].namearticle,
    numberofoptionarticle : obsJsonlocalstorage[k].numberofoptionarticle,
    pricearticle : parseInt(obsJsonlocalstorage[k].pricearticle) + parseInt(valueSendToStorage.pricearticle), 
    quantityarticle : parseInt(obsJsonlocalstorage[k].quantityarticle) + parseInt(valueSendToStorage.quantityarticle)
};
  let newnumberofoptionarticle = {
    optionarticle : valueSendToStorage.numberofoptionarticle[0].optionarticle,
    quantityoptionarticle : parseInt(valueSendToStorage.numberofoptionarticle[0].quantityoptionarticle) 
  }
    modifyValueSendToStorage.numberofoptionarticle.push(newnumberofoptionarticle);
    obsJsonlocalstorage[k] = modifyValueSendToStorage;
    localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
    console.table(obsJsonlocalstorage[k].numberofoptionarticle);
    console.table(obsJsonlocalstorage);
}

function displayOptionalArticle() {
  fetch("http://localhost:3000/api/furniture/")
  .then( responsedfooter => {
   return responsedfooter.json()
  } )
  .then(produitfooter =>{
      console.table(produitfooter);
      let produitFooter = '';
      for (let i = 0; i < produitfooter.length; i++){
  if (urlParams.get('id') !== produitfooter[i]._id) {
              produitFooter +=`
                  <a href="produit.html?id=${produitfooter[i]._id}" class="asidectn verylowborder asidefooter"> 
                      <h4> ${produitfooter[i].name}</h4> 
                      <img src="${produitfooter[i].imageUrl}" />
                  </a>`;}
          }
          document.getElementById("otherproduct-selection").innerHTML = produitFooter;
          
          ;});
  }
