const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
console.log(urlParams.get('id'));

fetch("http://localhost:3000/api/furniture/"+urlParams.get('id'))
.then( responsed => responsed.json())
.then(produit =>{
    console.log(produit.name);
    document.getElementById("article").innerHTML = `
        <div class="productpagectn lowborder" id="productpagectn">
            <h2 id="namearticle">${produit.name}</h2>
            <div class="articlectn-header1" >
                <div class="articlectn-choice">
                    <button id="articlectn_button" class=ajout_evenement_pourderoulement>
                        <label for="vernis">
                        Choix du vernis
                        </label>
                        <select name="varnishbutton" id="vernis"></select>
                    </button>
                </div>
            </div>
            <div class="articlectn-main1 verylowborder">
                <img src="${produit.imageUrl}" />  
            </div>
            <div class="articlectn-footer1">
                <p>"${produit.description}"</p>
            </div>
        </div>
        <div class="articlectn-buyctn lowborder">
            <h3>${produit.name}</h3>
            <div class="articlectn-header2">
                <p id="ajustvarnish">Fournie avec le vernis <span>${produit.varnish[0]}</span>.</p>
                <p>Le délai de livraison pour cet article est de 14 jours environ.</p>
            </div>
            <div class="articlectn-main2">
                <p>Prix du produit :<span id="price">${produit.price / 1000}</span>£</p>
                <label for="quantity">
                    Selection de la quantité
                </label> 
                <input type="number" id="number" name="quantity" value="1" min="1" max="15">
            </div>
            <div class="articlectn-footer2">
                <a href="panier.html">
                    <button class="addtocard" ><p>Acheter cet article</p></button>
                </a>
                <button class="addtocard" ><p>Ajouter au panier</p></button>
            </div>
        </div>`;

 
/*ne pas utiliser inner.html += dans une boucle mettre une variable pour concatener et recupéré le string via element.html*/
    
/*boucle pour parcourir le tableau des vernis et afficher en <option> les reference des vernis*/
    let varnishProduit ='';
    for (let j = 0; j < produit.varnish.length; j++) 
        {
        varnishProduit += `
        <option id="${produit.varnish[j]}" class="varnishclass" value="${produit.varnish[j]}">
            ${produit.varnish[j]}
        </option>`;
        }
/* Une fois que j'ai recupéré tout les otpions des vernis je les insere dans un element html dédié au vernis*/
    document.getElementById("vernis").innerHTML = varnishProduit;

/* je rajoute un evenement qui fait que lorsqu'on click sur un <option> qui contient le vernis,automatiquement le vernis selectionné s'affiché sur une autre portion de page*/     
    let  varnishchoice = document.getElementById("vernis");
    varnishchoice.addEventListener('change', function(e)
        {
        document.getElementById("ajustvarnish").innerHTML= `Fournie avec le vernis <span>${e.currentTarget.value}</span>.`
        });




    
/*ici j'initialise toutes les fonctions qui n'ont pas besoin d'etre initialisé de manière synchrone dans une partie précise du code*/  

/*Obsjonlocalstorage va me servir a stocker un tableau qui contiendra les informations que j'enverrai dans le localstorage nommé session*/
    let obsJsonlocalstorage = [];

/*Numberofarticle va me servir a calculé en temps réel le nombre d'article dans le panier qui est affiché dans le header de la page html*/
    let Numberofarticle = 0;

/*calculate me sert a calculé le prix en temps réel des produits selectionné , elle retourne une valeur et prend en argument la quantité selectionné du produit que l'on va recupéré via un evenement*/    
    let calculate = 
    {
    fullprice: (y) => ((y)*produit.price)/1000
    };

/*addtocard va me servir a placer 1 evenement sur chacun des boutons achat (acheter ou mettre dans le panier)*/    
    let addtocard = document.getElementsByClassName('addtocard'); 


/* Ici je verifie que le le localstorage ne renvoie pas une valeur undefined ou null, si le tableau est vide, lenght renverra 0 et la condition pour la boucle ne se fera pas*/

    obsJsonlocalstorage = JSON.parse(localStorage.getItem('session')) || [];
    if (!obsJsonlocalstorage === false )
        {
/*Lorsque la page se charge , une boucle va additionné toute les quantités de chaque article contenu dans le localstorage*/           
        for (let i = 0; i < obsJsonlocalstorage.length; i++)
            {
            Numberofarticle += parseInt(obsJsonlocalstorage[i].quantityarticle); 
            }
        console.log(Numberofarticle);
        }
/*Numberofarticle contient maintenant la quantité total des produits qui ont été stocker dans le localstorage, j'affiche la valeur dans le header de la page*/
    document.getElementById("basketnumber").innerHTML = Numberofarticle;

/*number correspond au prix de tout les produits. Elle est affiché grace à la valeur quantité recupéré au moment du click, puis via la fonction calculate je calcule le prix final en rentrant la quantité en argument de la fonction */    
    document.getElementById("number").addEventListener('change', function(e)
        {
        document.getElementById("price").innerHTML= calculate.fullprice(e.currentTarget.value);
        })

/* Cette boucle va executé 2 fois la fonction et cette fonction renvoie dans son argument un element HTML, qui sera différent a chaque itération. Et ensuite elle va placer un evenement sur chaque element */        

    for(let n=0; n<addtocard.length; n++)
        {   
            sendtostorage(addtocard[n]);
        }

    function sendtostorage(p) {
           p.addEventListener('click', function()
           {
/*valueSendToStorage va stocker les valeur enregistré sur la page actuelle au moment du click, c'est la seul façon d'ajouter des valeurs dans le localstorage*/               
            let valueSendToStorage =
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
/*Si le localstorage est vide, la valeur qu'il renvoie est false . Si il est bien vide j'envoie' simplement les valeurs de la page actuelle sans aucune autre opérations*/ 
                if (obsJsonlocalstorage == false) {
                    console.log("Il n'y avait aucun article dans la panier? " + (obsJsonlocalstorage == false) );
                    obsJsonlocalstorage.push(valueSendToStorage);
                    localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
                    obsJsonlocalstorage = JSON.parse(localStorage.getItem('session'));
                    console.log("L'article selectionné a bien été envoyé dans le panier? " + (!obsJsonlocalstorage == false ));
                    console.table(obsJsonlocalstorage);
                }
                else {
/*Si le localstorage n'est pas vide , c'est qu'il contient deja un article et dans ce cas je verifie que dans le tableau du localstorage il n'y pas article qui a le meme nom que celui que je m'apprete a envoyer au localstorage */ 

                    if (!obsJsonlocalstorage.find(articleExists => articleExists.namearticle == valueSendToStorage.namearticle ))
                    {
                        console.log( "L'article selectionné n'existe pas dans le panier? "+ (!obsJsonlocalstorage.find(articleExists => articleExists.namearticle == valueSendToStorage.namearticle )));
                        for (let i = 0; i < obsJsonlocalstorage.length; i++){
                        var lengthBeforepush = i;}
/*Pour rajouter un article au local storage je push tout simplement dans le tableau storage un objet qui contient les valeurs de la page actuelle que j'envoie*/                         
                        obsJsonlocalstorage.push(valueSendToStorage);
                        localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));

                        for (let j = 0; j < obsJsonlocalstorage.length; j++){
                        var lengthafterpush = j;}

                        console.log("Il y avait déjà un article dans le panier et un article différent est ajouté? " +( lengthBeforepush < lengthafterpush) )
                        console.table(obsJsonlocalstorage);
                    }
 /*Si il y a article que j'envoie qui a le meme nom que celui d'un des article du tableau storage dans ce cas je ne vais pas l'envoyer. je vais simplement mettre a jour la quantité de l'article qui existe deja dans le localstorage */ 
                    else {
 /* Avant de mettre a jour la quantité il faut que je sache si l'article qui existe deja a la meme option de vernis que l'article que je souhaite envoyé*/                        
                        for (let k = 0; k < obsJsonlocalstorage.length; k++)
                        {
                            for (let m=0; m < obsJsonlocalstorage[k].numberofoptionarticle.length; m++ ) {
/*J'ai utilisé deux boucles pour fouiller dans deux tableux , le premier celui des nom d'articles , le deuxieme celui des nom de vernis de chaque article.Si j'ai un nom identique & un nom de vernis identique dans ce cas la je modifie les quantités*/                                 
                    if (valueSendToStorage.namearticle === obsJsonlocalstorage[k].namearticle && valueSendToStorage.numberofoptionarticle[0].optionarticle == obsJsonlocalstorage[k].numberofoptionarticle[m].optionarticle)
                        {
                            console.log("L'article existe déjà dans le panier? " + (valueSendToStorage.namearticle === obsJsonlocalstorage[k].namearticle) + " et l'option de personnalisation existait également dans le panier? " + (valueSendToStorage.numberofoptionarticle[0].optionarticle == obsJsonlocalstorage[k].numberofoptionarticle[m].optionarticle));
                            console.log("Ici l'article et l'option de personnalisation existait deja on additionne les quantités");
                            
/*Il y a deux quantité a modifier , celle du nombre des articles et celle du nombre des options d'articles (les vernis).Je créer une variable qui va stocker la quantité du nombre des articles*/ 
                        let modifyValueSendToStorage =
                    {
                        namearticle : obsJsonlocalstorage[k].namearticle,
                        numberofoptionarticle : obsJsonlocalstorage[k].numberofoptionarticle,
                        pricearticle : parseInt(obsJsonlocalstorage[k].pricearticle) + parseInt(valueSendToStorage.pricearticle), 
                        quantityarticle : parseInt(obsJsonlocalstorage[k].quantityarticle) + parseInt(valueSendToStorage.quantityarticle)
                    };
/*Je créer une autre variable qui va stocker la quantité du nombre des options d'articles*/ 
                        let modifynumberofoptionarticle = {
                            optionarticle : obsJsonlocalstorage[k].numberofoptionarticle[m].optionarticle,
                            quantityoptionarticle : parseInt(obsJsonlocalstorage[k].numberofoptionarticle[m].quantityoptionarticle) + parseInt(valueSendToStorage.numberofoptionarticle[0].quantityoptionarticle)
                        };
/*Je ne vais pas modifié tout le localstorage juste l'index visé. Je rajoute la nouvelle valeur de quantité et de prix de l'article ,et ensuite dans un second temps je rajoute la nouvelle valeur de la quantité d'option d'article*/ 
                    obsJsonlocalstorage[k] = modifyValueSendToStorage;
                    obsJsonlocalstorage[k].numberofoptionarticle[m] = modifynumberofoptionarticle;
/*J'ai maintenant un tableau qui contient les bonnes valeurs a jour je l'enregistre dans le localstorage*/                    
                    localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
                    console.table(obsJsonlocalstorage);
/*Des que la condition a été reussi je n'ai pas besoin de reitéré la boucle, car je risque d'ajouter plusieurs produits a la fois voir meme de créer une boucle infini */                     
                    break;
                }

/*Si maintenant le nom d'article que j'envoie correspond a un nom d'article qui est deja dans le localstorage, je cherche si l'article si l'option n'existe pas.Et si c'est le cas je modifie la quantité de l'article et je rajoute une nouvelle option a l'article du localstorage*/
                    else if (valueSendToStorage.namearticle === obsJsonlocalstorage[k].namearticle && !obsJsonlocalstorage[k].numberofoptionarticle.find(optionarticleExists => optionarticleExists.optionarticle == valueSendToStorage.numberofoptionarticle[0].optionarticle))
                        {  
                        console.log("L'article existe déjà dans le panier? " + (valueSendToStorage.namearticle === obsJsonlocalstorage[k].namearticle) + " et l'option de personnalisation est différente? " + (!obsJsonlocalstorage[k].numberofoptionarticle.find(optionarticleExists => optionarticleExists.optionarticle == valueSendToStorage.numberofoptionarticle[0].optionarticle)));
                        console.log("Ici l'option de personnalisation n'existait pas on la rajoute dans le tableau de l'article");
/*c'est la variable qui calcule l'addition du */                        
                        let modifyValueSendToStorage =
                    {
                        namearticle : obsJsonlocalstorage[k].namearticle,
                        numberofoptionarticle : obsJsonlocalstorage[k].numberofoptionarticle,
                        pricearticle : parseInt(obsJsonlocalstorage[k].pricearticle) + parseInt(valueSendToStorage.pricearticle), 
                        quantityarticle : parseInt(obsJsonlocalstorage[k].quantityarticle) + parseInt(valueSendToStorage.quantityarticle)
                    };
                      let newnumberofoptionarticle = {
                        optionarticle : valueSendToStorage.numberofoptionarticle[0].optionarticle,
                        quantityoptionarticle : parseInt(valueSendToStorage.numberofoptionarticle[0].quantityoptionarticle) 
                      }
                        modifyValueSendToStorage.numberofoptionarticle.push(newnumberofoptionarticle);
                        obsJsonlocalstorage[k] = modifyValueSendToStorage;
                        localStorage.setItem('session', JSON.stringify(obsJsonlocalstorage));
                        console.table(obsJsonlocalstorage[k].numberofoptionarticle);
                        console.table(obsJsonlocalstorage);
                        break;
                }
              }
                
                }}
            }
                        obsJsonlocalstorage = JSON.parse(localStorage.getItem('session'));
                        let Numberofarticle = 0;
                        for (let i = 0; i < obsJsonlocalstorage.length; i++){
                             Numberofarticle += parseInt(obsJsonlocalstorage[i].quantityarticle); 
                        }
                        console.log(Numberofarticle);
                        document.getElementById("basketnumber").innerHTML = Numberofarticle;
        })
            }
            })

fetch("http://localhost:3000/api/furniture/")
.then( responsedfooter => {
 return responsedfooter.json()
} )
.then(produitfooter =>{
    console.table(produitfooter);
    let produitFooter = '';
    for (let i = 0; i < produitfooter.length; i++){
if (urlParams.get('id') !== produitfooter[i]._id) {
            produitFooter +=`
                <a href="produit.html?id=${produitfooter[i]._id}" class="asidectn verylowborder asidefooter"> 
                    <h4> ${produitfooter[i].name}</h4> 
                    <img src="${produitfooter[i].imageUrl}" />
                </a>`;}
        }
        document.getElementById("otherproduct-selection").innerHTML = produitFooter;
        
        ;});