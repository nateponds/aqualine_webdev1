<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aqualine | My Account</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="css/admin_pov.css">
    <link rel="stylesheet" href="css/account_dashboard.css">
</head>
<body>

    <div class="aq-user-header">
        <div class="aq-welcome-group">
            <div class="aq-user-avatar">
                <?php echo strtoupper(substr($_SESSION['username'], 0, 1)); ?>
            </div>
            <div class="aq-user-details">
                <h1>Mabuhay, <?php echo htmlspecialchars($_SESSION['client_name']); ?>!</h1>
                <div style="color: var(--text-muted); font-size: 0.8rem; font-weight: 500;">Customer Dashboard Portal</div>
            </div>
        </div>
        <div style="display: flex; gap: 12px;">
            <a href="index.php" style="text-decoration: none;">
                <button class="btn-summary" style="background: var(--white); color: var(--accent-blue); border: 1.5px solid var(--accent-blue); box-shadow: none;">
                    <i class="fas fa-store" style="margin-right: 6px;"></i>Home
                </button>
            </a>
            <a href="../api/userLogout.php" style="text-decoration: none;">
                <button class="logout-btn">
                    <i class="fas fa-sign-out-alt" style="margin-right: 5px;"></i>Logout
                </button>
            </a>
        </div>
    </div>

    <div class="aq-dashboard-layout">

        <div class="admin-container" style="width: 100%; padding: 32px;">
            <h2 style="margin-bottom: 24px;">Your Purchase History</h2>
            
            <div class="table-responsive">
                <table class="order-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date Ordered</th>
                            <th>Items Purchased</th>
                            <th>Total Amount</th>
                            <th>Shipment Type</th>
                            <th>Logistics Status</th>
                        </tr>
                    </thead>
                    <tbody id="userHistoryTableBody">
                        <tr>
                            <td colspan="7" style="text-align: center; padding: 20px; color: var(--text-muted);">
                                Loading your purchase records...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

    <div id="summaryModal" class="order_summOverlay" onclick="closeSummaryOutside(event)">
        <div class="order-card" onclick="event.stopPropagation()">
            <span class="close-btn" onclick="closeSummaryModal()">&times;</span>
            <h3><i class="fas fa-receipt" style="color: var(--accent-blue); margin-right: 8px;"></i>Items Sheet</h3>
            <div id="summaryItemsList"></div>
        </div>
    </div>

    <div class="toast-container" id="toast-container"></div>

    <script src="js/aqualine-js.js"></script>
    <script src="js/account_dashboard.js"></script>
</body>
</html>