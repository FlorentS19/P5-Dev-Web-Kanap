//Récuperation du produit dans le panier
let productLocalStorage = JSON.parse(localStorage.getItem("Product"));


//Intégration HTML + des données produit sur la page
const parser = new DOMParser();
let productSection = document.getElementById("cart__items");
for (i = 0; i < productLocalStorage.length; i++) {
    let productItem = `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
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

//Modification de la quantité des produits avec addEventListener change


function getUserForm() {
  let inputs = document.querySelectorAll("input");

  // Gestion des erreurs

  const errorDisplay = (tag, message, valid) => {
    const displayErrorMessage = document.querySelector("#" + tag + "ErrorMsg");
    if (!valid) {
      displayErrorMessage.textContent = message;
    } else {
      displayErrorMessage.textContent = "";
    }
  };

  // Validation des champs via comparaison Regex

  const firstNameChecker = (value) => {
    if (value.length > 0 && (value.length < 2 || value.length > 20)) {
      errorDisplay(
        "firstName",
        "Le prénom doit contenir entre 2 et 20 caractères"
      );
      firstName = null;
    } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
      errorDisplay(
        "firstName",
        "Le prénom ne doit pas contenir de caractères spéciaux"
      );
      firstName = null;
    } else {
      errorDisplay("firstName", "", true);
      firstName = value;
    }
  };

  const lastNameChecker = (value) => {
    if (value.length > 0 && (value.length < 2 || value.length > 20)) {
      errorDisplay(
        "lastName",
        "Le nom de famille doit contenir entre 2 et 20 caractères"
      );
      lastName = null;
    } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
      errorDisplay(
        "lastName",
        "Le nom de famille ne doit pas contenir de caractères spéciaux"
      );
      lastName = null;
    } else {
      errorDisplay("lastName", "", true);
      lastName = value;
    }
  };

  const addressChecker = (value) => {
    if (value.length > 0 && (value.length < 2 || value.length > 50)) {
      errorDisplay(
        "address",
        "L'adresse doit contenir entre 2 et 20 caractères"
      );
      address = null;
    } else if (
      !value.match(
        /^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$/
      )
    ) {
      errorDisplay(
        "address",
        "L'adresse doit comprendre un numéro, la voie, le nom de la voie ainsi que le code postal et la ville"
      );
      address = null;
    } else {
      errorDisplay("address", "", true);
      address = value;
    }
  };

  const cityChecker = (value) => {
    if (value.length > 0 && (value.length < 2 || value.length > 20)) {
      errorDisplay(
        "city",
        "Le nom de la ville doit contenir entre 2 et 20 caractères"
      );
      city = null;
    } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
      errorDisplay(
        "city",
        "Le nom de la ville ne doit pas contenir de caractères spéciaux"
      );
      city = null;
    } else {
      errorDisplay("city", "", true);
      city = value;
    }
  };

  const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      errorDisplay("email", "Le mail n'est pas valide");
      email = null;
    } else {
      errorDisplay("email", "", true);
      email = value;
    }
  };

  // Ecoute des champs du formulaire

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "firstName":
          firstNameChecker(e.target.value);

          break;
        case "lastName":
          lastNameChecker(e.target.value);

          break;
        case "address":
          addressChecker(e.target.value);

          break;
        case "city":
          cityChecker(e.target.value);

          break;
        case "email":
          emailChecker(e.target.value);
        default:
          null;
      }
    });
  });
}
getUserForm();

// Envoi d'une requête POST à l'API

function postForm() {
  const orderBtn = document.getElementById("order");

  //Ecouter le bouton submit

  orderBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (productLocalStorage !== null) {
      let orderProducts = [];
      for (let i = 0; i < productLocalStorage.length; i++) {
        orderProducts.push(productLocalStorage[i].userProductId);
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
            document.location.href = "confirmation.html?id=" + data.orderId;
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
postForm();