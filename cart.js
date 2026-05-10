let cart = [
    { id: 1, name: "Slim Gallon", price: 150, qty: 2, icon: "fa-faucet-drip" },
    { id: 2, name: "Round Gallon (500ml Case)", price: 320, qty: 1, icon: "fa-bottle-water" }
];

const DELIVERY_FEE = 50;

function openCartPanel() {
    const panel = document.querySelector('.cart-panel');
    
    panel.classList.add('active'); 

    if (typeof renderCart === "function") {
        renderCart();
    } else {
        console.error("renderCart function not found! Make sure cart.js is loaded.");
    }
}

function renderCart() {
    const listContainer = document.getElementById('cart-items-list');
    const emptyMsg = document.getElementById('empty-cart-message');
    
    const cartIds = Object.keys(window.cart);

    if (cart.length === 0) {
        listContainer.innerHTML = '';
        emptyMsg.style.display = 'block';
        updateSummary(0);
        return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    listContainer.innerHTML = cartIds.map(id => {
        const item = items.find(i => i.id === parseInt(id));
        const qty = window.cart[id];
        
        return `
            <div class="cart-item">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Unit Price: ₱${item.price}</p>
                </div>
                <div class="qty-control">
                    <button class="qty-btn" onclick="addItemQty(${item.id})">+</button>
                    <span>${qty}</span>
                    <button class="qty-btn" onclick="subtItemQty(${item.id})">-</button>
                </div>
                <div class="item-price">₱${(item.price * qty).toLocaleString()}</div>
            </div>
        `;
    }).join('');

    const subtotal = cartIds.reduce((acc, id) => {
        const item = items.find(i => i.id === parseInt(id));
        return acc + (item.price * window.cart[id]);
    }, 0);
    updateSummary(subtotal);
}

function updateQty(id, change) {
    const item = window.cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty < 1) removeItem(id);
        else renderCart();
    }
}

function removeItem(id) {
    window.cart = window.cart.filter(item => item.id !== id);
    renderCart();
}

function updateSummary(subtotal) {
    const total = subtotal > 0 ? (subtotal + DELIVERY_FEE) : 0;

    document.getElementById('subtotal').innerText = `₱${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    document.getElementById('grand-total').innerText = `₱${total.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
}

renderCart();