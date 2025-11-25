var allProducts = document.querySelector(".products");

var products = [
  {
    id: 1,
    title: "Western Saddle",
    price: 1000,
    category: "Saddle",
    imageUrl: "images/photo1.webp",
  },
  {
    id: 2,
    title: "English Saddle",
    price: 985,
    category: "Saddle",
    imageUrl: "images/photo2.webp",
  },
  {
    id: 3,
    title: "Dressage Saddle",
    price: 1200,
    category: "Saddle",
    imageUrl: "images/photo3.jpg",
  },
  {
    id: 4,
    title: "Black Shoes",
    price: 120,
    category: "Shoes",
    imageUrl: "images/photo4.jpg",
  },
  {
    id: 5,
    title: "Brown Shoes",
    price: 150,
    category: "Shoes",
    imageUrl: "images/photo5.webp",
  },
  {
    id: 6,
    title: "Short-Ankel Boots ",
    price: 20,
    category: "Shoes",
    imageUrl: "images/photo6.webp",
  },
  {
    id: 7,
    title: "Short Whip",
    price: 25,
    category: "Tool",
    imageUrl: "images/photo7.webp",
  },
  {
    id: 8,
    title: "Helmet",
    price: 80,
    category: "Hat",
    imageUrl: "images/photo8.jpg",
  },
  {
    id: 9,
    title: "Horse Shoe",
    price: 35,
    category: "Tool",
    imageUrl: "images/photo9.jpg",
  },
];

let searchBar = document.querySelector("#searchBar");
let userSearchChoice = document.querySelector("#userSearchChoice");
let searchByProduct = document.querySelector("#searchByProduct");
let searchByCategory = document.querySelector("#searchByCategory");
let filteredProducts = products;

userSearchChoice.innerHTML = "Search by Product Name";

searchByProduct.addEventListener("click", () => {
  userSearchChoice.innerHTML = "Search by Product Name";
});
searchByCategory.addEventListener("click", () => {
  userSearchChoice.innerHTML = "Search by Category";
});

searchBar.addEventListener("keyup", (e) => {
  const searchName = e.target.value.toLowerCase();

  filteredProducts = products.filter((newProducts) => {
    if (userSearchChoice.innerHTML === "Search by Product Name") {
      return newProducts.title.toLowerCase().includes(searchName);
    } else if (userSearchChoice.innerHTML === "Search by Category") {
      return newProducts.category.toLowerCase().includes(searchName);
    }
  });

  drawItems();
});

let drawItems = function () {
  let pro = filteredProducts.map((item) => {
    return `
    <div class = "col-4"  ">
    <div class="card  my-3  p-3 custom-card  " style="width: 18 rem">
        <img src="${item.imageUrl}" alt="" class="card-img-top" class="mx-auto" style="height: 375px ;" />
        <div class="card-body mx-auto">
          <h5 class="card-title mt-3">${item.title}</h5>
          <span class="card-text d-block mt-3">Price: $${item.price}</span>
          <span class="card-text d-block mt-3">Category: ${item.category}</span>
          <div class="card-btns mt-3">
            <i class="fas fa-heart " onClick=addToFavorite(${item.id},this)></i>
            <i class="fas fa-heart text-danger " id="favBtn" onClick=removeToFavorite(${item.id},this)></i>
            <button class="btn btn-primary mx-2 " id="addingBtn" onClick = addToCart(${item.id},this)>Add To Cart</button>
            <button class="btn btn-danger mx-2 rembtn" id="removingBtn" onClick = removeFromCart(${item.id},this)>Remove From Cart</button>
          </div>
        </div>
      </div>
      </div>
      `;
  });
  allProducts.innerHTML = pro.join("");
};
drawItems();

let cartContent = document.querySelector(".cart-content div");
let cartNumber = document.querySelector("#cart-number");

let addedItems = JSON.parse(localStorage.getItem("cartProducts"))
  ? JSON.parse(localStorage.getItem("cartProducts"))
  : [];

if (addedItems) {
  updateCart();

  cartNumber.innerHTML = addedItems.length;
}

