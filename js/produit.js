const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
console.log(urlParams.get('id'));

fetch("http://localhost:3000/api/furniture/")
.then( responsed => {
return responsed.json()
} )
.then(produit =>{
    console.log(produit[0].name);
    for (var i = 0; i < produit.length; i++) {
        if (urlParams.get('id') === produit[i]._id) {
            document.getElementById("article").innerHTML = `
        <div class="productpagectn" id="productpagectn">
            <h2>${produit[i].name}</h2>
            <div class="articlectn-header1" >
                <div class="articlectn-choice">
                <button id="articlectn_button" class=ajout_evenement_pourderoulement>
                    <label for="vernis">
                        Choix du vernis
                    </label> 
           
                        <select name="DYNAMIK_NAME_CHOICE" id="vernis">
                    </select>
                    </button>
                </div>
            </div>
            <div class="articlectn-main1">
                <p> "DYNAMIK_LINK_IMAGE"</p> 
                <img src="${produit[i].imageUrl}" />  
            </div>
            <div class="articlectn-footer1">
                <p>"${produit[i].description}"</p>
            </div>
  
   </div>
   <div class="articlectn-buyctn">
       <h3>${produit[i].name}</h3>
       <div class="articlectn-header2">
           <p id="ajustvarnish" >Fournie avec le vernis ${produit[i].varnish[0]}.</p>
           <p>Le délai de livraison pour cet article est de 14 jours environ.</p>

       </div>
       <div class="articlectn-main2">
           <p>Prix du produit : ${produit[i].price / 1000}£</p>
           <label for="quantité">
               Selection de la quantité
           </label> 
           <select name="DYNAMIK_NAME_quantity" id="quantité">
               
               <option value="DYNAMIK_QUANTITY1">DYNAMIK_QUANTITY1</option>
               <option value="DYNAMIK_QUANTITY2">DYNAMIK_QUANTITY2</option>
               <option value="DYNAMIK_QUANTITY3">DYNAMIK_QUANTITY3</option>
          </select>
       </div>
       <div class="articlectn-footer2">
           <button><p>Acheter cet article</p></button>
           <button><p>Ajouter au panier</p></button>
       </div>

        </div>`;

   

   for (var j = 0; j < produit[i].varnish.length; j++) {
      
   document.getElementById("vernis").innerHTML += `
   <option id="${produit[i].varnish[j]}" class="varnishclass" value="${produit[i].varnish[j]}">${produit[i].varnish[j]}</option>`;
    }
    }
   
        if (urlParams.get('id') !== produit[i]._id) {
            document.getElementById("otherproduct-selection").innerHTML +=`
                <a href="produit.html?id=${produit[i]._id}" class="asidectn"> 
                    <h4> ${produit[i].name}</h4> 
                    <img src="${produit[i].imageUrl}" />
                </a>`;
        };};

        function modifyselect(X) {document.getElementById("ajustvarnish").innerHTML= `Fournie avec le vernis ${X.id}`; }
  
        var varnishchoice = document.getElementsByClassName('varnishclass') ;       
        for(k=0; k<varnishchoice.length; k++)
        {
            varnishchoice[k].addEventListener('click', function(){modifyselect(this);}) ;
        }
    
    

}
)
;