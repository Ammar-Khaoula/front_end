let isPanier = true;
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
    if (basketArt != null) {
        basketArt.innerHTML = panierVide; 
    }
   
}
// si le panier n'est pas vide
else {
    for (i = 0; i < ajoutLocalStorage.length; i++){
        panierProduit = panierProduit + `
        <div class="photoDeProduit panier">
              <img class="image" src = ${ajoutLocalStorage[i].imageArticle} />
              <h2 class="nom">${ajoutLocalStorage[i].nom}</h2>
              <table>
              <tr><td class="style">Options : </td><td class="style">${ajoutLocalStorage[i].lentilles}</td></tr>
              <tr><td class="style">Quantité : </td><td class="style">${ajoutLocalStorage[i].quantiter}</td></tr>
              <tr><td class="style">Prix : </td><td class="style">${ajoutLocalStorage[i].prix} €</td></tr>
              </table>
              <button id="suprimer" class="btn2 btnSupprimer">supprimer</button>
          </div>
        `;
    }
        if (i == ajoutLocalStorage.length && basketArt != null) {
            basketArt.innerHTML = panierProduit;
        }        
}
btnSuprimerArticle(ajoutLocalStorage);

//------------------function de CALCULER LES PRIX DES PRODUITS TOTALES de panier-----
function calculePrixPanier() {
    let totalPanier = 0;
    for (let p = 0; p < ajoutLocalStorage.length; p++){
        totalPanier += ajoutLocalStorage[p].prix;
    }
    
    return totalPanier;
}
//--------AFICHIER LE PRIX SUR PAGE WEB
const affichePrix = '<div class="affichePrix">le prix total est : '+calculePrixPanier()+' €</div>'
if (basketArt != null) {
    basketArt.insertAdjacentHTML("beforeend", affichePrix);
}
 //-----------Validation de formulaire----------
//on cible le bouton du formulaire et attache une fonction 
const formulairePanier = document.querySelector('#formulaire');
if (formulairePanier != null) {
    formulairePanier.addEventListener("click", function () {
        var valid = true;
        for (let input of document.querySelectorAll(".form input")) {   
            valid &= input.reportValidity();
            if (!valid) {
                break;
            }
        }
    
    }); 
}
    /*************VALIDATION FORMULAIRE******************/

const lastname = document.getElementById('nom');
const firstname = document.getElementById('prenom');
const address = document.getElementById('adresse');
const city = document.getElementById('ville');
const mail = document.getElementById('email');

if (formulairePanier != null) {
    
 formulairePanier.addEventListener("submit", (e) => {
    e.preventDefault()
    if (ajoutLocalStorage == 0) {
        alert("votre panier est vide");
    }
    else {
        //----cameras en tant que tableau à envoyer en POST
        const products = [];

        ajoutLocalStorage.forEach((camera) => {
            products.push(camera._id);
            console.table(products);
        });
         // utilisateur à envoyer en objet en POST
         let contact = {
            firstName: firstname.value,
            lastName: lastname.value,
            address: address.value,
            city: city.value,
            email: mail.value,
        };
        localStorage.setItem("contact", JSON.stringify(contact));
        // crée donnees comme objet contact + tableau products
        const donnees = { contact, products };
         // en-têtes pour la requête (dire qu'elle est POST et non GET)
         const options = {
            method: "POST",
            body: JSON.stringify(donnees),
            headers: {
                "Content-Type": "application/json",
            },
        };
       
         // la requête POST en elle-même
         fetch("https://projet5-backend.herokuapp.com/api/cameras/order", options)
         // reçoit les données du back
         .then(response => { 
             if (response.ok) {
                 return response.json() // Si response ok, retourne un objet json
             } else {
                 Promise.reject(response.status); // sinon, me retroune la cause de l'echec
             };
         })

         // traitement pour l'obtention du numéro de commmande
         .then((dataPost) => {
             let orderId = dataPost.orderId;
             //--ajouter le num de commande au local storage--
             localStorage.setItem("commandeId", orderId);
             //orderId = 'kOUKOU';
             if (!isValidOrderNumber(orderId)) {
                 alert('le numéro de commande n\'est pas valide');
            }
             if (orderId == undefined) {
                 alert("Tous les champs doivent êtres remplis")

             } else {
                 window.location.href = 'confirmation.html';
             }

         })

         .catch((error) => {
             alert(error);
         });

    }
});
}

function isValidOrderNumber(id) {
    if (id.length != 36)
        return false;
    
    return true;
}


function btnSuprimerArticle(locaStoragePanier) {
    // selection tous les bouton suprimer les article des pagnier
let btn_suprimer = document.querySelectorAll(".btnSupprimer");
for (let j = 0; j < btn_suprimer.length; j++){
    btn_suprimer[j].addEventListener("click", (e) => {
        e.preventDefault();
        locaStoragePanier = suprimerArticle(locaStoragePanier, locaStoragePanier[j]);
//ENVOYER AU LOCALSTORAGE
        localStorage.setItem("produit", JSON.stringify(locaStoragePanier));
//alerte pour avertir que le produit est supprimer
        alert("ce produit a été supprimer du panier");
        window.location.href = "panier.html";
    });
}
}
function suprimerArticle(localStoragePanier, article) {
    //SELECTIONER id DE PRODUIT SUPPRIMER
    let id_selectioner = article._id;
    //suprimer article lorsqu'on click sur btn supprimer Methode filtrer: chercher tous el qui dans localstorage 
            localStoragePanier = localStoragePanier.filter(
                element => element._id !== id_selectioner);
    return localStoragePanier;
}
 