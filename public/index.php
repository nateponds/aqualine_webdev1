<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aqualine | Premium Water Delivery</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/cartStyle.css">
    <link rel="stylesheet" href="css/checkoutFormStyle.css">
    <link rel="stylesheet" href="css/aqualine-css.css">
    <link rel="stylesheet" href="css/viewOrderModal.css">
</head>
<body>
    <header>
        <div class="logo">Aqualine</div>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="javascript:void(0)" onclick="openAdminModal()">Admin</a></li>
                <li><a href="javascript:void(0)" onclick="openViewOrderModal()">View Order</a></li>
            </ul>
        </nav>
    </header>

    <!--add image [right side] or like a carousel of sht we offer idek-->
    <section class="hero">
    <div class="aq-blob one"></div>
    <div class="aq-blob two"></div>

    <div class="hero-wave">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.18)"
            d="M0,192L60,197.3C120,203,240,213,360,218.7C480,224,600,224,720,202.7C840,181,960,139,1080,138.7C1200,139,1320,181,1380,202.7L1440,224L1440,320L0,320Z">
            </path>
        </svg>
    </div>

        <div class="hero-content">
            <h1>
            Pure Water.<br>
            <span>Delivered Fresh.</span>
            </h1>

            <p>
            Premium purified drinking water for homes,
            offices, and businesses with fast delivery
            and trusted quality.
            </p>

            <a href="#catalog" class="btn-service">
            Order Now
            </a>

        </div>

    </section>

    <section class="features">
        <div class="feature-card">
            <i class="fas fa-flask"></i>
            <h3>Healthy Composition</h3>
        </div>
        <div class="feature-card">
            <i class="fas fa-droplet"></i>
            <h3>100% Purity</h3>
        </div>
        <div class="feature-card">
            <i class="fas fa-headset"></i>
            <h3>24/7 Support</h3>
        </div>
        <div class="feature-card">
            <i class="fas fa-truck"></i>
            <h3>Delivery</h3>
        </div>
    </section>

<section class="about">
    <div class="about-glow"></div>
    <div class="about-image">
        <img src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1976&auto=format&fit=crop" alt="Purified Water">

        <div class="about-badge">
            <i class="fas fa-award"></i>
            Trusted Since 1996
        </div>
    </div>

    <div class="about-content">
        <div class="section-label">
            ABOUT AQUALINE
        </div>
        <h2>
            30 Years of Delivering
            Clean & Safe Water
        </h2>
        <p>
            Aqualine provides purified drinking water
            for homes, offices, and businesses across
            the Philippines with trusted quality,
            reliable delivery, and customer-first service.
        </p>

        <div class="about-stats">
            <div class="stat-card">
                <h3>30+</h3>
                <span>Years Experience</span>
            </div>

            <div class="stat-card">
                <h3>2K+</h3>
                <span>Happy Customers</span>
            </div>

            <div class="stat-card">
                <h3>24/7</h3>
                <span>Support & Delivery</span>
            </div>
        </div>
    </div>
