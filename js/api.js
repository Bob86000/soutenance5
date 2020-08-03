

var request = new XMLHttpRequest();

fetch(request)
.then(
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response.description);
    }
}
);
request.open("GET(/)", "http://localhost:3000/api/furniture");
request.send();

const innerdescription = document.getElementsByClassName('textctn');
this.innerHTML.response.description;


this.innerHTML.String(response.description);

const events = document.getElementsByClassName('textctn');
events.addEventListener('click', function() {     
    events.innerHTML = "C'est cliqué !";   
})   