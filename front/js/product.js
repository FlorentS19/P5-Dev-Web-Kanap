//On récupére l'ID dans le lien du produit
fetch("http://localhost:3000/api/products") 

  .then(data =>data.json())
    const queryString_url_id = window.location.search;

    const urlSearchParams = new URLSearchParams(queryString_url_id);
    console.log(urlSearchParams);

    const id = urlSearchParams.get("id");
    console.log(id);

//On récupére les infos du produit
//let info = fetch("http://localhost:3000/api/products/" + id);
//console.log(info);

async function getProduct() {
  return await fetch("http://localhost:3000/api/products/"+ id)
      .then(function (res) {
          return res.json();
      })
      .catch(function (err) {
          console.log(err);
      });
}

const product = getProduct();

console.log(product)
console.log(product[0].imageUrl)

let img = document.getElementById("item__content_img");
  img.src = product.imageUrl;

    //${products.altTxt}
    //${products.name}
    //${products.price}
    //${products.description};