</section>

    <section id="services" class="services"> 
        <h2>Different Types of Services</h2> 
        <div class="service-grid">
            <div class="service-card">
                <i class="fas fa-tint" alt="Refills"></i>
                <div class="service-info"><h3>Refills</h3></div>
            </div>
            <div class="service-card">
                <i class="fas fa-store" alt="Pick-Up"></i>
                <div class="service-info"><h3>Pick-Up</h3></div>
            </div>
            <div class="service-card">
                <i class="fas fa-truck-ramp-box" alt="Home Delivery"></i>
                <div class="service-info"><h3>Home Delivery</h3></div>
            </div>
             <div class="service-card">
                <i class="fas fa-tags" alt="Retail"></i>
                <div class="service-info"><h3>Retail</h3></div> <!--buy/sell bottles idk-->
            </div>
        </div>
    </section>

    <section class="catalog" id="catalog">
        <div class="catalog-header">
            <div>
                <div class="section-label" style="color: var(--primary-blue); font-weight: 700;">Water Shop</div>
                <div class="section-title" style="font-size: 2rem; font-weight: 700;">Container Categories</div>
            </div>
        </div>

        <!-- START HERE RENDERING WITH JAVASCRIPT AND MYSQL -->
        <div class="catalog-tabs"> <!-- JS WILL CHECK ON 4 CLASSES OF CATALOG TABS AND RENDER OUT PRODUCTS FROM THE SQL DATABASE BASED ON THAT -->
             <!-- change to black is class tab active, class tab is white -->
            <div class="tab active" data-category="all">All</div>
             <div class="tab" data-category="gallon">Gallon</div>
            <div class="tab" data-category="bottle">Bottle</div>
            <div class="tab" data-category="slim">Slim</div>
        </div>
        <div class="products-grid">
            <strong>If this is loaded in your JS is not doing anything</strong>
        </div>

        <div class="carousel-container">
            <button class="nav-btn" onclick="moveCarousel(-1)">
                <img src="images/left-arrow.png" alt="">
                <!-- &larr; -->
            </button>

            <button class="nav-btn" onclick="moveCarousel(1)">
                <img src="images/right-arrow.png" alt="">
                <!-- &rarr; -->
            </button>
        </div>
        <div style="text-align:center; margin-top: 2.5rem;">
            <button class="btn-order" onclick="openAndRenderCart()" onclick="submitOrder()">Order Now &rarr;</button>
        </div>

            
        <div class="cart-panel">
            <!-- CART AND PRODUCTS WILL BE LAID OUT HERE -->
        </div>

    </section>
    <!-- END HERE RENDERING WITH JS AND MYSQL -->

    <section id="contact" class="contact"> 
        <h2>Contact Us</h2>
        <div class="contact-container">
            <div class="contact-item">
                <i class="fas fa-phone-alt" style="color: var(--primary-blue);"></i>
                <span>+63 123 456 7890</span>
            </div>
            <div class="contact-item">
                <i class="fas fa-envelope" style="color: var(--primary-blue);"></i>
                <span>support@aqualine.ph</span>
            </div>
        </div>
    </section>

    <section class="location-map">
        <h2>Our Service Location</h2>
        <div class="map-container">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.3313262973715!2d123.79155707584166!3d10.23485746939989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x334177c0cc0de863%3A0x6aec508e7001f8bd!2sSan%20Josemaria%20Village!5e0!3m2!1sen!2sph!4v1715300000000!5m2!1sen!2sph" 
                width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy">
            </iframe>
        </div>
    </section>

    <!-- admin login ting-->
    <div id="loginModal" class="admin-overlay" onclick="closeAdminModalOutside(event)">
        <div class="admin-content">
            <span class="close-admin" onclick="closeAdminModal()">&times;</span>
            <h2>Admin Login</h2>
            <form id="loginForm" onsubmit="handleAdminLogin(event)">
                <div class="input-group">
                    <label>Username</label>
                    <input type="text" id="username" placeholder="Enter username" required>
                </div>
                <div class="input-group">
                    <label>Password</label>
                    <input type="password" id="password" placeholder="Enter password" required>
                </div>
                <button type="submit" class="btn-order" style="width: 100%; margin-top: 10px;">Login</button>
            </form>
        </div>
    </div>

    <!-- THE FLOATING CHECKOUT FORM -->
    <div id="checkout-modal" class="checkout-overlay">
        <div class="checkout-content">
            <span class="close-btn" onclick="closeCheckoutModal()">&times;</span>
            
            <h3 style="margin-top: 0;">Delivery Details</h3>
            
            <label>Full Name:</label>
            <input type="text" id="checkout-name" placeholder="E.g. Juan Dela Cruz" required>
            
            <label>Phone Number:</label>
            <input type="text" id="checkout-contact" placeholder="09xxxxxxxxx" required>
            
            <label>Address:</label>
            <input type="text" id="checkout-address" placeholder="San Jose Ma. Village, Minglanilla, Cebu" required>
            
            <label>Order Type:</label>
            <select id="checkout-shipment">
                <option value="delivery">Delivery</option>
                <option value="pickup">Store Pickup</option>
            </select>

            <button class="btn-order" onclick="submitOrder()" style="width: 100%; margin-top: 20px;">Confirm & Place Order</button>
        </div>
    </div>


    <!-- VIEW ORDER MODAL -->
    <div id="view-order-modal" class="view-order-modal-overlay" onclick="closeViewOrderModalOutside(event)">
        <div class="view-order-modal-content">
            <div class="close-btn" onclick="closeViewOrderModal()">&times;</div>
            <h3 style="margin-top: 0;">View Specific Order</h3>

            <div id="order-receipt" class="order-receipt">

            </div>

            <label>Enter Order ID:</label>
            <input type="text" name="" id="order-number" placeholder="" required>
            <button class="btn-order" style="width: 100%; margin-top: 20px;" onclick="fetchOrderDetails()">View Order</button>
        </div>
    </div>

    <div id="toast-container"></div>

    <footer>
        <div class="logo" style="color: var(--white);">Aqualine</div>
        <h3>Aqualine - Customized Solution For Every Industry Needs!</h3>
        <p>&copy; 2026 Aqualine Water Station Philippines. All rights reserved.</p>
    </footer>

    <script src="js/waterShop.js"></script>
    <script src="js/cart.js"></script>
    <script src="js/admin.js"></script>
    <script src="js/aqualine-js.js"></script>
    <script src="js/view-order.js"></script>
    
</body>
</html>
