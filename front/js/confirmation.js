//Recuperation du lien et de l'orderId
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let orderId = urlParams.get("orderId");

//Insertion de l'orderId dans l'HTML
let orderNumber = document.querySelector("#orderId");
orderNumber.innerHTML = orderId;

//Suppression du localStorage
let removeStorage = window.localStorage;
removeStorage.clear();