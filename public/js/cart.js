function openAndRenderCart() {
  const panel = document.querySelector(".cart-panel");

  if (panel.classList.contains("active")) {
    closeCart();
  } else {
    panel.classList.add("active");
    renderCart();
  }
}

function closeCart() {
  const panel = document.querySelector(".cart-panel");

  panel.classList.add("closing");

  setTimeout(() => {
    panel.classList.remove("active");
    panel.classList.remove("closing");
  }, 300);
}

function renderCart() {
  const listContainer = document.querySelector(".cart-panel");
  const cartIds = Object.keys(window.cart);

  if (cartIds.length === 0) {
    listContainer.innerHTML = `
            <div class="cart-container" style="grid-template-columns: 1fr;">
                <div class="cart-main">
                    <div class="cart-header">
                        <h1>Shopping Cart</h1>
                        <button onclick="closeCart()" class="remove-btn"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="empty-msg">
                        <i class="fas fa-shopping-basket fa-3x" style="margin-bottom: 15px; opacity: 0.3;"></i>
                        <p>Your cart is currently empty. Add some items first!</p>
                    </div>
                </div>
            </div>
        `;
    return;
  }

  let subtotal = 0;

  let itemsHTML = "";
  cartIds.forEach((id) => {
    const item = items.find((i) => i.id === parseInt(id));
    const qty = window.cart[id];
    subtotal += item.price * qty;

    itemsHTML += `
            <div class="cart-item">
                <div class="item-img">
                    <img src="images/${item.img}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain; padding: 5px;">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Unit Price: ₱${item.price.toFixed(2)}</p>
                </div>
                <div class="qty-control">
                    <button class="qty-btn" onclick="subtItemQty(${item.id})">−</button>
                    <!-- <span>${qty}</span> -->
                    <input type="number" class="qty-num" min="1" value="${qty}" onchange="updateItemQty(${item.id}, this.value)">
                    <button class="qty-btn" onclick="addItemQty(${item.id})">+</button>
                </div>
                <div class="item-price">₱${(item.price * qty).toFixed(2)}</div>
                <button class="remove-btn" onclick="removeEntireItem(${item.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
  });

  const orderType = document.getElementById("checkout-address");

  const total = subtotal + DELIVERY_FEE;
  //   if (orderType == "Delivery") {
  //     total = subtotal + DELIVERY_FEE;
  //   }

  listContainer.innerHTML = `
        <div class="cart-container">
            <div class="cart-main">
                <div class="cart-header">
                    <h1>Shopping Cart</h1>
                    <a href="#" class="back-link" onclick="closeCart(); return false;">← Continue Shopping</a>
                </div>
                <div id="cart-items-list">
                    ${itemsHTML}
                </div>
            </div>
            
            <div class="cart-summary">
                <h2 class="summary-title">Order Summary</h2>
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>₱${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Delivery Fee</span>
                    <span>₱${DELIVERY_FEE.toFixed(2)}</span>
                </div>
                <div class="summary-total">
                    <span>Total</span>
                    <span>₱${total.toFixed(2)}</span>
                </div>
                <button class="checkout-btn" onclick="openCheckoutModal()">Proceed to Checkout</button>
            </div>

        </div>
    `;
}

// Helper function to wire up the Trash Can icon
function removeEntireItem(id) {
  delete window.cart[id]; // Remove from global state
  localStorage.setItem("waterShopCart", JSON.stringify(window.cart)); // Save to storage

  // Refresh both the shop grid numbers and the cart UI
  if (typeof renderProducts === "function") renderProducts(currentFilter);
  renderCart();
}
