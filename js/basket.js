/* Ce fetch a été rajouté a la toute derniere minute pour recupéré les ID qui n'avait pas été stocker*/
fetch("http://localhost:3000/api/furniture")
.then( res => res.json())
.then( home => {
console.log(home);
let responseElement = [];
localStorage.setItem("requiredtosendserver", JSON.stringify(responseElement));
home.forEach(elements => { 
    let addindex= {
        itemname : elements.name,
        itemid : elements._id
    }
        responseElement.push(addindex)})

        localStorage.setItem("requiredtosendserver", JSON.stringify(responseElement));

    }
    )

displayBasketPage();
displayBasket();
displayFinalPrice();
addOneMoreArticle();
removeOneArticle();
deleteallArticle();




verifyForm();
function verifyForm() {






}  
    
            document.getElementById("finalconfirmation").addEventListener('click', function(e) 
            {
                let contact =
                {
                 firstName : document.getElementById("form__firstname").value,
                 lastName : document.getElementById("form__name").value,
                 address : document.getElementById("form__address").value,
                 city : document.getElementById("form__city").value,
                 email : document.getElementById("form__email").value
                };
                let responseElement = JSON.parse(localStorage.getItem("requiredtosendserver"));
                let checkfirstname = false;
                let checkname = false;
                let checkaddress = false;
                let checkcity = false;
                let checkemail = false;
                let checkproducts = false;
                e.preventDefault();

                { function redalert (x,y) 
                    {
                    document.getElementById(x).innerHTML = " ! "+y+" n'est pas valide";
                    }
                }

                {  function greenalert (x)
                    { 
                    document.getElementById(x).innerHTML = ""
                    }
                }

                if (/^[a-zA-Z-]{2,} ?[a-zA-Z-]* ?[a-zA-Z-]*$/.test(contact.firstName) && typeof contact.firstName === "string") {
                    checkfirstname = true;
                    greenalert ("alertfirstname");
                    console.log("le prenom est bon");
                } else {
                    document.getElementById("form__firstname").value = "";
                    redalert ("alertfirstname","Le prénom");
                }
                if (/^[a-zA-Z-]{2,} ?[a-zA-Z-]* ?[a-zA-Z-]*$/.test(contact.lastName) && (typeof contact.lastName === "string")) {
                    checkname = true;
                    greenalert ("alertname");
                    console.log("le nom est bon");
                } else {
                    document.getElementById("form__name").value = "";
                    redalert ("alertname","Le nom");
                }
                if (/^[a-zA-Z0-9,._-]+ ?[a-zA-Z0-9,._-]{2,} ?[a-zA-Z0-9,. _-]*$/.test(contact.address) && (typeof contact.address === "string")) {
                    checkaddress = true;
                    greenalert ("alertaddress");
                    console.log("l'adresse est bonne");
                } else {
                    document.getElementById("form__address").value = "";
                    redalert ("alertaddress","L'adresse");
                }
                if (/^[a-zA-Z. _-]{2,}$/.test(contact.city) && (typeof contact.city === "string")) {
                    checkcity = true;
                    console.log("la ville est bonne");
                    greenalert ("alertcity");
                } else {
                    document.getElementById("form__city").value= "";
                    redalert ("alertcity","La ville");
                }
                
                if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(contact.email) && typeof contact.email === "string") {
                    checkemail = true;
                    console.log("l'email est ok");
                    greenalert ("alertemail");
                } else {
                    document.getElementById("form__email").value= "";
                    redalert ("alertemail","L'email");
                }
                if (obsJsonlocalstorage && obsJsonlocalstorage.length > 0) {
                    checkproducts = true;
                    console.log("le panier n'est pas vide");
                } else {
                    alert("Un problème est survenu.Votre panier est vide");
                }
                if (checkproducts && (!checkfirstname || !checkname || !checkaddress || !checkcity || !checkemail || !checkproducts)){
                    alert("Un problème est survenu.Vérifiez vos informations");
                    console.log(checkproducts);
                }
                if ( checkfirstname && checkname && checkaddress && checkcity && checkemail && checkproducts)
                {
                    
                    let products = [];
                    e.preventDefault();
                    console.log(typeof responseElement[0].itemid);
                for (let i = 0; i < obsJsonlocalstorage.length; i++) 
                {
                    for (let j = 0; j < responseElement.length; j++){
                        if ( responseElement[j].itemname == obsJsonlocalstorage[i].namearticle)
                        {
                            let finalproductsId = '';
                            finalproductsId += responseElement[j].itemid;
                            products.push(finalproductsId);
                        }
                }
                }
                console.log(products);
                console.log(typeof products[0]);
                fetch("http://localhost:3000/api/furniture/order", {
                    method: 'POST',
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({contact,products
                    })
                }).then(res => {
                    return res.json()})
                .then(data => {
                    console.log(data);
                    localStorage.setItem("order", JSON.stringify(data));
                    let obsJsonlocalstorage = [];
                    localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
                    window.location = this.href;
                })
                }})

