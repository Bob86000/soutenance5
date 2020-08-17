const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
console.log(urlParams.get('id'));

fetch("http://localhost:3000/api/furniture/")
.then( responsed => {
return responsed.json()
} )
.then(produit =>{
    var obsJsonlocalstorage= localStorage.getItem('session');
    var obs = JSON.parse(obsJsonlocalstorage);
    alert(obs);
    console.log(obs);
    alert("hello");
    console.table(obs);
    obs.forEach(console.log(obs));

    












})