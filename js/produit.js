const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
console.log(urlParams.get('id'));

fetch("http://localhost:3000/api/furniture/"+urlParams.get('id'))
.then( responsed => {
return responsed.json()
} )
.then(produit =>{
    console.log(produit.name);
            document.getElementById("article").innerHTML = `
        <div class="productpagectn" id="productpagectn">
            <h2 id="namearticle">${produit.name}</h2>
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
                <img src="${produit.imageUrl}" />  
            </div>
            <div class="articlectn-footer1">
                <p>"${produit.description}"</p>
            </div>
        </div>
        <div class="articlectn-buyctn">
            <h3>${produit.name}</h3>
            <div class="articlectn-header2">
            <p id="ajustvarnish" >Fournie avec le vernis ${produit.varnish[0]}.</p>
            <p>Le délai de livraison pour cet article est de 14 jours environ.</p>

        </div>
        <div class="articlectn-main2">
           <p >Prix du produit : 
                <span id="price">${produit.price / 1000}</span>£</p>
           <label for="quantity">
               Selection de la quantité
           </label> 
           <input type="number" id="number" name="quantity" value="1" min="1" max="15">
        </div>
        <div class="articlectn-footer2">
           <button class="addtocard" ><p>Acheter cet article</p></button>
           <button class="addtocard" ><p>Ajouter au panier</p></button>
        </div>

        </div>`;

   

    for (var j = 0; j < produit.varnish.length; j++) {
    document.getElementById("vernis").innerHTML += `
    <option id="${produit.varnish[j]}" class="varnishclass" value="${produit.varnish[j]}">${produit.varnish[j]}</option>`;
    }

    let  varnishchoice = document.getElementById("vernis");
    varnishchoice.addEventListener('change', function(e)
    {document.getElementById("ajustvarnish").innerHTML= `Fournie avec le vernis ${e.currentTarget.value}`});

    let calculate = 
    {
        fullprice: function (y) 
                { return ((y)*produit.price)/1000}
    };
    
    document.getElementById("number").addEventListener('change', function(e)
        {document.getElementById("price").innerHTML= calculate.fullprice(e.currentTarget.value);})
        

     var addtocard = document.getElementsByClassName('addtocard'); 
    for(n=0; n<addtocard.length; n++)
        {   
            sendtostorage(addtocard[n]);
        }

        function sendtostorage(p) {
           p.addEventListener('click', function()
           {
            var obsJsonlocalstorage = [];
            obsJsonlocalstorage = JSON.parse(localStorage.getItem('session')) || [];
            var valueSendToStorage =
             {
                        namearticle : document.getElementById("namearticle").innerHTML,
                        numberofoptionarticle : [{
                            optionarticle : document.getElementById("vernis").value,
                            quantityoptionarticle : document.getElementById("number").value
                        }],
                        pricearticle : (document.getElementById("price").innerHTML)*1000, 
                        quantityarticle : document.getElementById("number").value
                    }
                ;
                let verification = false;
                function findValueSendToStorage (articleExists) {
                    return articleExists.namearticle == valueSendToStorage.namearticle;
                }
                function findValueOptionArticleSendToStorage (optionarticleExists) {
                    return optionarticleExists.optionarticle == valueSendToStorage.numberofoptionarticle[0].optionarticle;   
                }


                if (obsJsonlocalstorage == false) {
                    obsJsonlocalstorage.push(valueSendToStorage);
                }
                else {
                    console.log(!obsJsonlocalstorage.find(findValueSendToStorage));
                    if (!obsJsonlocalstorage.find(findValueSendToStorage))
                    {
                        console.log( "Attention L'article n'existe pas");
                        obsJsonlocalstorage.push(valueSendToStorage);
                    }
                    else {
                        for (var k = 0; k < obsJsonlocalstorage.length; k++)
                        {
                            for (var m=0; m < obsJsonlocalstorage[k].numberofoptionarticle.length; m++ ) {
                    if (valueSendToStorage.namearticle === obsJsonlocalstorage[k].namearticle && valueSendToStorage.numberofoptionarticle[0].optionarticle === obsJsonlocalstorage[k].numberofoptionarticle[m].optionarticle)
                        {
                            verification = true;
                            console.log("Attention la Verification d'un article existant deja n'eeeeest "+verification);
                    if (verification) {

                        let  modifyValueSendToStorage =
                    {
                        namearticle : obsJsonlocalstorage[k].namearticle,
                        numberofoptionarticle : [{
                            optionarticle : obsJsonlocalstorage[k].numberofoptionarticle[m].optionarticle,
                            quantityoptionarticle : parseInt(obsJsonlocalstorage[k].numberofoptionarticle[m].quantityoptionarticle) + parseInt(valueSendToStorage.numberofoptionarticle[0].quantityoptionarticle)
                        }],
                        pricearticle : parseInt(obsJsonlocalstorage[k].pricearticle) + parseInt(valueSendToStorage.pricearticle), 
                        quantityarticle : parseInt(obsJsonlocalstorage[k].quantityarticle) + parseInt(valueSendToStorage.quantityarticle)
                    };
                    obsJsonlocalstorage[k] = modifyValueSendToStorage;
                }}



                    else if (valueSendToStorage.namearticle === obsJsonlocalstorage[k].namearticle && !obsJsonlocalstorage[k].numberofoptionarticle.find(findValueOptionArticleSendToStorage))
                        {
                            verification = true;
                            console.log("hellllllo");
                            console.log(!obsJsonlocalstorage.find(findValueOptionArticleSendToStorage));
                    if (verification) {
                        
                        let  modifyValueSendToStorage =
                    {
                        namearticle : obsJsonlocalstorage[k].namearticle,
                        numberofoptionarticle : obsJsonlocalstorage[k].numberofoptionarticle,
                        pricearticle : parseInt(obsJsonlocalstorage[k].pricearticle) + parseInt(valueSendToStorage.pricearticle), 
                        quantityarticle : parseInt(obsJsonlocalstorage[k].quantityarticle) + parseInt(valueSendToStorage.quantityarticle)
                    };
                    console.log( "Attention L'option d'article n'existe pas");
                    console.log(obsJsonlocalstorage[k].numberofoptionarticle);

                        modifyValueSendToStorage.numberofoptionarticle.push(valueSendToStorage.numberofoptionarticle[0]);
                        obsJsonlocalstorage[k] = modifyValueSendToStorage;
                }}
              }
                
                }}
            }
            
            localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
            console.table(obsJsonlocalstorage);




        })
                     

                




            


           /* var  modifyValueSendToStorage =
                    {
                    achat :
                    {
                        namearticle : obsJsonlocalstorage.namearticle,
                        numberofoptionarticle : {
                            optionarticle : obsJsonlocalstorage.numberofoptionarticle.optionarticle,
                            quantityoptionarticle : obsJsonlocalstorage.numberofoptionarticle.quantityoptionarticle + valueSendToStorage.numberofoptionarticle.quantityoptionarticle
                        },
                        pricearticle : obsJsonlocalstorage.price + valueSendToStorage.price, 
                        quantityarticle : obsJsonlocalstorage.quantityarticle + valueSendToStorage.quantityarticle
                    }}

                    console.table(modifyValueSendToStorage);*/
            }
            /*
            parcourir le tableau de l'objet storage , et en fonction des cas placer le localStorage.setItem avec la variable modifié ou pas
            
            
            verifier que getitem renvoie quelque cvhose sinon faire un tableau
             ensuite on peut pusher un objet literale 
             ensuite poser les set DataTransferItem, et faire attention a l'array de class name qui renvoie pas fvraiment un tableau

             e.target.value

             l'affichage d'abord les fonctions qu'on appele et ensuite les fonctions déclarative.(retirer l'id et faire un autre fetch)*/

            })

fetch("http://localhost:3000/api/furniture/")
.then( responsedfooter => {
 return responsedfooter.json()
} )
.then(produitfooter =>{
    console.table(produitfooter);
    for (var i = 0; i < produitfooter.length; i++){
if (urlParams.get('id') !== produitfooter[i]._id) {
            document.getElementById("otherproduct-selection").innerHTML +=`
                <a href="produit.html?id=${produitfooter[i]._id}" class="asidectn"> 
                    <h4> ${produitfooter[i].name}</h4> 
                    <img src="${produitfooter[i].imageUrl}" />
                </a>`;}
        };});