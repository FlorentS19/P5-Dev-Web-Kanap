/*On récupére l'API des produits*/
allProducts();
async function getProducts() {
    return await fetch("http://localhost:3000/api/products")
        .then(function (res) {
            return res.json();
        })
        .catch(function (err) {
            console.log(err);
        });
}

/*On intégre les produits a la page d'acceuil*/
async function allProducts() {
    const parser = new DOMParser();
    const products = await getProducts();
    let productsSection = document.getElementById("items");
    for (i = 0; i < products.length; i++) {
        let productsItems = `
            <a href="./product.html?id=${products[i]._id}">
            <article>
            <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
            <h3 class="productName">${products[i].name}</h3>
            <p class="productDescription">${products[i].description}</p>
            </article>
            </a>`;
        const htmlString = parser.parseFromString(productsItems,"text/html");
        productsSection.appendChild(htmlString.body.firstChild);
    }
    
    console.log("allProducts", products)
}