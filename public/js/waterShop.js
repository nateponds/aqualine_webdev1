const DELIVERY_FEE = 50;
window.DELIVERY_FEE = DELIVERY_FEE;
window.cart = {};

const items = [
  {
    id: 1,
    category: "gallon",
    name: "Standard Round",
    volume: "5 gal",
    price: 30.0,
    img: "round-gallon.png",
  },
  {
    id: 2,
    category: "gallon",
    name: "Slim Alkaline",
    volume: "5 gal",
    price: 45.0,
    img: "slim-gallon.png",
  },
  {
    id: 3,
    category: "bottle",
    name: "Solo Mist",
    volume: "500ml",
    price: 12.0,
    img: "solo-mist.png",
  },
  {
    id: 4,
    category: "bottle",
    name: "Family Pack",
    volume: "1.5L",
    price: 18.0,
    img: "family-pack.png",
  },
  {
    id: 5,
    category: "slim",
    name: "Office Tower",
    volume: "10L",
    price: 25.0,
    img: "office-slim.png",
  },
  {
    id: 6,
    category: "slim",
    name: "Compact Home",
    volume: "8L",
    price: 22.0,
    img: "home-slim.png",
  },
];

const tabs = document.querySelectorAll(".tab");
const productsGrid = document.querySelector(".products-grid");
let currentIndex = 0;
let currentFilter = "all";

function getActiveItems() {
  return currentFilter === "all"
    ? items
    : items.filter((item) => item.category === currentFilter);
}

function renderProducts(filter = "all") {
  currentFilter = filter;
  productsGrid.innerHTML = "<p>Loading items...</p>";

  const filteredItems = getActiveItems();

  if (currentIndex >= filteredItems.length) {
    currentIndex = 0;
  }

  const itemsToShow = filteredItems.slice(currentIndex, currentIndex + 2);

  if (itemsToShow.length === 0) {
    productsGrid.innerHTML =
      "<p><strong>No products found in this category...</strong></p>";
    return;
  }

  productsGrid.innerHTML = itemsToShow
    .map(
      (item) => `
        <div class="product-card">
            <div class="product-img">
                <img src="images/${item.img}" alt="${item.img}">
            </div>
            <div class="product-body">
                <h3>${item.name}</h3>
                <div class="sub">Volume: ${item.volume}</div>
                <div class="product-footer">
                    <div class="price">₱${item.price} <small>/unit</small></div>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="subtItemQty(${item.id})">−</button>
                        <!-- <span class="qty-num">${window.cart[item.id] || 0}</span> -->
                        <input type="number" class="qty-num" min="0" value="${window.cart[item.id] || 0}" onchange="updateItemQty(${item.id}, this.value)">
                        <button class="qty-btn" onclick="addItemQty(${item.id})">+</button>
                    </div>
                </div>
            </div>
        </div>
        `,
    )
    .join("");

  const activeList = getActiveItems();
  const navButtons = document.querySelectorAll(".nav-btn");

  if (activeList.length <= 2) {
    navButtons.forEach((btn) => (btn.style.display = "none"));
  } else {
    navButtons.forEach((btn) => (btn.style.display = "flex"));
  }
}
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    currentIndex = 0;

    const selectedCategory = tab.dataset.category;

    renderProducts(selectedCategory);
  });
});

function moveCarousel(x_direction) {
  const filteredItems = getActiveItems();

  const newIndex = currentIndex + x_direction;

  if (newIndex >= 0 && newIndex < filteredItems.length) {
    currentIndex = newIndex;
    renderProducts(currentFilter);
  }
}

function updateItemQty(id, newVal) {
  const newQty = parseInt(newVal, 10);

  if (isNaN(newQty) || newQty <= 0) {
    delete window.cart[id];
  } else {
    window.cart[id] = newQty;
  }

  localStorage.setItem("waterShopCart", JSON.stringify(window.cart));

  renderProducts(currentFilter);
  if (typeof renderCart === "function") renderCart();
}

function addItemQty(id) {
  window.cart[id] = (window.cart[id] || 0) + 1;
  renderProducts(currentFilter);
  if (typeof renderCart === "function") renderCart();
}

function subtItemQty(id) {
  if (window.cart[id] && window.cart[id] > 0) {
    window.cart[id]--;
    if (window.cart[id] === 0) delete window.cart[id];
    renderProducts(currentFilter);
    if (typeof renderCart === "function") renderCart();
  }
}

function submitOrder() {
  if (Object.keys(window.cart).length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  const customerName = document.getElementById("checkout-name").value;
  const customerContact = document.getElementById("checkout-contact").value;
  const customerAddress = document.getElementById("checkout-address").value;
  const shipmentType = document.getElementById("checkout-shipment").value;

  if (!customerName || !customerContact || !customerAddress) {
    showToast("Please fill out all delivery details!");
    return;
  }

  const cartArray = [];
  // let finalTotal = window.DELIVERY_FEE;
  let finalTotal = 0;
  if (shipmentType === "Delivery") {
    finalTotal += window.DELIVERY_FEE;
  }

  Object.keys(window.cart).forEach((id) => {
    const itemDetails = items.find((i) => i.id === parseInt(id));
    const qty = window.cart[id];

    finalTotal += itemDetails.price * qty;

    cartArray.push({
      id: itemDetails.id,
      name: itemDetails.name,
      price: itemDetails.price,
      qty: qty,
    });
  });

  const orderData = {
    cart: cartArray,
    total: finalTotal,
    customer_info: {
      name: customerName,
      contact: customerContact,
      address: customerAddress,
      shipment_type: shipmentType,
    },
  };

  fetch("../api/checkout.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        // CREATE A FEEDBACK MODAL TO REPLACE THIS AND MAKE MORE ASTITIK
        showToast(
          "Order placed successfully! Your Order ID is: " + data.order_id,
        );

        window.cart = {};
        closeCheckoutModal();
        closeCart();
        renderCart();
        renderProducts(currentFilter);
      } else {
        // THIS ONE ALSO GRRRR
        showToast("Error: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Fetch Error: ", error);
      showToast(
        "Failed to connect to the server. Check the console for details.",
      );
    });
}

// checkout modal
function openCheckoutModal() {
  if (Object.keys(window.cart).length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  document.getElementById("checkout-modal").classList.add("active");
}

function closeCheckoutModal() {
  document.getElementById("checkout-modal").classList.remove("active");
}

localStorage.setItem("waterShopCart", JSON.stringify(window.cart));

renderProducts("all");

//view order modal
function openViewOrderModal() {
  document.getElementById("view-order-modal").classList.add("active");
  // console.log("opening view order modal");
}

function closeViewOrderModal() {
  document.getElementById("view-order-modal").classList.remove("active");
}

function closeViewOrderModalOutside(event) {
  const modalOverlay = document.getElementById("view-order-modal");
  if (event.target === modalOverlay) {
    closeViewOrderModal();
  }
}
