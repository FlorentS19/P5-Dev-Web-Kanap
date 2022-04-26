//On récupére l'ID du produit dans le lien
let url = new URL(window.location.href);
let productId = url.searchParams.get("id");
console.log(productId);

//Requête vers l'API pour récupérer les données du produit.
const products = "http://localhost:3000/api/products/";

async function getArticle(id) {
  const catchArticles = await fetch(products + id)
    .then((catchArticles) => catchArticles.json())
    .then(function (data) {
      article = data;
    })
    .catch(function (err) {
      console.log(err);
    });
  return article;
}

//Intégration des données reçu sur la fiche produit
async function displayArticle(productId) {
  const article = await getArticle(productId);

  const productImg = document.getElementById("item__img_result");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  console.log(article.imageUrl)
  productImg.alt = article.altTxt;
  console.log(article.altTxt)

  const productTitle = document.getElementById("title");
  productTitle.innerHTML = article.name;
  console.log(article.name)

  const productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;
  console.log(article.price)

  const productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;
  console.log(article.description)

  //Boucle pour les couleurs disponibles du produit
  for (color of article.colors) {
    const productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = color;
    productColors.innerHTML = color;
  }
  console.log(article.colors);

  addToCart();
}
displayArticle(productId);

function addToCart() {
  
  //Définition des champs à renseigner
  const addBtn = document.getElementById("addToCart");
  const quantity = document.getElementById("quantity");
  const color = document.getElementById("colors");

  // Au clic, l'évènement s'effectue si les champs sont renseignés
  addBtn.addEventListener("click", () => {
    if (color.value == "" || quantity.value == 0 || quantity.value > 100) {
      
      //Alerte l'utilisateur si les conditions ne sont pas remplisse
      alert ('Veuillez renseigner une quantité comprise entre 1 et 100 et une couleur')
      return;
    }
      
    //Si les champs sont renseignés : stockage des données dans des variables
    else {
      let userProductId = productId;
      let userProductColor = color.value;
      let userProductQty = quantity.value;
      let userProductPrice = article.price;
      let userProductImgSrc = article.imageUrl;
      let userProductImgAlt = article.altTxt;
      let userProductName = article.name
      let userArticleId = userProductId + userProductColor;
      

      // Création d'un objet produit
      let userProductArray = {
        ArticleId: userArticleId,
        Name: userProductName,
        Id: userProductId,
        Color: userProductColor,
        Qty: userProductQty,
        Price: userProductPrice,
        ImgSrc: userProductImgSrc,
        ImgAlt: userProductImgAlt,
      };
      console.log(userProductArray)

      // Déclaration de la variable dans laquelle on met les keys et les values dans localstorage
      let productLocalStorage = JSON.parse(localStorage.getItem("Product"));
        console.log(productLocalStorage)

      // Comportement si il n'y a pas de produit dans localStorage
      if (productLocalStorage == null) {
        productLocalStorage = [];
        productLocalStorage.push(userProductArray);
        localStorage.setItem("Product",JSON.stringify(productLocalStorage));
        //alert("C'est cool, le produit est enregistré");
      }

      // Comportement si il y a un produit dans localStorage
      else if (productLocalStorage != null) {
        productLocalStorage.push(userProductArray);
        localStorage.setItem("Product", JSON.stringify(productLocalStorage));
      } console.log(productLocalStorage)
      
      /*let mappingProducts = productLocalStorage.find(
        (el) => el.Id === userProductId && el.Color === userProductColor);

      // Si la condition est vraie on additionne la quantité de l'objet du localStorage qui répond à la condition avec celle de la page en cours et on renvoie le tout au localStorage
      if (mappingProducts) {
        
        // On incrémente la quantité
        newQty = parseInt(mappingProducts.Qty) + parseInt(userProductQty);
        mappingProducts.Qty = newQty;

        // On l'enregistre dans le localStorage
        localStorage.setItem("Product", JSON.stringify(productLocalStorage));
        alert("C'est cool, le produit est enregistré");
      } else {
        
        // Dans tous les autres cas, on enregistre un nouvel objet dans le localStorage
        productLocalStorage.push(userProductArray);
        localStorage.setItem("Product", JSON.stringify(productLocalStorage));
        //alert("C'est cool, le produit est enregistré");
      }
      
      //Incrémentation des quantités, des produits identiques
      for (let i = 0; i < productLocalStorage.length; i++){
        if ((userProductArray.Color === productLocalStorage[i].Color) && (userProductArray.Id === productLocalStorage[i].Id)){
          
          productLocalStorage[i].Qty += parseInt(userProductArray.Qty);
          console.log(userProductArray.Qty)

          localStorage.setItem('Product',JSON.stringify(productLocalStorage))
        }
      } console.log(productLocalStorage.length)

      let check = productLocalStorage.some( e => e.Id === userProductArray.Id && e.Color === userProductArray.Color)
      console.log(check)
      console.log(productLocalStorage)
    
      if(!check){
        productLocalStorage.push(userProductArray)
        localStorage.setItem('Product', JSON.stringify(productLocalStorage))
      }*/
    }
  });
}