fetch("http://localhost:3000/api/furniture/")
.then( responsedfooter => {
 return responsedfooter.json()
} )
.then(produitfooter =>{
    console.table(produitfooter);
    let produitFooter = '';
    for (let i = 0; i < produitfooter.length; i++){
        produitFooter +=`
                <a href="produit.html?id=${produitfooter[i]._id}" class="asidectn asidefooter verylowborder"> 
                    <h4> ${produitfooter[i].name}</h4> 
                    <img src="${produitfooter[i].imageUrl}" />
                </a>`;
        };
        document.getElementById("otherproduct-selection").innerHTML = produitFooter;
    
});
function displayBasketPage() {
    obsJsonlocalstorage = [];
    obsJsonlocalstorage = JSON.parse(localStorage.getItem('session')) || [];
    let addOptionArticle = '';
    let addArticle = '';
    for (let i = 0; i < obsJsonlocalstorage.length; i++) {
      for (let j = 0; j < obsJsonlocalstorage[i].numberofoptionarticle.length; j++)  {
        addOptionArticle +=
        `<div id="optionarticle${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="optionarticle">
            <div id="name${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="listarticleoption">
                <p>${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}</p>
            </div>
            <div id="quantity${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="quantityoptionarticle">
                <p>${obsJsonlocalstorage[i].numberofoptionarticle[j].quantityoptionarticle}</p>
            </div>
            <button id="add${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="add">
            </button>
            <button id="remove${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="remove">
            </button>
            <button id="delete${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="delete">
            </button>
        </div>`;
      };
      addArticle += 
        `<div id="ctn${obsJsonlocalstorage[i].namearticle}" class="basketpage-ctnarticle3">
            <div id="name${obsJsonlocalstorage[i].namearticle}" class="listarticle">
                <p>${obsJsonlocalstorage[i].namearticle}</p>
            </div>
            <div id="quantity${obsJsonlocalstorage[i].namearticle}" class="quantityarticle">
                <p>${obsJsonlocalstorage[i].quantityarticle}</p>
            </div>
            <div id="price${obsJsonlocalstorage[i].namearticle}" class="pricearticle">
                <p>${obsJsonlocalstorage[i].pricearticle/1000}£</p>
            </div>
        </div>
        <div id="alloptionarticle${obsJsonlocalstorage[i].namearticle}" class="alloptionarticle">
            ${addOptionArticle}
        </div>`;
      addOptionArticle = '';
    }
    document.getElementById("articlebasketpage-ctn2").innerHTML = addArticle;
}
function displayFinalPrice() {
  let finalPrice = 0;
  for (let i = 0; i < obsJsonlocalstorage.length; i++) {
    finalPrice += obsJsonlocalstorage[i].pricearticle;
  }
  console.log(finalPrice);
  document.getElementById("ordervalidation").innerHTML = `
    <div class="finalconfirmationctn">
        <div class="finalconfirmation lowborder">
            <a id="finalconfirmation" href="validation.html" ><p>Passez la commande</p></a> 
        </div> 
        <div class="finalpricectn lowborder"> 
            <p>Montant total</p> 
        <p id="finalPrice">${finalPrice/1000}£</p>
        </div>
    </div>`;
}
function addOneMoreArticle() {
    addOneToStorage = document.getElementsByClassName('add');
    for(let i=0; i<addOneToStorage.length; i++){   
      addOneItemToStorage(addOneToStorage[i]);
    }
    function addOneItemToStorage(p) {
      p.addEventListener('click', function(e) {   
        let getDomId = e.currentTarget.id;
        console.log(getDomId);
        getDomId = getDomId.slice(3);
        console.log(getDomId);
        console.table(obsJsonlocalstorage);
        console.table(getDomId);
        for (let j = 0; j < obsJsonlocalstorage.length; j++) {
          for (let k = 0; k < obsJsonlocalstorage[j].numberofoptionarticle.length; k++) {
            if (getDomId == obsJsonlocalstorage[j].namearticle+obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle) {   
              let newprice = obsJsonlocalstorage[j].pricearticle/obsJsonlocalstorage[j].quantityarticle;
              obsJsonlocalstorage[j].pricearticle += newprice;
              obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle++;
              obsJsonlocalstorage[j].quantityarticle++;
              localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
              document.getElementById("quantity"+obsJsonlocalstorage[j].namearticle+obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle).innerHTML = "<p>"+obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle+"</p>";
              document.getElementById("quantity"+obsJsonlocalstorage[j].namearticle).innerHTML = "<p>"+obsJsonlocalstorage[j].quantityarticle+"</p>";
              document.getElementById("price"+obsJsonlocalstorage[j].namearticle).innerHTML = "<p>"+obsJsonlocalstorage[j].pricearticle/1000+"£<p>";
              console.log(obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle);
              break;
            }
          }
        }
      let numberOfArticle = 0;
      let finalPrice = 0;
      for (let j = 0; j < obsJsonlocalstorage.length; j++) {
        numberOfArticle += parseInt(obsJsonlocalstorage[j].quantityarticle);
        finalPrice += obsJsonlocalstorage[j].pricearticle 
      }
      document.getElementById("basketnumber").innerHTML = numberOfArticle;
      document.getElementById("finalPrice").innerHTML = `${finalPrice/1000}£`;
  
      })
    }
}
function removeOneArticle() {
    let removeOneToStorage  = document.getElementsByClassName('remove');
    for(let i=0; i<removeOneToStorage.length; i++){   
      removeOneItemToStorage(removeOneToStorage[i]);
    }
    function removeOneItemToStorage(p) {
      p.addEventListener('click', function(e) {   
        let getDomId = e.currentTarget.id;
        console.log(getDomId);
        getDomId = getDomId.slice(6);
        console.log(getDomId);
        console.table(obsJsonlocalstorage);
        console.table(getDomId);
        for (let j = 0; j < obsJsonlocalstorage.length; j++) {
          for (let k = 0; k < obsJsonlocalstorage[j].numberofoptionarticle.length; k++)  {
            if (getDomId == obsJsonlocalstorage[j].namearticle+obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle &&
              obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle > 0) { 
                console.table(obsJsonlocalstorage[j].numberofoptionarticle);
                let newprice = obsJsonlocalstorage[j].pricearticle/obsJsonlocalstorage[j].quantityarticle;
                obsJsonlocalstorage[j].pricearticle -= newprice;
                obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle--;
                obsJsonlocalstorage[j].quantityarticle--;
                localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
                console.log("retrait effectué");
                console.table(obsJsonlocalstorage[j].numberofoptionarticle);
                if (obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle < 1) {
                  let elementRemove = document.getElementById("optionarticle"+obsJsonlocalstorage[j].namearticle+obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle);
                  let parentOfElementRemove = document.getElementById("alloptionarticle"+obsJsonlocalstorage[j].namearticle);
                  document.getElementById("quantity"+obsJsonlocalstorage[j].namearticle).innerHTML = "<p>"+obsJsonlocalstorage[j].quantityarticle+"</p>";
                  document.getElementById("price"+obsJsonlocalstorage[j].namearticle).innerHTML = "<p>"+obsJsonlocalstorage[j].pricearticle/1000+"£</p>";
                  parentOfElementRemove.removeChild(elementRemove);
                  let indextoDeleteOption = obsJsonlocalstorage[j].numberofoptionarticle.map( e => e.optionarticle).indexOf(obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle);
                  console.table(obsJsonlocalstorage[j].numberofoptionarticle);
                  console.log(obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle);
                  console.log(indextoDeleteOption);
                  obsJsonlocalstorage[j].numberofoptionarticle.splice(indextoDeleteOption, 1);
                  console.table(obsJsonlocalstorage[j].numberofoptionarticle);
                  localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
                  console.log(obsJsonlocalstorage[j].numberofoptionarticle.length);
                  if (obsJsonlocalstorage[j].numberofoptionarticle.length == 0) {
                    let articleElementRemove = document.getElementById("ctn"+obsJsonlocalstorage[j].namearticle);
                    let articleElementRemove2 = document.getElementById("alloptionarticle"+obsJsonlocalstorage[j].namearticle);
                    let articleparentOfElementRemove = document.getElementById("articlebasketpage-ctn2");
                    articleparentOfElementRemove.removeChild(articleElementRemove);
                    articleparentOfElementRemove.removeChild(articleElementRemove2);
                    console.table(obsJsonlocalstorage);
                    console.table("hello");
                    let indextoDeleteArticle = obsJsonlocalstorage.map( e => e.namearticle).indexOf(obsJsonlocalstorage[j].namearticle);
                    console.table(indextoDeleteArticle);
                    obsJsonlocalstorage.splice(indextoDeleteArticle, 1);
                    localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
                    console.table(obsJsonlocalstorage);
                  }
                  break;
                }
                else if (obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle > 0) {
                  document.getElementById("quantity"+obsJsonlocalstorage[j].namearticle+obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle).innerHTML = "<p>"+obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle+"</p>";
                  document.getElementById("quantity"+obsJsonlocalstorage[j].namearticle).innerHTML = "<p>"+obsJsonlocalstorage[j].quantityarticle+"</p>";
                  document.getElementById("price"+obsJsonlocalstorage[j].namearticle).innerHTML = "<p>"+obsJsonlocalstorage[j].pricearticle/1000+"£</p>";
                  console.log(obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle);
                  break;
                }
            }
          }
        }
        let numberOfArticle = 0;
        let finalPrice =0;
        for (let j = 0; j < obsJsonlocalstorage.length; j++) {
          numberOfArticle += parseInt(obsJsonlocalstorage[j].quantityarticle);
          finalPrice += obsJsonlocalstorage[j].pricearticle 
        }
          document.getElementById("basketnumber").innerHTML = numberOfArticle;
          document.getElementById("finalPrice").innerHTML = `${finalPrice/1000}£`;
         
      })
    }
  }
  function deleteallArticle() {
    let deleteAlltostorage = document.getElementsByClassName('delete');
    for(let i=0; i<deleteAlltostorage.length; i++)
            {   
                deleteAllItemToStorage(deleteAlltostorage[i]);
            }
    
       
        function deleteAllItemToStorage(p) {
                p.addEventListener('click', function(e)
                {   
                    let getDomId = e.currentTarget.id;
                    console.log(getDomId);
                    getDomId = getDomId.slice(6);
                    console.log(getDomId);
                    console.table(obsJsonlocalstorage);
                    for (let j = 0; j < obsJsonlocalstorage.length; j++) 
                    {
                         for (let k = 0; k < obsJsonlocalstorage[j].numberofoptionarticle.length; k++)  {
                            if (getDomId == obsJsonlocalstorage[j].namearticle+obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle)
                            {   
    
                                let elementRemove = document.getElementById("optionarticle"+obsJsonlocalstorage[j].namearticle+obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle);
                                let parentOfElementRemove = document.getElementById("alloptionarticle"+obsJsonlocalstorage[j].namearticle);
                                parentOfElementRemove.removeChild(elementRemove);
    
                                let newprice = obsJsonlocalstorage[j].pricearticle/obsJsonlocalstorage[j].quantityarticle;
                                newprice = newprice*obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle;
                                obsJsonlocalstorage[j].pricearticle -= newprice;
                                obsJsonlocalstorage[j].quantityarticle -= obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle;
                                obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle = 0;
                                document.getElementById("quantity"+obsJsonlocalstorage[j].namearticle).innerHTML = "<p>"+obsJsonlocalstorage[j].quantityarticle+"</p>";
                                document.getElementById("price"+obsJsonlocalstorage[j].namearticle).innerHTML = "<p>"+obsJsonlocalstorage[j].pricearticle/1000+"£</p>";
                                let indextoDeleteOption = obsJsonlocalstorage[j].numberofoptionarticle.map( e => e.optionarticle).indexOf(obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle);
                                obsJsonlocalstorage[j].numberofoptionarticle.splice(indextoDeleteOption, 1);
                                localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
                                if (obsJsonlocalstorage[j].numberofoptionarticle.length == 0)
                            {
                                
                                let articleElementRemove = document.getElementById("ctn"+obsJsonlocalstorage[j].namearticle);
                                let articleElementRemove2 = document.getElementById("alloptionarticle"+obsJsonlocalstorage[j].namearticle);
                                let articleparentOfElementRemove = document.getElementById("articlebasketpage-ctn2");
                                articleparentOfElementRemove.removeChild(articleElementRemove);
                                articleparentOfElementRemove.removeChild(articleElementRemove2);
                                console.table(obsJsonlocalstorage);
                                console.table("hello");
                                let indextoDeleteArticle = obsJsonlocalstorage.map( e => e.namearticle).indexOf(obsJsonlocalstorage[j].namearticle);
                                console.table(indextoDeleteArticle);
                                obsJsonlocalstorage.splice(indextoDeleteArticle, 1);
                               
                                localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
                                console.table(obsJsonlocalstorage);
                            }
                                break;
                            }
    
                         }}
                         let numberOfArticle = 0;
                         let finalPrice = 0;
                             for (let j = 0; j < obsJsonlocalstorage.length; j++) 
                     {
                        numberOfArticle += parseInt(obsJsonlocalstorage[j].quantityarticle); 
                        finalPrice += obsJsonlocalstorage[j].pricearticle;
    
                     }
                     document.getElementById("basketnumber").innerHTML = numberOfArticle;
                     document.getElementById("finalPrice").innerHTML = `${finalPrice/1000}£`;
                })}
            
    }
    
      
