document.addEventListener("DOMContentLoaded", loadOrders);

let allOrdersCache = [];
let filteredOrdersCache = [];
let currentPage = 1;
const rowsPerPage = 10;

window.viewSummary = async function (orderId) {
  const modal = document.getElementById("summaryModal");
  const listContainer = document.getElementById("summaryItemsList");

  listContainer.innerHTML = "<p>Retrieving items...</p>";
  modal.style.display = "flex";

  try {
    const response = await fetch(`../api/get_order_summary.php?id=${orderId}`);
    const products = await response.json();

    listContainer.innerHTML = "";

    if (products.length === 0) {
      listContainer.innerHTML = "<p>No items found for this order.</p>";
    } else {
      products.forEach((itemString) => {
        const p = document.createElement("p");

        p.style.display = "flex";
        p.style.justifyContent = "space-between";
        p.style.alignItems = "center";

        const lastSpaceIdx = itemString.lastIndexOf(" ");

        if (lastSpaceIdx !== -1) {
          const namePart = itemString.substring(0, lastSpaceIdx);
          const pricePart = itemString.substring(lastSpaceIdx + 1);

          p.innerHTML = `<span>${namePart}</span><span>${pricePart}</span>`;
        } else {
          p.textContent = itemString;
        }

        listContainer.appendChild(p);
      });
    }
  } catch (error) {
    console.error("Summary Error:", error);
    listContainer.innerHTML = "<p>Error connecting to order_items.</p>";
  }
};

async function loadOrders() {
  const tableBody = document.getElementById("orderTableBody");
  tableBody.innerHTML = "<tr><td colspan='9'>Loading orders...</td></tr>";

  try {
    const response = await fetch("../api/get_orders.php");
    allOrdersCache = await response.json();
    calculateAdminReports();

    currentPage = 1;
    filterOrders();
  } catch (error) {
    console.error("Error fetching orders:", error);
    tableBody.innerHTML =
      "<tr><td colspan='9'>Failed to load database.</td></tr>";
  }
}

function resetToFirstPageAndFilter() {
  currentPage = 1;
  filterOrders();
}

function filterOrders() {
  const searchQuery = document
    .getElementById("adminSearchInput")
    .value.toLowerCase()
    .trim();
  const statusFilter = document
    .getElementById("adminStatusFilter")
    .value.toLowerCase();
  const shipmentFilter = document
    .getElementById("adminShipmentFilter")
    .value.toLowerCase();

  filteredOrdersCache = allOrdersCache.filter((order) => {
    const matchesSearch = order.client_name.toLowerCase().includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" ||
      order.delivery_status.toLowerCase() === statusFilter;
    const matchesShipment =
      shipmentFilter === "all" ||
      order.shipment_type.toLowerCase() === shipmentFilter;

    return matchesSearch && matchesStatus && matchesShipment;
  });

  renderPagedTable();
}

