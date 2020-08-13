
let insa = fetch("http://localhost:3000/api/furniture")
.then( responsed => {
return responsed.json()
} )
.then( blop => {
console.log(blop) ; 
console.log(blop) ; 

blop.forEach(elements => {
 document.getElementById("sectionid").innerHTML += 
    `<a class="sectionctn" href="produit.html?id=${elements._id}">
        <div class="imgctn">
            <img  src="${elements.imageUrl}" />
        </div> 
        <div class="textctn">
            <h2>${elements.name}</h2>
            <p>${elements.description}</p>
        </div>
        </a>`; 

 var valueHref = document.querySelectorAll('.mainpagectn a');

for (var i = 0, c = valueHref.length ; i < c ; i++) {
    valueHref[i].addEventListener('click', function () {

        return elements;
})};


 });

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