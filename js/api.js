
let insa = fetch("http://localhost:3000/api/furniture")
.then( responsed => {
return responsed.json()
} )
.then( home => {
console.log(home);
let responseElement ='';
home.forEach(elements => {
    responseElement += 
    `<a class="sectionctn" href="produit.html?id=${elements._id}">
        <div class="imgctn">
            <img  src="${elements.imageUrl}" />
        </div> 
        <div class="textctn">
            <h2>${elements.name}</h2>
            <p>${elements.description}</p>
        </div>
        </a>`; 
    document.getElementById("sectionid").innerHTML= responseElement;



 });

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
});


/*nom prenom adresse, pas de Date.

trello.com, afficher le menu / plus, copier le tableau .




/*CSSConditionRule

coder.com

afficher, cliquer, ajouter au panier 



par defautl il fait get.

const innerdescription = document.getElementsByClassName('textctn');
this.innerHTML.response.description;


this.innerHTML.String(response.description);

const events = document.getElementsByClassName('textctn');
events.addEventListener('click', function(e) {     
    e.events.innerHTML = "C'est cliqué !";   
})   */