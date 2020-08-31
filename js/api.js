
let insa = fetch("http://localhost:3000/api/furniture")
.then( res => res.json())
.then( home => {
console.log(home);
let responseElement ='';
home.forEach(elements => {
    responseElement += 
    `<a class="sectionctn lowborder" href="produit.html?id=${elements._id}">
        <div class="imgctn verylowborder">
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