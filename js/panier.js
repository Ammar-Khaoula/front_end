function recupererPanier() {
    let basketArt = JSON.parse(localStorage.getItem("basketArt"));
   // for (commande in basketArt) {
    //basket est true
    if (basketArt) {
        document.querySelector("#content").innerHTML += `
          <div class="photoDeProduit panier" id="basketArt">
              <img class="image" src = ${basketArt.imageArticle} />
              <h2 class="nom">${basketArt.nom}</h2>
              <p>Options : ${basketArt.lentilles}</p>
              <p>Quantiter : ${basketArt.quantiter}</p>
              <p>Prix : ${basketArt.prix*basketArt.quantiter}</p>
              <button id="suprimer" class="btn2">suprimer</button>
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
        
}
recupererPanier();

//suprimer l'article de panier
let suprimer = document.querySelector("#suprimer");
if (suprimer) {
    suprimer.onclick = (e) => {
        e.preventDefault;
        //vider le localstorage
        localStorage.removeItem("basketArt");
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
}