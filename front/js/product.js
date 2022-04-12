//On récupére l'ID dans le lien du produit
fetch("http://localhost:3000/api/products") 

  .then(data =>data.json())
    const queryString_url_id = window.location.search;

    const urlSearchParams = new URLSearchParams(queryString_url_id);
    console.log(urlSearchParams);

    const id = urlSearchParams.get("id");
    console.log(id);

//On récupére les infos du produit
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
//console.log(product)
product.then(function(result) {
  console.log(result)
})
//console.log(product.imageUrl)

let img = document.getElementById("item__img_result");
  img.src = product.imageUrl;
  img.alt = product.altTxt;
let title = document.getElementById("title");
  textcontent = product.name;
let description = document.getElementById("description");
  textcontent = product.description;

    //${products.altTxt}
    //${products.name}
    //${products.price}
    //${products.description};
