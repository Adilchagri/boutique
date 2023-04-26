let products = [
  {
    name: "chaise blanche",
    image: "images/chaiseblanche.jpg",
    price: 35,
    description: "product 1",
  },
  {
    name: "chaise blue",
    image: "images/chaisebleue.jpg",
    price: 42,
    description: "product 2",
  },
  {
    name: "chaise cuir",
    image: "images/chaisecuir.jpg",
    price: 15,
    description: "product 3",
  },
  {
    name: "chaise bois",
    image: "images/chaisebois.jpg",
    price: 25,
    description: "product 4",
  },
  {
    name: "chaise noire",
    image: "images/chaisenoire.jpg",
    price: 35,
    description: "product 5",
  },
  {
    name: "chaise rouge",
    image: "images/chaiserouge.jpg",
    price: 25,
    description: "product 6",
  },
  {
    name: "chaise plastique",
    image: "images/chaiseplastique.jpg",
    price: 23,
    description: "product 7",
  },
  {
    name: "chaise design",
    image: "images/chaisedesign.jpg",
    price: 22,
    description: "product 8",
  },
  {
    name: "boss",
    image: "images/Capture,boygraffity.PNG",
    price: 45,
    description: "product 9",
  },
];
let section = document.querySelector("section");
let search = document.querySelector(".search");

document.addEventListener("DOMContentLoaded", importElementsToDOM);
search.addEventListener("input", searchFunction);

function importElementsToDOM() {
  products.forEach(function (product) {
    let article = document.createElement("article");
    let articleContent = `
			<div class="product-name">${product.name}</div>
			<div class="border product-info">
				<img src="${product.image}" alt="" />
				<div class="price"><span>${product.price}</span> $</div>
      </div>
      <div class="product-details">
				<div class="border description">${product.description}</div>
				<div class="cart">
					<div class="counter">
						<input type="text" value="0" />
						<div class="btn-wrapper">
              <button class="plus">+</button>
              <button class="minus">-</button>
						</div>
          </div>
					<img class="buy" src="images/panier.jpg" alt="" />
				</div>
			</div>`
    article.innerHTML = articleContent;
    section.appendChild(article);

    article.querySelector(".cart").addEventListener("click", function (e) {
      let classes = e.target.className;

      if (classes.includes("plus")) incrementInput(article);
      if (classes.includes("minus")) decrementInput(article);
      if (classes.includes("buy")) addToCart(article);
    });
  });
}

function incrementInput(parentElement) {
  let itemCounter = parentElement.querySelector(".counter input");
  let addToCartBtn = parentElement.querySelector(".buy");
  if (parseInt(itemCounter.value) == 0) addToCartBtn.classList.toggle("can-add");
  itemCounter.value++;
}

function decrementInput(parentElement) {
  let itemCounter = parentElement.querySelector(".counter input");
  let addToCartBtn = parentElement.querySelector(".buy");
  if (parseInt(itemCounter.value) > 0) {
    itemCounter.value--;
    if (parseInt(itemCounter.value) == 0) addToCartBtn.classList.toggle("can-add");
  }
}

function addToCart(parentElement) {
  let itemCounter = parentElement.querySelector(".counter input");
  if (parseInt(itemCounter.value) <= 0) return;
  let items = document.querySelectorAll(".item");
  let itemsContainer = document.querySelector(".items");
  let productName = parentElement.querySelector(".product-name");
  let productImg = parentElement.querySelector(".product-info img");
  let productPrice = parentElement.querySelector(".price span");
  let item = document.createElement("div");
  item.className = "border item";
  let itemContent = `
			<img src="${productImg.src}" alt="" />
			<div class="item-name">${productName.textContent}</div>
			<div class="item-price">
        <span class="times">${itemCounter.value}x</span>
        <span class="number">${productPrice.textContent}</span>
      </div>
			<img class="delete" src="images/poubelle.jpg" />`;

  for (const loopedItem of items) {
    console.log(loopedItem);
    let itemName = loopedItem.querySelector(".item-name");
    if (itemName.textContent == productName.textContent) {
      console.log("yos");
      let itemTimes = loopedItem.querySelector(".times");
      itemTimes.textContent = `${itemCounter.value}x`;
      updateTotalPrice();

      return;
    }
  }
  item.innerHTML = itemContent;
  itemsContainer.appendChild(item);
  updateTotalPrice();
  item.querySelector(".delete").addEventListener("click", deleteItem);
}

function updateTotalPrice() {
  let items = document.querySelectorAll(".item");
  let totalPriceElm = document.querySelector(".total-price span");
  let totalPrice = 0;
  items.forEach(function (item) {
    let itemPrice = item.querySelector(".number");
    let itemTimes = item.querySelector(".times");
    totalPrice += parseInt(itemTimes.textContent) * parseInt(itemPrice.textContent);
  });
  totalPriceElm.textContent = totalPrice;
}

function deleteItem(e) {
  e.target.parentElement.remove();
  updateTotalPrice();
}

function searchFunction(e) {
  let value = e.target.value.toLowerCase();
  let articles = document.querySelectorAll("article");
  articles.forEach(function (article) {
    let productNameEml = article.querySelector(".product-name");
    let isVisible = productNameEml.textContent.toLowerCase().includes(value);
    article.classList.toggle("hide", !isVisible);
  });
}
