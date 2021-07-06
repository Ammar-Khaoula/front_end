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
              <table>
              <tr><td class="style">Options : </td><td class="style">${ajoutLocalStorage[i].lentilles}</td></tr>
              <tr><td class="style">Quantité : </td><td class="style">${ajoutLocalStorage[i].quantiter}</td></tr>
              <tr><td class="style">Prix : </td><td class="style">${ajoutLocalStorage[i].prix} €</td></tr>
              </table>
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
//--------AFICHIER LE PRIX SUR PAGE WEB
const affichePrix = `
<div class='affochePrix'>le prix total est : ${prixPanier} €</div>
`
basketArt.insertAdjacentHTML("beforeend", affichePrix);

  //-----------Validation de formulaire----------
//on cible le bouton du formulaire et attache une fonction 
document.querySelector('#formulaire').addEventListener("click", function () {
    var valid = true;
    for (let input of document.querySelectorAll(".form input")) {

        valid &= input.reportValidity();
        if (!valid) {
            break;
        }
    }

});
    /*************VALIDATION FORMULAIRE******************/

const lastname = document.getElementById('nom');
const firstname = document.getElementById('prenom');
const address = document.getElementById('adresse');
const city = document.getElementById('ville');
const mail = document.getElementById('email');

const form = document.querySelector("#formulaire");
form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (ajoutLocalStorage == 0) {
        alert("votre panier est vide");
    }
    else {
        //----cameras en tant que tableau à envoyer en POST
        const products = [];

        ajoutLocalStorage.forEach((camera) => {
            products.push(camera._id);
            console.table(products)
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
        console.log(donnees)
         // la requête POST en elle-même
         fetch(" https://projet5-backend.herokuapp.com/api/cameras/order", options)
         // reçoit les données du back
         .then(response => { // me renvoie un premiere prommesse
             if (response.ok) {
                 return response.json() // Si response ok, retourne un objet json
             } else {
                 Promise.reject(response.status); // sinon, me retroune la cause de l'echec
             };
         })

         // traitement pour l'obtention du numéro de commmande
         .then((dataPost) => {
             const orderId = dataPost.orderId;

             if (orderId == undefined) {
                 alert("Tous les champs doivent êtres remplis")
             } else {
                 window.location.href = `confirmation.html?ncomm=${orderId}`;
             }

         })

         .catch((error) => {
             alert(error);
         });
    }
});

