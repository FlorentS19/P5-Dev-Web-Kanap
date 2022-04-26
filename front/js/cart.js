//Récuperation du produit dans le panier
let productLocalStorage = JSON.parse(localStorage.getItem("Product"));


//Intégration HTML + des données produit sur la page
const parser = new DOMParser();
let productSection = document.getElementById("cart__items");
for (i = 0; i < productLocalStorage.length; i++) {
    let productItem = `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
            <img src="${productLocalStorage[i].ImgSrc}" loading="lazy" alt="${productLocalStorage[i].ImgAlt}">
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
  let priceProductCart = productLocalStorage[i].Price;
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


/* Suppression d'items

let deleteProduct = document.querySelectorAll(".deleteItem");
console.log(deleteProduct)

for (let i = 0; i < deleteProduct[i].length; i++){
  deleteProduct[i].addEventListener("click", (event) =>{
    event.preventDefault();

    let deleteIdSelect = productLocalStorage[i].Id;
    console.log(deleteIdSelect)


    //productLocalStorage = productLocalStorage.filter( el => el.)
    
  }
}*/