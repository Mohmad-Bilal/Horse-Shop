let productsINCart = localStorage.getItem("cartProducts");

let productsInPage = document.querySelector(
  "section .cart-container .cart-products"
);

if (productsINCart) {
  let items = JSON.parse(productsINCart);
  drawProducts(items);
  totalPrice();
}

function drawProducts(items) {
  if (localStorage.getItem("email")) {
    let products = items.map((item) => {
      return `          <div class="col-6 cart-item" data-id="${item.id}">
            <div class="card mb-3 m-auto custom-card2" style="max-width: 540px">
              <div class="row g-0">
                <div class="col-4">
                  <img
                    src="${item.imageUrl}"
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div class="col-4 mt-3">
                  <h5>${item.title}</h5>
                  <p>category: ${item.category}</p>
                  <p class="item-price">price: $${
                    item.price * item.quantity
                  }</p>
                  <div class="cart-buttons">
                    <button class="btn btn-outline-danger" id="minus">
                      <i class="fas fa-minus"></i>
                    </button>
                    <span class="mx-2 quantity">${item.quantity}</span>
                    <button class="btn btn-outline-success" id="plus">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="col-4">
                  <button class="btn btn-danger cart-remove-btn" onClick = removeFromCart(${
                    item.id
                  })>
                    Remove from cart
                  </button>
                </div>
              </div>
            </div>
          </div>`;
    });
    productsInPage.innerHTML = products.join("");
    plusAndMinus();
  }
}

function plusAndMinus() {
  let cartItems = document.querySelectorAll(".cart-item");

  cartItems.forEach((item) => {
    let id = parseInt(item.dataset.id);
    let plusBtn = item.querySelector("#plus");
    let minusBtn = item.querySelector("#minus");
    let quantitySpan = item.querySelector(".quantity");

    plusBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cartProducts"));
      let product = cart.find((item) => item.id === id);
      product.quantity++;
      quantitySpan.textContent = product.quantity;

      let priceElement = item.querySelector(".item-price");
      priceElement.textContent = `price: $ ${product.price * product.quantity}`;

      localStorage.setItem("cartProducts", JSON.stringify(cart));
      totalPrice();
    });

    minusBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cartProducts"));
      let product = cart.find((item) => item.id === id);

      if (product.quantity > 1) {
        product.quantity--;
        quantitySpan.textContent = product.quantity;

        let priceElement = item.querySelector(".item-price");
        priceElement.textContent = `price: $ ${
          product.price * product.quantity
        }`;
      } else {
        cart = cart.filter((item) => item.id !== id);

        item.remove();
      }

      localStorage.setItem("cartProducts", JSON.stringify(cart));
      totalPrice();
    });
  });
}

function totalPrice() {
  let cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  let totalPrice = 0;

  cart.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  let totalPriceDiv = document.querySelector("h3");

  totalPriceDiv.textContent = `Total Price: $${totalPrice}`;
}

function removeFromCart(id) {
  let itemToRemove = document.querySelector(
    `.cart-products div[data-id= "${id}"]`
  );

  if (itemToRemove) {
    itemToRemove.remove();
  }

  let item = JSON.parse(localStorage.getItem("cartProducts"));

  item = item.filter((item) => item.id !== id);
  localStorage.setItem("cartProducts", JSON.stringify(item));
  totalPrice();
}

let favoriteProducts = localStorage.getItem("favoriteProducts");

let favoriteProductsInPage = document.querySelector(
  ".fav-container .favorite-container"
);

if (favoriteProducts) {
  let favoriteItems = JSON.parse(favoriteProducts);
  drawFavoriteProducts(favoriteItems);
}

function drawFavoriteProducts(favoriteItems) {
  let products = favoriteItems.map((item) => {
    return `        <div class="card m-2  custom-card3" style="width: 18rem;" data-id="${item.id}">
          <img src="${item.imageUrl}" alt=""  />
          <div class="card-body ">
            <h5 class="card-title text-center  ">${item.title}</h5>
            <p class="text-center">Category: ${item.category}</p>
            <i
              class="fas fa-heart text-danger text-center "
              id="favBtn"
              style="display: block"
              onClick = removeFromFavorite(${item.id})
            ></i>
          </div>
        </div>`;
  });
  favoriteProductsInPage.innerHTML = products.join("");
}
function removeFromFavorite(id) {
  let itemToRemove = document.querySelector(
    `.fav-container .favorite-container div[data-id="${id}"] `
  );

  if (itemToRemove) {
    itemToRemove.remove();
  }

  let item = JSON.parse(localStorage.getItem("favoriteProducts"));

  item = item.filter((item) => item.id !== id);

  localStorage.setItem("favoriteProducts", JSON.stringify(item));
}
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".custom-card2 ,.custom-card3");
  cards.forEach((card) => {
    card.addEventListener("mousedown", () => {
      card.classList.add("active-card");
    });
    card.addEventListener("mouseup", () => {
      card.classList.remove("active-card");
    });
  });
});
