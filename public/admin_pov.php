<?php
session_start();
if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header("Location: index.php");
    exit;
}
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aqualine | Admin Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    <link rel="stylesheet" href="css/admin_pov.css" />
  </head>
  <body>

    <div class="header">
      <div class="header-info">
        <div>Administrator</div>
        <div style="font-weight:400; color:#5a7a9a; font-size:0.75rem;">Aqualine Delivery Management</div>
      </div>
      <div class="header-avatar">A</div>
      <a href="index.php" style="text-decoration:none;">
        <button class="logout-btn">
          <i class="fas fa-sign-out-alt" style="margin-right:5px;"></i>Logout
        </button>
      </a>
    </div>

    <div class="admin-container">
      <h2>Aqualine Delivery Orders</h2>

      <div class="table-responsive">
        <table class="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Product Info</th>
              <th>Total Price</th>
              <th>Address</th>
              <th>Contact No.</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="orderTableBody">
          </tbody>
        </table>
      </div>
    </div>

    <!-- order summary modal -->
    <div id="summaryModal" class="order_summOverlay" onclick="closeSummaryOutside(event)">
      <div class="order-card" onclick="event.stopPropagation()">
        <span class="close-btn" onclick="closeSummaryModal()">&times;</span>
        <h3><i class="fas fa-receipt" style="color:#007bff; margin-right:8px;"></i>Order Summary</h3>
        <div id="summaryItemsList"></div>
      </div>
    </div>

    <div class="toast-container"></div>

    <script src="js/aqualine-js.js"></script>
    <script src="js/admin_pov.js"></script>
  </body>
</html>