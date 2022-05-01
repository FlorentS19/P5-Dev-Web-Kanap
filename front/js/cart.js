//Récuperation du produit dans le panier
let productLocalStorage = JSON.parse(localStorage.getItem("Product"));
console.log(productLocalStorage);


//Intégration HTML + des données produit sur la page
const parser = new DOMParser();
let productSection = document.getElementById("cart__items");
for (i = 0; i < productLocalStorage.length; i++) {
    let productItem = `
    <article class="cart__item" data-id="${productLocalStorage[i].Id}" data-color="${productLocalStorage[i].Color}">
        <div class="cart__item__img">
            <img src="${productLocalStorage[i].imageUrl}" loading="lazy" alt="${productLocalStorage[i].altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${productLocalStorage[i].Name}</h2>
            <p>${productLocalStorage[i].Color}</p>
            <p>${productLocalStorage[i].Qty * productLocalStorage[i].Price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLocalStorage[i].Qty}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;
    const htmlString = parser.parseFromString(productItem,"text/html");
        productSection.appendChild(htmlString.body.firstChild);
}


//------------------------------Modification quantité input------------------------------//

let inputQty = document.querySelectorAll(".itemQuantity");
inputQty.forEach((tag)=> {
  
  let article = tag.closest("article");
  let id = article.dataset.Id;
  let color = article.dataset.Color;
  let newQuantity = "";
  tag.addEventListener("change", (event) =>{
    event.preventDefault();
    // nouvelle quantité que l'on souhaite mettre à jour dans le localStorage //
    newQuantity = Number(tag.value);
    console.log(newQuantity);
    productLocalStorage.forEach((product) =>{
      if (product.id === id && product.color === color){
        product.Qty = newQuantity;
        if(confirm("Souhaitez-vous modifier la quantité de cet article?")){
          // mettre à jour la quantité dans le localStorage = OK //
          localStorage.setItem("Product",JSON.stringify(productLocalStorage));
          // recharger la page pour mettre à jour le total prix et quantité du panier //
          document.location.reload();
        }
      }
    })
  })  
})

//------------------------------Calcul du prix total------------------------------//

//Déclaration de variable pour mettre les prix des produits
let totalCalculPrice = [];

//Récupération des prix dans le panier
for (let i = 0; i < productLocalStorage.length; i++){
  let priceProductCart = productLocalStorage[i].Price * productLocalStorage[i].Qty;
  totalCalculPrice.push(priceProductCart)
}


//Aditionner les prix dans la variable
const reducerPrice = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalCalculPrice.reduce(reducerPrice,0);
document.querySelector('#totalPrice').innerHTML = totalPrice;


//------------------------------Calcul de la quantité total------------------------------//

//Déclaration de variable pour mettre la quantité des produits
let totalCalculQty = [];

//Récupération des quantités dans le panier
for (let i = 0; i < productLocalStorage.length; i++){
  let quantityProductCart = productLocalStorage[i].Qty;
  totalCalculQty.push(quantityProductCart)
}

//Aditionner les quantités dans la variable
const reducerQty = (accumulator, currentValue) => accumulator + currentValue;
const totalQuantity = eval(totalCalculQty.join("+"));
document.getElementById("totalQuantity").innerHTML = totalQuantity;

console.log(reducerQty)
console.log(totalQuantity)
console.log(totalCalculQty)


//------------------------------Touche supprimer------------------------------//

//Suppression d'items

let deleteProduct = document.querySelectorAll(".deleteItem");
console.log(deleteProduct)

for (let i = 0; i < deleteProduct.length; i++){
  deleteProduct[i].addEventListener("click" , (event) =>{
    event.preventDefault();

    let deleteIdSelect = productLocalStorage[i].Id;
    productLocalStorage = productLocalStorage.filter( el => el.Id !== deleteIdSelect);
    
    localStorage.setItem("Product",JSON.stringify(productLocalStorage));

    alert("Le produit a bien etait supprimé du panier");
    window.location.href = "cart.html";
  })
}


//------------------------------Vérification des champs formulaire------------------------------//

const btnCommand = document.querySelector("#order");

btnCommand.addEventListener("click", (e) => {
  e.preventDefault();

  //Mettre les données du formulaire dans un objet
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value
  }
  console.log(contact)

  //Alertes des erreurs pour les problémes de saisie rencontré
  const textAlertName = (value) => {
    return `${value}: Le prénom et/ou le nom, ne doit contenir entre 2 et 20 caractères et ne doit pas contenir de caractères spéciaux`;
  }
  const textAlertAddress = (value) => {
    return `${value}: L'adresse doit comprendre un numéro, la voie ainsi que le nom de la voie`;
  }
  const textAlertCity = (value) => {
    return `${value}: Le nom de la ville doit contenir entre 3 et 20 caractères et ne pas contenir de caractères spéciaux`;
  }
  const textAlertEmail = (value) => {
    return `${value}: Le mail n'est pas valide`;
  }

  //Gestion de la validation des valeurs du nom, prénom et la ville
  const regExNameAndCity = (value) => {
    return /^[a-zA-Z]{3,20}$/.test(value);
  }

  //Validité du prénom
  function firstNameControl(){
    const checkFirstName = contact.firstName;
    if (regExNameAndCity(checkFirstName)) {
      return true;
    } else  {
      alert(textAlertName("Prénom"));
      return false;
    }
  }

  //Validité du nom
  function lastNameControl(){
    const checklastName = contact.lastName;
    if (regExNameAndCity(checklastName)) {
      return true;
    } else  {
      alert(textAlertName("Nom"));
      return false;
    }
  }

  //Validité de l'adresse
  function addressControl(){
    const checkaddress = contact.address;
    if (/^[a-zA-Z0-9\s]{5,50}$/.test(checkaddress)) {
      return true;
    } else  {
      alert(textAlertAddress("Adresse"));
      return false;
    }
  }

  //Validité de la ville
  function cityControl(){
    const checkcity = contact.city;
    if (regExNameAndCity(checkcity)) {
      return true;
    } else  {
      alert(textAlertCity("Ville"));
      return false;
    }
  }

  //Validité de l'adrese mail
  function emailControl(){
    const checkemail = contact.email;
    if (/^[\w_-]+@[\w-]+\.[a-z]{2,3}$/.test(checkemail)) {
      return true;
    } else  {
      alert(textAlertEmail("Email"));
      return false;
    }
  } 
  
  //Mettre l'objet "contact" dans localStorage
  if (firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()) {
  localStorage.setItem("Contact", JSON.stringify(contact));
  } else {
    alert("Veuillez remplir le formualire de contact")
  }

  //Assembler les objets Produits et Contact en un seul objet pour l'envoyer au serveur
  const sendObjects = {
    productLocalStorage,
    contact
  }

  
  //------------------------------Envoi sur serveur------------------------------//
  
  const options = {
    method: "POST",
    body: JSON.stringify(sendObjects),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log(options)
  fetch("http://localhost:3000/api/products/order", options)
    .then((res) => res.json())
    .then((data) => {
      // Renvoi de l'orderID dans l'URL
      //document.location.href = "confirmation.html?id=" + data.orderId;
    })
    .catch(function (err) {
      console.log("Erreur fetch" + err);
    });
})





// Envoi d'une requête POST à l'API

/*function postForm() {
  const orderBtn = document.getElementById("order");

  //Ecouter le bouton submit

  orderBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (productLocalStorage !== null) {
      let orderProducts = [];
      for (let i = 0; i < productLocalStorage.length; i++) {
        orderProducts.push(productLocalStorage[i].Id);
      }

      // Construction de l'objet attendu par l'API

      if (firstName && lastName && address && city && email) {
        const orderUserProduct = {
          contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
          },
          products: orderProducts,
        };

        // Requête POST

        const options = {
          method: "POST",
          body: JSON.stringify(orderUserProduct),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        fetch("http://localhost:3000/api/products/order", options)
          .then((res) => res.json())
          .then((data) => {
            // Renvoi de l'orderID dans l'URL
            //document.location.href = "confirmation.html?id=" + data.orderId;
          })
          .catch(function (err) {
            console.log("Erreur fetch" + err);
          });
      } else {
        alert("Veuillez renseigner le formulaire");
      }
    } else {
      alert("Votre Panier est vide");
    }
  });
}
postForm();*/