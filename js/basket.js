fetch("http://localhost:3000/api/furniture/")
.then( responsed => {
return responsed.json()
} )
.then(produit =>{
    let obsJsonlocalstorage = JSON.parse(localStorage.getItem('session')) || [];
    let addOptionArticle = '';
    let addArticle ='';
    for (let i = 0; i < obsJsonlocalstorage.length; i++) {

        
        for (let j = 0; j < obsJsonlocalstorage[i].numberofoptionarticle.length; j++)  {
            addOptionArticle +=    `<div id="optionarticle${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="optionarticle">
                                        <div id="name${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="listarticleoption">
                                            <p>${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}</p>
                                        </div>
                                        <div id="quantity${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="quantityoptionarticle">
                                            <p>${obsJsonlocalstorage[i].numberofoptionarticle[j].quantityoptionarticle}</p>
                                        </div>
                                        <button id="add${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="add"></button>
                                        <button id="remove${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="remove"></button>
                                        <button id="delete${obsJsonlocalstorage[i].namearticle}${obsJsonlocalstorage[i].numberofoptionarticle[j].optionarticle}" class="delete"></button>
                                    </div>`;
        };
        addArticle += `
        <div id="ctn${obsJsonlocalstorage[i].namearticle}">
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
        <div id="alloptionarticle${obsJsonlocalstorage[i].namearticle}" class="alloptionarticle">${addOptionArticle}</div>`;
        addOptionArticle = '';
    }

    document.getElementById("articlebasketpage-ctn2").innerHTML = addArticle;


    obsJsonlocalstorage = [];
    obsJsonlocalstorage = JSON.parse(localStorage.getItem('session')) || [];
    let numberOfArticle = 0;

    if (!obsJsonlocalstorage == false )
    {
    
    for (let i = 0; i < obsJsonlocalstorage.length; i++)
    {
        numberOfArticle += parseInt(obsJsonlocalstorage[i].quantityarticle); 
    }
    console.log(numberOfArticle);
    document.getElementById("basketnumber").innerHTML = numberOfArticle;
    }
        
        
    let finalPrice = 0;
    for (let i = 0; i < obsJsonlocalstorage.length; i++) 
    {
        finalPrice += obsJsonlocalstorage[i].pricearticle;
    }

    console.log(finalPrice);

    document.getElementById("ordervalidation").innerHTML = `
    <div class="finalconfirmationctn">
        <div class="finalconfirmation">
            <a id="finalconfirmation" href="validation.html" ><p>Passez la commande</p></a> 
        </div> 
        <div class="finalpricectn"> 
        <p>Montant total</p> 
        <p id="finalPrice" >${finalPrice/1000}£</p>
        </div>
    </div>`;

    let addOneToStorage = document.getElementsByClassName('add');
    let removeOneToStorage  = document.getElementsByClassName('remove');
    let deleteAlltostorage = document.getElementsByClassName('delete');

    for(let i=0; i<addOneToStorage.length; i++)
        {   
            addOneItemToStorage(addOneToStorage[i]);
        }
        
        function addOneItemToStorage(p) {
            p.addEventListener('click', function(e)
            {   
                let getDomId = e.currentTarget.id;
                console.log(getDomId);
                getDomId = getDomId.slice(3);
                console.log(getDomId);

                console.table(obsJsonlocalstorage);
                console.table(getDomId);
                for (let j = 0; j < obsJsonlocalstorage.length; j++) 
                {
                     for (let k = 0; k < obsJsonlocalstorage[j].numberofoptionarticle.length; k++)  {
                        if (getDomId == obsJsonlocalstorage[j].namearticle+obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle)
                        {   
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

                     }}
                     let numberOfArticle = 0;
                     let finalPrice = 0;
                         for (let j = 0; j < obsJsonlocalstorage.length; j++) 
                 {
                    numberOfArticle += parseInt(obsJsonlocalstorage[j].quantityarticle);
                    finalPrice += obsJsonlocalstorage[j].pricearticle 

                 }
                 document.getElementById("basketnumber").innerHTML = numberOfArticle;
                 document.getElementById("finalPrice").innerHTML = `${finalPrice/1000}£`;

            })}


    for(let i=0; i<removeOneToStorage.length; i++)
        {   
            removeOneItemToStorage(removeOneToStorage[i]);
        }
                    
    function removeOneItemToStorage(p) {
         p.addEventListener('click', function(e)
            {   
                let getDomId = e.currentTarget.id;
                console.log(getDomId);
                getDomId = getDomId.slice(6);
                console.log(getDomId);

                console.table(obsJsonlocalstorage);
                console.table(getDomId);
                for (let j = 0; j < obsJsonlocalstorage.length; j++) 
                 {
                    for (let k = 0; k < obsJsonlocalstorage[j].numberofoptionarticle.length; k++)  {
                    if (getDomId == obsJsonlocalstorage[j].namearticle+obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle && obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle > 0)
                    {   
                        console.table(obsJsonlocalstorage[j].numberofoptionarticle);
                        let newprice = obsJsonlocalstorage[j].pricearticle/obsJsonlocalstorage[j].quantityarticle;
                        obsJsonlocalstorage[j].pricearticle -= newprice;
                        obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle--;
                        obsJsonlocalstorage[j].quantityarticle--;
                        localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
                        console.log("retrait effectué");
                        console.table(obsJsonlocalstorage[j].numberofoptionarticle);
                                
                        if (obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle < 1)
                        {
                            /*node.removeChild(child);*/

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
                        break
                        }
                        else if (obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle > 0) 
                        {
                        document.getElementById("quantity"+obsJsonlocalstorage[j].namearticle+obsJsonlocalstorage[j].numberofoptionarticle[k].optionarticle).innerHTML = "<p>"+obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle+"</p>";
                        document.getElementById("quantity"+obsJsonlocalstorage[j].namearticle).innerHTML = "<p>"+obsJsonlocalstorage[j].quantityarticle+"</p>";
                        document.getElementById("price"+obsJsonlocalstorage[j].namearticle).innerHTML = "<p>"+obsJsonlocalstorage[j].pricearticle/1000+"£</p>";
                        console.log(obsJsonlocalstorage[j].numberofoptionarticle[k].quantityoptionarticle);
                        break;
                        }

                            }
                            
    
                         }}
                         let numberOfArticle = 0;
                         let finalPrice =0;
                         for (let j = 0; j < obsJsonlocalstorage.length; j++) 
                 {
                    numberOfArticle += parseInt(obsJsonlocalstorage[j].quantityarticle);
                    finalPrice += obsJsonlocalstorage[j].pricearticle 

                 }
                 document.getElementById("basketnumber").innerHTML = numberOfArticle;
                 document.getElementById("finalPrice").innerHTML = `${finalPrice/1000}£`;
    
                })}


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


            document.getElementById("finalconfirmation").addEventListener('change', function(e) 
            {
                contact =
                {
                 firstname : document.getElementById("form__firstname").value,
                 name : document.getElementById("form__name").value,
                 address : document.getElementById("form__address").value,
                 city : document.getElementById("form__city").value,
                 email : document.getElementById("form__email").value
                };
                if (/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6})$/.test(contact.firstname)) {
                    let checkfirstname = true;
                } else {
                    e.preventDefault();
                    alert("pas ok");
                    e.target.value='';
                    e.target.focus();
                }
                if (/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6})$/.test(contact.name)) {
                    let checkname = true;
                } else {
                    e.preventDefault();
                    alert("pas ok");
                    e.target.value='';
                    e.target.focus();
                }
                if (/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6})$/.test(contact.address)) {
                    let checkaddress = true;
                } else {
                    e.preventDefault();
                    alert("pas ok");
                    e.target.value='';
                    e.target.focus();
                }
                if (/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6})$/.test(contact.city)) {
                    let checkcity = true;
                } else {
                    e.preventDefault();
                    alert("pas ok");
                    e.target.value='';
                    e.target.focus();
                }
                
                if (/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6})$/.test(contact.email)) {
                    let checkemail = true;
                    ne pas oublier la veirfication string des valeurs de propriété
                } else {
                    e.preventDefault();
                    alert("pas ok");
                    e.target.value='';
                    e.target.focus();
                }
                if ( verifier que le panier contient minimum un produit) {
                    let checkproduct = true;
                } else {
                    e.preventDefault();
                    alert("pas ok");
                    e.target.value='';
                    e.target.focus();
                }

                if ( checkfirstname && checkname && checkaddress && checkcity && checkemail && checkproducts)
                {
                    let products = [];
                for (let i = 0; i < obsJsonlocalstorage.length; i++) 
                {
                    let nameproducts = '';
                    nameproducts += obsJsonlocalstorage[i].namearticle
                    products.push(nameproducts);
                }

                }
})

fetch("http://localhost:3000/api/furniture/")
.then( responsedfooter => {
 return responsedfooter.json()
} )
.then(produitfooter =>{
    console.table(produitfooter);
    let produitFooter = '';
    for (var i = 0; i < produitfooter.length; i++){
        produitFooter +=`
                <a href="produit.html?id=${produitfooter[i]._id}" class="asidectn"> 
                    <h4> ${produitfooter[i].name}</h4> 
                    <img src="${produitfooter[i].imageUrl}" />
                </a>`;
        };
        document.getElementById("otherproduct-selection").innerHTML = produitFooter;
    
    });

    /*document.getElementById("name").addEventListener('input', function(e) {
        var value = e.target.value;
        function isValid(value) {
            return /^[a-zA-Z]{0,16} [a-zA-Z]{0,16}$/.test(value);
        }    
    });*/

    /**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */