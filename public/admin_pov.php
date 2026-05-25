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

      <div class="aq-reports-container">
    
        <div class="aq-report-card card-revenue">
                <div class="aq-report-label">Gross Revenue</div>
                <div id="metricGrossRevenue" class="aq-report-value">₱0.00</div>
                <div class="aq-report-subtext subtext-success">
                    <i class="fas fa-wallet"></i> Total fulfilled earnings
                </div>
            </div>

            <div class="aq-report-card card-delivered">
                <div class="aq-report-label">Delivered Orders</div>
                <div id="metricDeliveredCount" class="aq-report-value text-success">0</div>
                <div class="aq-report-subtext">
                    <i class="fas fa-check-circle"></i> Completed drop-offs
                </div>
            </div>

            <div class="aq-report-card card-pending">
                <div class="aq-report-label">Pending Logistics</div>
                <div id="metricPendingCount" class="aq-report-value text-warning">0</div>
                <div class="aq-report-subtext">
                    <i class="fas fa-clock"></i> Awaiting prep / delivery
                </div>
            </div>

            <div class="aq-report-card card-cancelled">
                <div class="aq-report-label">Cancellations</div>
                <div id="metricCancelledCount" class="aq-report-value text-danger">0</div>
                <div class="aq-report-subtext subtext-danger">
                    <i class="fas fa-ban"></i> Soft-deleted orders
                </div>
            </div>

      </div>
      

      <!-- search bar -->
      <div class="admin-toolbar" style="display: flex; gap: 15px; margin-bottom: 24px; flex-wrap: wrap; justify-content: space-between; align-items: center;">
          <div style="display: flex; gap: 10px; flex: 1; min-width: 280px;">
              <input type="text" id="adminSearchInput" placeholder="Search by customer name..." oninput="resetToFirstPageAndFilter()" style="width: 100%; padding: 11px 14px; border: 1.5px solid var(--border-color); border-radius: 8px; font-family: inherit; font-size: 0.9rem; outline: none;">
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <select id="adminStatusFilter" onchange="resetToFirstPageAndFilter()" class="status-dropdown" style="min-width: 150px; padding: 10px 32px 10px 12px;">
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="out for delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
              </select>
              
              <select id="adminShipmentFilter" onchange="resetToFirstPageAndFilter()" class="status-dropdown" style="min-width: 150px; padding: 10px 32px 10px 12px;">
                  <option value="all">All Order Types</option>
                  <option value="delivery">Delivery</option>
                  <option value="pickup">Store Pickup</option>
              </select>
          </div>
      </div>

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


    <!-- pagination -->
    <div class="admin-pagination-container" style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color);">
          <div id="paginationInfo" style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">
              Showing 0 to 0 of 0 entries
          </div>
          <div class="pagination-buttons" style="display: flex; gap: 8px; align-items: center;">
              <button class="btn-summary" id="prevPageBtn" onclick="changePage(-1)" style="padding: 6px 14px; font-size: 0.8rem;">Previous</button>
              <div id="pageNumbersContainer" style="display: flex; gap: 6px;"></div>
              <button class="btn-summary" id="nextPageBtn" onclick="changePage(1)" style="padding: 6px 14px; font-size: 0.8rem;">Next</button>
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