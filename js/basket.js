fetch("http://localhost:3000/api/furniture/")
.then( responsed => {
return responsed.json()
} )
.then(produit =>{
    var obsJsonlocalstorage = JSON.parse(localStorage.getItem('session'));
    for (var i = 0; i < obsJsonlocalstorage.length; i++) {
        document.getElementById("articlebasketpage-ctn2").innerHTML += `
        <div>
            <div id="${obsJsonlocalstorage[i].namearticle}" class="listarticle">
                <p>${obsJsonlocalstorage[i].namearticle}</p>
            </div>
            <div id="${obsJsonlocalstorage[i].quantityarticle}" class="quantityarticle">
                <p>${obsJsonlocalstorage[i].quantityarticle}</p>
            </div>
            <div id="${obsJsonlocalstorage[i].pricearticle}" class="pricearticle">
                <p>${obsJsonlocalstorage[i].pricearticle/1000}£</p>
            </div>
        </div>`;
        }
        
        
    let finalprice = 0;
    for (var j = 0; j < obsJsonlocalstorage.length; j++) {
    finalprice += obsJsonlocalstorage[j].pricearticle;}

    console.log(finalprice);

    document.getElementById("ordervalidation").innerHTML = `
    <div class="finalconfirmationctn"> 
        <p> <a href="validation.html" >Passez la commande</a> </p>
        <div class="finalpricectn"> 
        <p>Montant total</p> 
        <p>${finalprice/1000}£<p>
        </div>
    </div>`;

    document.getElementById("name").addEventListener('input', function(e) {
        var value = e.target.value;
        function isValid(value) {
            return /^[a-zA-Z]{0,16} [a-zA-Z]{0,16}$/.test(value);
        }    
    });

        



})

fetch("http://localhost:3000/api/furniture/")
.then( responsedfooter => {
 return responsedfooter.json()
} )
.then(produitfooter =>{
    console.table(produitfooter);
    for (var i = 0; i < produitfooter.length; i++){
            document.getElementById("otherproduct-selection").innerHTML +=`
                <a href="produit.html?id=${produitfooter[i]._id}" class="asidectn"> 
                    <h4> ${produitfooter[i].name}</h4> 
                    <img src="${produitfooter[i].imageUrl}" />
                </a>`;
        };});

    /*for (var i = 0; i < obsJsonlocalstorage.length; i++) {
    document.getElementById("basketpage-ctn2").innerHTML += `
    <div> Vos articles </div> 



    alert(obs);
    console.log(obs);
    alert("hello");
    console.table(obs);
    obs.forEach(console.log(obs));*/