//Récuperation des produits dans le panier
let productLocalStorage = JSON.parse(localStorage.getItem("Product"));



//Intégration HTML + des données produit sur la page
const parser = new DOMParser();
let productSection = document.getElementById("cart__items");
for (i = 0; i < productLocalStorage.length; i++) {
  let produitEnCours = fetch("http://localhost:3000/api/products/")
      .then((res) => { return res.json();})
      .then ((res) => console.log(res[i]._id));
    
  let productItem = `
    <article class="cart__item" data-id="${productLocalStorage[i].Id}" data-color="${productLocalStorage[i].Color}">
        <div class="cart__item__img">
            <img src="${produitEnCours.imageUrl}" loading="lazy" alt="${produitEnCours.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${produitEnCours.Name}</h2>
            <p>${productLocalStorage[i].Color}</p>
            <p>${produitEnCours.Price} €</p>
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
totalOrder();


//------------------------------Modification quantité input------------------------------//

let inputQty = document.querySelectorAll(".itemQuantity");

for (let i = 0; i < inputQty.length; i++) {
  inputQty[i].addEventListener("change", function (event) {
    event.preventDefault();

    productLocalStorage[i].Qty = event.target.value;

    if (
      productLocalStorage[i].Qty == 0 ||
      productLocalStorage[i].Qty > 100
    ) {
      alert('Veuillez sélectionner une quantité comprise entre 1 et 100');
      window.location.reload();
    } else {
      localStorage.setItem("Product", JSON.stringify(productLocalStorage));
      totalOrder()
    }
  });
}

function totalOrder() {


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


  //------------------------------Calcul du prix total------------------------------//

  //Déclaration de variable pour mettre les prix des produits
  let totalCalculPrice = [];

  //Récupération des prix dans le panier
  for (let i = 0; i < productLocalStorage.length; i++){
    let produitEnCours = fetch("http://localhost:3000/api/products/")
    .then((res) => { return res.json();})
    .catch(function (err) {
      console.log("Erreur fetch" + err);
    });
    let priceProductCart = produitEnCours.Price * productLocalStorage[i].Qty;
    totalCalculPrice.push(priceProductCart)
  }


  //Aditionner les prix dans la variable
  const reducerPrice = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = totalCalculPrice.reduce(reducerPrice,0);
  document.querySelector('#totalPrice').innerHTML = totalPrice;
}


//------------------------------Touche supprimer------------------------------//

//Suppression d'items

let deleteProduct = document.querySelectorAll(".deleteItem");

for (let i = 0; i < deleteProduct.length; i++){
  deleteProduct[i].addEventListener("click" , (event) =>{
    event.preventDefault();

    let deleteIdSelect = productLocalStorage[i].ArticleId;
    productLocalStorage = productLocalStorage.filter( el => el.ArticleId !== deleteIdSelect);
    
    localStorage.setItem("Product",JSON.stringify(productLocalStorage));

    alert("Le produit a bien etait supprimé du panier");
    window.location.href = "cart.html";
  })
}


//------------------------------Vérification des champs formulaire------------------------------//

const btnCommand = document.querySelector("#order");

btnCommand.addEventListener("click", (e) => {
  e.preventDefault();

  //Recuperation des ID a envoyer depuis localStorage
  let products = [];
  for(i = 0; i < productLocalStorage.length; i++){
    products.push(productLocalStorage[i].Id)
  }

  //Mettre les données du formulaire dans un objet
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value
  }
  console.log(contact)
  console.log(products)

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
  let formulaireOk = false;
  if (firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()) {
    formulaireOk = true;
  localStorage.setItem("Contact", JSON.stringify(contact));
  } else {
    alert("Veuillez remplir le formualire de contact")
  }

  //Assembler les objets Produits et Contact en un seul objet pour l'envoyer au serveur
  const sendObjects = {
    products,
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

  if (formulaireOk){
    fetch("http://localhost:3000/api/products/order", options)
      .then((res) => { return res.json();})
      .then((data) => {
        const orderId = data.orderId;
        //Envoie vers la page de confirmation
        window.location.href = 'confirmation.html' + '?orderId=' + orderId;
      })
      .catch(function (err) {
        console.log("Erreur fetch" + err);
      });
  }
})