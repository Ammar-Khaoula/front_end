//-----Recupere les objet de formulaire
let contact = JSON.parse(localStorage.getItem("contact"));
//-----Recupere le num de commande---------
const commandeId = localStorage.getItem("commandeId");
//---Injecter le Dom pour afficher le page de confirmation
const structureCommande = document.querySelector('#confirmationCommande');
let totalePrix = calculePrixPanier();
structureCommande.innerHTML += `
<div class="photoDeProduit panier" id="confirmation">
       <p id="confirmer">Merci de nous faire confiance!</p>
       <div><i class="fas fa-check-circle"></i></div>
       <p id="confirmers">Votre colis vous sera expédié dans les meilleurs délais</p>
       <p id="confirm">N° de commande :<span id="numDeCommende"> ${commandeId} </span></p>
       <div id="finalPrice">prix total : <span id="prixDeCommende"> ${totalePrix} €</span></div>
      </div>
`

//******supprime le local storage sauf formulaire****

function clearLocalStorage(key) {
    localStorage.removeItem(key);
};
clearLocalStorage("produit");
clearLocalStorage("commandeId");

