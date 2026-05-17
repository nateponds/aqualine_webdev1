document.addEventListener("DOMContentLoaded", loadOrders);

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
    const orders = await response.json();

    tableBody.innerHTML = "";

    orders.forEach((order) => {
      const isPending =
        order.delivery_status.toLowerCase() === "pending" ? "selected" : "";
      const isOut =
        order.delivery_status.toLowerCase() === "out for delivery"
          ? "selected"
          : "";
      const isDelivered =
        order.delivery_status.toLowerCase() === "delivered" ? "selected" : "";

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
                        </select>
                    </td>
                    <td><button class="btn-cancel" onclick="cancelOrder(${order.order_id})">Cancel</button></td>
                </tr>
            `;

      tableBody.insertAdjacentHTML("beforeend", rowHTML);
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    tableBody.innerHTML =
      "<tr><td colspan='9'>Failed to load database.</td></tr>";
  }
}

async function cancelOrder(orderId) {
  if (
    !confirm(`Are you sure you want to cancel and delete Order #${orderId}?`)
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
      showToast("Order deleted successfully!");
      // console.log("Order deleted successfully!");
      loadOrders();
    } else {
      showToast("Error: " + data.message);
    }
  } catch (error) {
    console.error("Cancel Error:", error);
    showToast("System error. Could not delete order.");
  }
}

async function updateStatus(orderId, newStatus, element) {
  try {
    const response = await fetch("../api/update_status.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: orderId,
        status: newStatus,
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      element.classList.remove("pending", "out-for-delivery", "delivered");

      element.classList.add(newStatus.toLowerCase().replace(/\s+/g, "-"));

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