function addToCart(id, btn) {
  if (localStorage.getItem("email")) {
    let itemToAdd = products.find((item) => item.id === id);

    let existing = addedItems.find((item) => item.id === id);

    if (existing) {
      existing.quantity++;
    } else {
      itemToAdd.quantity = 1;
      addedItems = [...addedItems, itemToAdd];
    }

    btn.style.display = "none";
    btn.nextElementSibling.style.display = "inline-block";

    localStorage.setItem("cartProducts", JSON.stringify(addedItems));
    updateCart();
  } else {
    window.location = "login.html";
  }
}

function updateCart() {
  cartContent.innerHTML = "";
  addedItems.forEach((item) => {
    cartContent.innerHTML += `<div class="d-flex justify-content-between align-items-center my-2 border-bottom pb-2 border-dark border-1"data-id="${
      item.id
    }">
  <div> <p>${item.title}</p>
                  <p>price: $${item.price * item.quantity} </p>
                </div>
                <div>
                  <button
                    class="btn btn-outline-success d-block position-relative "
                    style="width: 35px; height: 35px"
                    type = "button"
                    id = "plus"
                  >
                    <i class="fas fa-plus position-absolute plus-sign"></i>
                  </button>
                  <span class="d-block quantity">${item.quantity}</span>
                  <button
                    class="btn btn-outline-danger d-block position-relative "
                    style="width: 35px; height: 35px"
                    type="button"
                    id = "minus"
                  >
                    <i class="fas fa-minus position-absolute plus-sign"></i>
                  </button>
                </div>
              </div>`;
  });

  cartNumber.innerHTML = addedItems.length;
  increaseAndDecrease();
}

function removeFromCart(id, btn) {
  addedItems = addedItems.filter((item) => item.id !== id);
  localStorage.setItem("cartProducts", JSON.stringify(addedItems));

  updateCart();

  btn.style.display = "none";
  btn.previousElementSibling.style.display = "inline-block";
}

function increaseAndDecrease() {
  let plusBtn = document.querySelectorAll("div #plus");
  let minusBtn = document.querySelectorAll("div #minus");

  plusBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let parent = btn.closest("[data-id]");
      let id = parseInt(parent.dataset.id);

      let product = addedItems.find((item) => item.id === id);
      product.quantity++;
      localStorage.setItem("cartProducts", JSON.stringify(addedItems));
      updateCart();
    });
  });
  minusBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let parent = btn.closest("[data-id]");
      let id = parseInt(parent.dataset.id);

      let product = addedItems.find((item) => item.id === id);
      if (product.quantity === 1) {
        addedItems = addedItems.filter((item) => item.id !== id);
      } else {
        product.quantity--;
      }
      localStorage.setItem("cartProducts", JSON.stringify(addedItems));
      updateCart();
    });
  });
}

let myCart = document.querySelector(".my-cart");
let cartContentDiv = document.querySelector(".cart-content");

myCart.addEventListener("click", () => {
  if (cartContentDiv.style.display === "none") {
    if (cartContent.innerHTML != "") {
      cartContentDiv.style.display = "block";
    }
  } else {
    cartContentDiv.style.display = "none";
  }
});

let favoriteItems = JSON.parse(localStorage.getItem("favoriteProducts"))
  ? JSON.parse(localStorage.getItem("favoriteProducts"))
  : [];

function addToFavorite(id, btn) {
  if (localStorage.getItem("email")) {
    let favoriteItem = products.find((item) => item.id === id);
    btn.style.display = "none";
    btn.nextElementSibling.style.display = "inline-block";

    favoriteItems = [...favoriteItems, favoriteItem];
    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteItems));
  } else {
    window.location = "login.html";
  }
}

function removeToFavorite(id, btn) {
  favoriteItems = favoriteItems.filter((item) => item.id !== id);
  localStorage.setItem("favoriteProducts", JSON.stringify(favoriteItems));

  btn.style.display = "none";
  btn.previousElementSibling.style.display = "inline-block";
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".custom-card");
  cards.forEach((card) => {
    card.addEventListener("mousedown", () => {
      card.classList.add("active-card");
    });
    card.addEventListener("mouseup", () => {
      card.classList.remove("active-card");
    });
  });
});
