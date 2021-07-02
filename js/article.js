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

            console.log(p);

            // ATTENTION: ici on modifie la div produit de la page index
            let d = document.querySelector("#produit");
                
                txt = '<div class="menu-01">'
                txt += '<div class="name">'+p.name+'</div>';  
                txt += '<div><img width=400 src="' + p.imageUrl + '"/></div>';
                txt += '<div class="price">'+p.price+' &euro;</div>';
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
        //selectioner le lentilles
        let lens = "";
        for (let i = 0; i < produit.lenses.length; i++)
        {
            let option = produit.lenses[i];

            lens += `<option value="${i}">${option}</option>`;
            //console.log(produit.lenses[i]);
        }
        //console.log(lens);
        
        //ici on modifie la div detail_produit de la page produit
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
                    <input id="quantitDeProduit" type="number" onclick="calculPrix();"  min="1" value="1"><br>
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
            let cs = document.querySelector("#lensSelect");
            const donneArt = {
                _id: produit._id,
                imageArticle: produit.imageUrl,
                nom: produit.name,
                lentilles: cs.options[cs.selectedIndex].text,
                quantiter: quantitDeProduit.value,
                prix: produit.price / 100,                
            };
    //-----------------------local storage-----------------------//
    //déclarer la variable "ajoutLocalStorage" dans localstorage
        let ajoutLocalStorage = JSON.parse(localStorage.getItem("produit"));
            
    //--Fonction ajoute un produit au localeStorage
        const ajoutProduitLocalStorage = () => {
            ajoutLocalStorage.push(donneArt);
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
        });     
    })
        
.catch(function(err) {
        
});
}
     //calculer les prix
function calculPrix() {

    document.querySelector('#totalPrice').innerHTML = prixInitial * document.querySelector('#quantitDeProduit').value+" &euro;";   
}


