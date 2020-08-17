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
            var selectquantity= [];
            var indexquantity=0;
            while (indexquantity< 5){
                indexquantity++;
             selectquantity.push(indexquantity) }
            if (indexquantity=5) {
            selectquantity.push(indexquantity+5)}
            if (indexquantity=10) {
            selectquantity.push("Très grande quantitée")  
           
             console.log(selectquantity)}

            document.getElementById("article").innerHTML = `
        <div class="productpagectn" id="productpagectn">
            <h2 id="namearticle">${produit[i].name}</h2>
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
           <p id="price" >Prix du produit : ${produit[i].price / 1000}£</p>
           <label for="quantity">
               Selection de la quantité
           </label> 
           <select name="DYNAMIK_NAME_quantity" id="quantity" class="select-quantity">
          </select>
       </div>
       <div class="articlectn-footer2">
           <button class="addtocard" ><p>Acheter cet article</p></button>
           <button class="addtocard" ><p>Ajouter au panier</p></button>
       </div>

        </div>`;

   

   for (var j = 0; j < produit[i].varnish.length; j++) {
      
   document.getElementById("vernis").innerHTML += `
   <option id="${produit[i].varnish[j]}" class="varnishclass" value="${produit[i].varnish[j]}">${produit[i].varnish[j]}</option>`;
    }
    
    for (var k = 0; k < selectquantity.length; k++) {
        document.getElementById("quantity").innerHTML += `
       <option id="quantity${selectquantity[k]}" class="selectquantityclass" value="${selectquantity[k]}">${selectquantity[k]}</option>`;
    
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
        for(l=0; l<varnishchoice.length; l++)
        {
            varnishchoice[l].addEventListener('click', function(){modifyselect(this);}) ;
        }


        var calculate = 
        {
            fullprice: function (y) {
                for (var i = 0; i < produit.length; i++) {
                    if (urlParams.get('id') === produit[i]._id) {
                        return ((y)*produit[i].price)/1000};};
        }
        }

       
  
        var totalprice = document.getElementsByClassName('selectquantityclass') ;       
        for(m=0; m<selectquantity.length; m++)
        {   
            modifyprice(totalprice[m],selectquantity[m]);
        }

        function modifyprice(x,y) {
           x.addEventListener('click', function(){
               if (y==1) {
            document.getElementById("price").innerHTML= `Prix du produit : ${calculate.fullprice(y)}£`; }
            else {document.getElementById("price").innerHTML= `Prix des produits : ${calculate.fullprice(y)}£`;}
           })
        }
    

        var addtocard = document.getElementsByClassName('addtocard'); 
        for(n=0; n<addtocard.length; n++)
        {   
            sendtostorage(addtocard[n]);
        }

        function sendtostorage(p) {
           p.addEventListener('click', function(){
            var der = document.getElementById("namearticle").innerHTML;
            alert(der);
        })}
}
)
;