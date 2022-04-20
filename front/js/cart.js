//Récuperation du produit dans le panier

let addProduct = JSON.parse(localStorage.getItem("Product"));

const panierDisplay = async () => {
    if(addProduct) {
        await addProduct;
        console.log(addProduct);
    }
}
panierDisplay();

const parser = new DOMParser();
let productSection = document.getElementById("cart__items");
for (i = 0; i < addProduct.length; i++) {
    let productItem = `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
            <img src="${addProduct.imageUrl}" loading="lazy" alt="${addProduct.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${addProduct.name}</h2>
            <p></p>
            <p>${addProduct.price}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>${addProduct.quantity}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">${addProduct.quantity * addProduct.price}
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;
    console.log()
    const htmlString = parser.parseFromString(productItem,"text/html");
        productSection.appendChild(htmlString.body.firstChild);
}