function renderPagedTable() {
  const tableBody = document.getElementById("orderTableBody");
  tableBody.innerHTML = "";

  const totalEntries = filteredOrdersCache.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1;

  // Bound check current page assignment bounds safely
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  // Form indices for array slicing boundaries
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries);

  const pageItems = filteredOrdersCache.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  // Render empty placeholder if no orders match criteria parameters
  if (pageItems.length === 0) {
    tableBody.innerHTML =
      "<tr><td colspan='9' style='text-align: center; padding: 30px; color: #6b7d93;'>No matching records found.</td></tr>";
    updatePaginationControls(0, 0, 0, totalPages);
    return;
  }

  // Iterate over matching items slice context entries
  pageItems.forEach((order) => {
    const isPending =
      order.delivery_status.toLowerCase() === "pending" ? "selected" : "";
    const isOut =
      order.delivery_status.toLowerCase() === "out for delivery"
        ? "selected"
        : "";
    const isDelivered =
      order.delivery_status.toLowerCase() === "delivered" ? "selected" : "";
    const isCancelled =
      order.delivery_status.toLowerCase() === "cancelled" ? "selected" : "";

    const rowHTML = `
        <tr>
            <td>#${order.order_id}</td>
            <td>${order.client_name}</td>
            <td>${order.order_date}</td>
            <td><button class="btn-summary" onclick="viewSummary(${order.order_id})">View Order Summary</button></td>
            <td>₱${parseFloat(order.total_amount).toFixed(2)}</td>
            <td>${order.client_address}</td>
            <td>${order.client_contact}</td>
            <td>
                <select class="status-dropdown ${order.delivery_status.toLowerCase().replace(/\s+/g, "-")}" 
                  onchange="updateStatus(${order.order_id}, this.value, this)">
                    <option value="Pending" ${isPending}>Pending</option>
                    <option value="Out for Delivery" ${isOut}>Out for Delivery</option>
                    <option value="Delivered" ${isDelivered}>Delivered</option>
                    <option value="Cancelled" ${isCancelled}>Cancelled</option>
                </select>
            </td>
            <td><button class="btn-cancel" onclick="cancelOrder(${order.order_id})">Cancel</button></td>
        </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", rowHTML);
  });

  updatePaginationControls(startIndex + 1, endIndex, totalEntries, totalPages);
}

function updatePaginationControls(start, end, total, totalPages) {
  const infoText = document.getElementById("paginationInfo");
  infoText.textContent = `Showing ${start} to ${end} of ${total} entries`;

  document.getElementById("prevPageBtn").disabled = currentPage === 1;
  document.getElementById("nextPageBtn").disabled = currentPage === totalPages;

  const numbersContainer = document.getElementById("pageNumbersContainer");
  numbersContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const numBtn = document.createElement("button");
    numBtn.className = `pagination-number-btn ${i === currentPage ? "active" : ""}`;
    numBtn.textContent = i;
    numBtn.onclick = () => {
      currentPage = i;
      renderPagedTable();
    };
    numbersContainer.appendChild(numBtn);
  }
}

function changePage(direction) {
  currentPage += direction;
  renderPagedTable();
}

async function cancelOrder(orderId) {
  if (
    !confirm(`Are you sure you want to mark Order #${orderId} as Cancelled?`)
  ) {
    return;
  }

  try {
    const response = await fetch("../api/cancel_order.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: orderId }),
    });

    const data = await response.json();

    if (data.status === "success") {
      showToast("Order marked as cancelled successfully!");

      const cachedOrder = allOrdersCache.find((o) => o.order_id == orderId);
      if (cachedOrder) cachedOrder.delivery_status = "cancelled";

      calculateAdminReports();
      filterOrders();
    } else {
      showToast("Error: " + data.message);
    }
  } catch (error) {
    console.error("Cancel Error:", error);
    showToast("System error. Could not update cancellation flag.");
  }
}

async function updateStatus(orderId, newStatus, element) {
  try {
    const response = await fetch("../api/update_status.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: orderId, status: newStatus }),
    });

    const data = await response.json();

    if (data.status === "success") {
      element.className = `status-dropdown ${newStatus.toLowerCase().replace(/\s+/g, "-")}`;

      const cachedOrder = allOrdersCache.find((o) => o.order_id == orderId);
      if (cachedOrder) cachedOrder.delivery_status = newStatus;

      calculateAdminReports();
      showToast(`Order #${orderId} updated to ${newStatus}`, "success", 2200);
    } else {
      showToast("Failed to update status: " + data.message);
    }
  } catch (error) {
    console.error("Update Error:", error);
    showToast("System error. Status not saved.");
  }
}

window.closeSummaryModal = function () {
  document.getElementById("summaryModal").style.display = "none";
};

function closeSummaryOutside(event) {
  if (event.target.id === "summaryModal") {
    closeSummaryModal();
  }
}

// admin reports
function calculateAdminReports() {
  let grossRevenue = 0;
  let deliveredCount = 0;
  let pendingCount = 0;
  let cancelledCount = 0;

  allOrdersCache.forEach((order) => {
    const status = order.delivery_status.toLowerCase();
    const amount = parseFloat(order.total_amount) || 0;

    if (status === "delivered") {
      deliveredCount++;
      grossRevenue += amount;
    } else if (status === "pending" || status === "out for delivery") {
      pendingCount++;
    } else if (status === "cancelled") {
      cancelledCount++;
    }
  });

  document.getElementById("metricGrossRevenue").textContent =
    `₱${grossRevenue.toFixed(2)}`;
  document.getElementById("metricDeliveredCount").textContent = deliveredCount;
  document.getElementById("metricPendingCount").textContent = pendingCount;
  document.getElementById("metricCancelledCount").textContent = cancelledCount;
}
