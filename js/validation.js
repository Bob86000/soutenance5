let obsJsonlocalstorage = [];
obsJsonlocalstorage = JSON.parse(localStorage.getItem('session')) || [];
let Numberofarticle = 0;
if (!obsJsonlocalstorage === false )
{
for (let i = 0; i < obsJsonlocalstorage.length; i++)
{
 Numberofarticle += parseInt(obsJsonlocalstorage[i].quantityarticle);
}
console.log(Numberofarticle);
}
document.getElementById("basketnumber").innerHTML = Numberofarticle;


let order = [];
order = JSON.parse(localStorage.getItem('order')) || [];
console.log(order);

console.log(order.contact);

console.log(order.contact.city);

document.getElementById("article").innerHTML = `
<div class = "validationpage-ctn">
    <p>La commande a bien été validée.</br>
    Votre numero de commande est le <span>${order.orderId}</span>.</br>
    Les articles ci dessous vont seront envoyées dans les meilleurs délais.</p>
    <div id="orderarticle-ctn" class=orderarticle-ctn></div>
    <p>L'adresse ou seront livrés les articles :</p>
    <p><span>${order.contact.firstName}</span></br>
    <span>${order.contact.lastName}</span></br>
    <span>${order.contact.address}</span></br>
    <span>${order.contact.city}</span></p>
    <p> Toute ces informations ont été également envoyé sur votre mail <span>${order.contact.email}</span></br>
    Merci pour votre commande.</br>
    A bientôt.</p>
</div>`
;

let addOrderArticle = "";
for (let i = 0; i < order.products.length; i++)  {
    addOrderArticle += 
    `<div class="orderarticle">
     <img src="${order.products[i].imageUrl}"/>  
     <p>${order.products[i].name}</p>
       </div>`;
    }
console.log(order.products[0].name);
console.log(addOrderArticle);


 document.getElementById("orderarticle-ctn").innerHTML = addOrderArticle;



fetch("http://localhost:3000/api/furniture/")
.then( responsedfooter => {
 return responsedfooter.json()
} )
.then(produitfooter =>{
    console.table(produitfooter);
    let produitFooter = '';
    for (let i = 0; i < produitfooter.length; i++){
        produitFooter +=`
                <a href="produit.html?id=${produitfooter[i]._id}" class="asidectn verylowborder asidefooter"> 
                    <h4> ${produitfooter[i].name}</h4> 
                    <img src="${produitfooter[i].imageUrl}" />
                </a>`;
        };
        document.getElementById("otherproduct-selection").innerHTML = produitFooter;
    
    });