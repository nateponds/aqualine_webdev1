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
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/admin_pov.css" />
  </head>
  <body>
    <div class="header">
      Admin: Administrator<br />
      System: Aqualine Delivery Management<br />
      <a href="index.php">
        <button class="logout-btn">Logout</button>
      </a>
    </div>

    <div class="admin-container">
      <h2>AQUALINE DELIVERY ORDERS</h2>

      <div class="table-responsive">
        <table class="order-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER NAME</th>
              <th>ORDER DATE</th>
              <th>PRODUCT INFO</th>
              <th>TOTAL PRICE</th>
              <th>ADDRESS</th>
              <th>CONTACT NO.</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody id="orderTableBody"></tbody>
        </table>
      </div>
    </div>

    <div
      id="summaryModal"
      class="order_summOverlay"
      onclick="closeSummaryOutside(event)"
    >
      <div class="order-card" onclick="event.stopPropagation()">
        <span class="close-btn" onclick="closeSummaryModal()">&times;</span>
        <h3>Orders Summary</h3>

        <div id="summaryItemsList"></div>
      </div>
    </div>

    <script src="js/admin_pov.js"></script>
  </body>
</html>
