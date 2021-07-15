function getAllArticle ()
{
    //fetch("http://localhost:3000/api/cameras")
    fetch("https://projet5-backend.herokuapp.com/api/cameras")
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(produits) {
        let txt = "";
        produits.forEach(p => {
            // ******insertion en HTML*****
            let d = document.querySelector("#produit");
                
                txt = '<div class="menu-01">'
                txt += '<div class="name">'+p.name+'</div>';  
                txt += '<div><img width=400 src="' + p.imageUrl + '"/></div>';
                txt += '<div class="price">' + p.price + ' &euro;</div>';
            //----------Accéde au page produit------
                txt += '<div><a href="produit.html?id='+p._id+'">En savoir plus</a></div>';
                txt += '</div><br/>';

            d.innerHTML += txt;

        })                          
    })
    .catch(function(err) {
        console.error(err);
    });
}

            //...........Page_Produit.........
            
let prixInitial = 0;  //declarer le prix initial
let baskets;
function getOneArticle ()
{
    let url = new URLSearchParams(window.location.search);
    let id = url.get("id");
    //fetch("http://localhost:3000/api/cameras/"+id)
    fetch("https://projet5-backend.herokuapp.com/api/cameras/"+id)
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(produit) {        

        let txt = "";
        //selectioner le lentilles: option
        let lens = "";
        for (let i = 0; i < produit.lenses.length; i++)
        {
            let option = produit.lenses[i];

            lens += `<option value="${i}">${option}</option>`;
        }
        //***** modifie la div detail_produit de la page produit
        let photoProduit = document.querySelector("#photo-produit");
        let detailsProduit = document.querySelector("#details_produit");
        
        txt = '<div class="descriptionProduit">'//image de produit
        txt += `
                <div class="photoDeProduit">
                <img  class="image" src="${produit.imageUrl}"/>
                </div>
           `            
            //detaille de produit
            txt += `
                <div class="photoDeProduit">
                    <h2 class="nom">${produit.name}</h2>
                    <p class="discription">${produit.description}</p>
                  <form method="GET" action="panier.html";>
                    <label class="text" for="quantitDeProduit">Quantité</label>
                    <input id="quantitDeProduit" type="number" onclick="getTotalPrice();"  min="1" value="1"><br>
                    <label class="text" for="optionsDeProduit">Options</label>
                    <select id="lensSelect">${lens}</select>
                    <h3 class="prix">prix total: <span id="totalPrice">${produit.price}</span></h3>
                    <button id="panierBtn" class="btn2">AJOUTER AU PANIER</button>
                  </form>
                </div>
            `
        txt += '</div>';
        photoProduit.innerHTML += txt;
        prixInitial = produit.price;//appeler le prix initial
                    
                      //-------panier-------
        //--ecoute le boutton--
        panierBtn.addEventListener("click", () => {
            ajoutPanier(produit);
        });     
    })
        
.catch(function(err) {
        
});
}
// ---function pour ajouter les produits selectioner dans localstorage
function ajoutPanier(produit) {
    let cs = document.querySelector("#lensSelect");
    let qte = document.getElementById('quantitDeProduit').value;
    const donneArt = {
        _id: produit._id,
        imageArticle: produit.imageUrl,
        nom: produit.name,
        lentilles: cs.options[cs.selectedIndex].text,
        quantiter: qte,
        prix: produit.price * qte,                
    };
//-----------------------local storage-----------------------//
//déclarer la variable "ajoutLocalStorage" dans localstorage
let ajoutLocalStorage = JSON.parse(localStorage.getItem("produit"));
    
//--Fonction ajoute un produit au localeStorage
    const ajoutProduitLocalStorage = () => {
        ajoutLocalStorage = getLocalStorage(donneArt, ajoutLocalStorage);
        localStorage.setItem("produit", JSON.stringify(ajoutLocalStorage));    
};
//s'il ya deja de produits d'enregistré dans le local storage
if (ajoutLocalStorage) {
    ajoutProduitLocalStorage();
}
    
//s'il n'ya pas deja de produits d'enregistré dans le local storage
else {
    ajoutLocalStorage = [];
    ajoutProduitLocalStorage();
}    
}
 //-------Fonction ajoute un produit au panier
function getLocalStorage(data, locaStorage) {
    let produitTmp = locaStorage.filter(element => element._id == data._id);
    if (produitTmp.length !== 0) {
        data.quantiter = parseInt(data.quantiter) + parseInt(produitTmp[0].quantiter);
        data.prix = parseFloat(data.prix) + parseFloat(produitTmp[0].prix);
        locaStorage.pop(produitTmp);
    }
    locaStorage.push(data);
    return locaStorage;
}

//-----------------calculer les prix------------
function getTotalPrice() { 
    let quantite = document.querySelector('#quantitDeProduit').value;
    document.querySelector('#totalPrice').innerHTML = calculeTotal(prixInitial, quantite) + " &euro;";
}

function calculeTotal(prixUnite, quntite) {
    return prixUnite * quntite; 
}

//-------test unitaire----
function calculTotalTest(p, q) {
//---doit retourner prix(p) * quantité(q)
    return p * q;
}


