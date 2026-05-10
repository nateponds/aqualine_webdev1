const DELIVERY_FEE = 50;
window.DELIVERY_FEE = DELIVERY_FEE;
window.cart = {};


const items = [
  { id: 1, category: "gallon", name: "Standard Round", volume: "5 gal", price: 30.00, img: "round-gallon.png" },
  { id: 2, category: "gallon", name: "Slim Alkaline",  volume: "5 gal", price: 45.00, img: "slim-gallon.png" },
  { id: 3, category: "bottle", name: "Solo Mist",      volume: "500ml", price: 12.00, img: "solo-mist.png" },
  { id: 4, category: "bottle", name: "Family Pack",    volume: "1.5L",  price: 18.00, img: "family-pack.png" },
  { id: 5, category: "slim",   name: "Office Tower",   volume: "10L",   price: 25.00, img: "office-slim.png" },
  { id: 6, category: "slim",   name: "Compact Home",   volume: "8L",    price: 22.00, img: "home-slim.png" },
];


const tabs = document.querySelectorAll('.tab');
const productsGrid = document.querySelector('.products-grid');
let currentIndex = 0;
let currentFilter = "all";

function getActiveItems() {
    return currentFilter === "all" 
        ? items 
        : items.filter(item => item.category === currentFilter);
}

function renderProducts(filter = "all"){
    currentFilter = filter;
    productsGrid.innerHTML = "<p>Loading items...</p>";

    const filteredItems = getActiveItems();

    if (currentIndex >= filteredItems.length) {
        currentIndex = 0;
    }

    const itemsToShow = filteredItems.slice(currentIndex, currentIndex + 2);
    
    if(itemsToShow.length === 0){
        productsGrid.innerHTML = "<p><strong>No products found in this category...</strong></p>";
        return;
    }

    productsGrid.innerHTML = itemsToShow.map(item => `
        <div class="product-card"> <!-- whole cell that the database will render out. should be stripped out in static html -->
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
                        <span class="qty-num">${window.cart[item.id] || 0}</span>
                        <button class="qty-btn" onclick="addItemQty(${item.id})">+</button>
                    </div>
                </div>
            </div>
        </div>
        `).join('');
    
    const activeList = getActiveItems();
    const navButtons = document.querySelectorAll('.nav-btn');

    if (activeList.length <= 2) {
        navButtons.forEach(btn => btn.style.display = 'none');
    } else {
        navButtons.forEach(btn => btn.style.display = 'flex');
    }
    
}
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        currentIndex = 0;

        const selectedCategory = tab.dataset.category;

        renderProducts(selectedCategory);
    });
});

function moveCarousel(x_direction){
    const filteredItems = getActiveItems();

    const newIndex = currentIndex + x_direction;

    if (newIndex >= 0 && newIndex < filteredItems.length) {
        currentIndex = newIndex;
        renderProducts(currentFilter);
    }
}

function addItemQty(id){
    window.cart[id] = (window.cart[id] || 0) + 1;
    renderProducts(currentFilter);
    if (typeof renderCart === "function") renderCart();
}

function subtItemQty(id){
    if (window.cart[id] && window.cart[id] > 0) {
        window.cart[id]--;
        if (window.cart[id] === 0) delete window.cart[id];
        renderProducts(currentFilter);
        if (typeof renderCart === "function") renderCart();
    }
}

function submitOrder(){
    if(Object.keys(window.cart).length === 0){
        alert("Your cart is empty!");
        return;
    }

    const cartArray = Object.values(window.cart);

    let finalTotal = DELIVERY_FEE;
    cartArray.forEach(item => {
        finalTotal += (item.price * item.quantity); 
    });

    const orderData = {
        cart: cartArray,
        total: finalTotal
    };

    fetch('checkout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success'){
            alert("Order placed successfully! Your Order ID is: " + data.order_id);
        
        window.cart = {};
        closeCart();
        renderCart();

        }
        else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        console.error("Fetch Error: ", error);
        alert("Failed to connect to the server.");
    });

}

localStorage.setItem('waterShopCart', JSON.stringify(window.cart));


renderProducts('all');