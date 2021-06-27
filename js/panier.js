//------Recuperé le panier-----
/*let panierFinal = document.querySelector("#content");
let prixFinal   = document.querySelector("#priceFinal");
let basketFinal = recupererPanier();
if (basketFinal != null) {
    basketFinal.forEach((objet) => {
        panierFinal.innerHTML += `
        <div>${objet.name}</div>
        `
    });
}*/


function recupererPanier() {
    let basketArt = JSON.parse(localStorage.getItem("basketArt"));
   // for (commande in basketArt) {
    if (basketArt) {
        document.querySelector("#content").innerHTML += `
           <img src = ${basketArt.imageArticle} width="100px"/>
            <p>Nom : ${basketArt.nom}</p>
            <p>Lentilles : ${basketArt.lentilles}</p>
            <p>Quantiter : ${basketArt.quantiter}</p>
            <p>Prix : ${basketArt.prix}</p>
    `
    } else {
        document.querySelector("#content").innerHTML += `
        <img src ="panier.jpg" width="100px"/>
 `
    }
        //document.querySelector("#content").innerHTML += commande+": "+ basketArt[commande]+"<br/>";
   // }
        
}
recupererPanier();

let suprimer = document.querySelector("#suprimer");
if (suprimer) {
    suprimer.onclick = () => {
        localStorage.clear();
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