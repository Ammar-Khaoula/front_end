let ajoutLocalStorage = JSON.parse(localStorage.getItem("produit"));

//--------------AFFICHIER LE PRODUIT AU PANIER------
const basketArt = document.querySelector("#container");
let panierProduit = [];
//si le panier est vide 
if(ajoutLocalStorage === null || ajoutLocalStorage == 0){
    const panierVide = `
    <div class="photoDeProduit panier">
        <img class="panierVide" src ="panier.png"/>
        <p> votre panier est vide</p>
    </div>
    `
    basketArt.innerHTML = panierVide;
}
// si le panier n'est pas vide
else {
    for (i = 0; i < ajoutLocalStorage.length; i++){
        panierProduit = panierProduit + `
        <div class="photoDeProduit panier" id="basketArt">
              <img class="image" src = ${ajoutLocalStorage[i].imageArticle} />
              <h2 class="nom">${ajoutLocalStorage[i].nom}</h2>
              <p>Options : ${ajoutLocalStorage[i].lentilles}</p>
              <p>Quantité : ${ajoutLocalStorage[i].quantiter}</p>
              <p>Prix : ${ajoutLocalStorage[i].prix*ajoutLocalStorage[i].quantiter} €</p>
              <button id="suprimer" class="btn2 btnSupprimer">supprimer</button>
          </div>
        `;
    }
        if (i == ajoutLocalStorage.length) {
            basketArt.innerHTML = panierProduit;
        }        
}

// selection tous les bouton suprimer les article des pagnier
let btn_suprimer = document.querySelectorAll(".btnSupprimer");
console.log(btn_suprimer);
for (let j = 0; j < btn_suprimer.length; j++){
    btn_suprimer[j].addEventListener("click", (e) => {
        e.preventDefault();
//SELECTIONER id DE PRODUIT SUPPRIMER
        let id_selectioner = ajoutLocalStorage[j]._id;
//suprimer article lorsqu'on click sur btn supprimer Methode filtrer: chercher tous el qui dans localstorage 
        ajoutLocalStorage = ajoutLocalStorage.filter(
            element => element._id !== id_selectioner);
//ENVOYER AU LOCALSTORAGE
        localStorage.setItem("produit", JSON.stringify(ajoutLocalStorage));
//alerte pour avertir que le produit est supprimer
        alert("ce produit a été supprimer du panier");
        window.location.href = "panier.html";
    });
}
//------------------CALCULER LES PRIX DES PRODUITS TOTALES-----
//déclaration de variable pour mettres les prixqui sont presente dans le panier
let prixTotaleDePanier = [];
//chercher les prix dans le panier
for (let p = 0; p < ajoutLocalStorage.length; p++){
    let prixProduitPanier = ajoutLocalStorage[p].prix;
//metre les prix dans la variable
    prixTotaleDePanier.push(prixProduitPanier);
}
//--ADITIONNER LE PRIX
const reducer = (accumulator, currenValue) => accumulator + currenValue;
const prixPanier = prixTotaleDePanier.reduce(reducer, 0);
console.log(prixPanier);
//--------AFICHIER LE PRIX SUR PAGE WEB
const affichePrix = `
<div class='affochePrix'>le prix total est : ${prixPanier} €</div>
`
basketArt.insertAdjacentHTML("beforeend", affichePrix);
//function recupererPanier() {
/*let basketArt = JSON.parse(localStorage.getItem("data"));
   // for (commande in basketArt) {
    //basket est true
if (basketArt != null) {
    document.querySelector("#content").innerHTML +=
         `
          <div class="photoDeProduit panier" id="basketArt">
              <img class="image" src = ${basketArt.imageArticle} />
              <h2 class="nom">${basketArt.nom}</h2>
              <p>Options : ${basketArt.lentilles}</p>
              <p>Quantité : ${basketArt.quantiter}</p>
              <p>Prix : ${basketArt.prix*basketArt.quantiter}</p>
              <button id="suprimer" class="btn2">supprimer</button>
          </div>
    `
    } else {
        document.querySelector("#content").innerHTML += `
        <div class="photoDeProduit panier">
        <img class="panierVide" src ="panier.png"/>
        <p> votre panier est vide</p>
        </div>
 `
    }
        //document.querySelector("#content").innerHTML += commande+": "+ basketArt[commande]+"<br/>";
   // }
        
//}
//recupererPanier();

//suprimer l'article de panier
let suprimer = document.querySelector("#suprimer");
if (suprimer) {
    suprimer.onclick = (e) => {
        e.preventDefault;
        //vider le localstorage
        localStorage.removeItem("basketArt");
        //window.reload();
        //alert("le panier est vide");
    }
}


//confirmation le commande-------
let btnComfirme = document.querySelector("#btnComende");
if (btnComfirme) {
    btnComfirme.addEventListener("click", () => {
        //stoker le donnée
        localStorage.setItem("prenom", document.querySelector("#prenom").value);

    });
}
function confirmation() {
        //recuperer le donnée
        const contact = localStorage.getItem("prenom");
        console.log(contact);
        const addPrenom = document.getElementById('formName');
        console.log("prenom : " + addPrenom);
        addPrenom.innerHTML = contact;
        console.log(contact);
}*/