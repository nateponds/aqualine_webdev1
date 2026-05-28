document.addEventListener("DOMContentLoaded", loadUserOrders);

let userOrdersCache = [];

async function loadUserOrders() {
  const tableBody = document.getElementById("userHistoryTableBody");
  if (!tableBody) return;

  try {
    const response = await fetch("../api/get_user_history.php");
    userOrdersCache = await response.json();

    tableBody.innerHTML = "";

    if (userOrdersCache.length === 0) {
      tableBody.innerHTML = `<tr><td colspan='7' style='text-align: center; padding: 40px; color: var(--text-muted);'>
        <i class="fas fa-shopping-basket" style="display:block; font-size:2rem; margin-bottom:10px; opacity:0.3;"></i>
        You haven't placed any orders yet.
      </td></tr>`;
      return;
    }

    userOrdersCache.forEach((order) => {
      const cleanStatus = order.delivery_status.toLowerCase();
      const statusClass = cleanStatus.replace(/\s+/g, "-");

      const rowHTML = `
        <tr>
            <td>#${order.order_id}</td>
            <td>${order.order_date}</td>
            <td>
                <button class="btn-summary" onclick="viewSummary(${order.order_id})">
                    <i class="fas fa-eye"></i> View Items
                </button>
            </td>
            <td><strong>₱${parseFloat(order.total_amount).toFixed(2)}</strong></td>
            <td style="text-transform: capitalize;">${order.shipment_type}</td>
            <td>
                <span class="status ${statusClass}" style="padding: 6px 16px; border-radius: 20px; font-weight:700; font-size:0.75rem; text-transform: uppercase; border: 1.5px solid;">
                    ${order.delivery_status}
                </span>
            </td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", rowHTML);
    });
  } catch (error) {
    console.error("History Error:", error);
    tableBody.innerHTML =
      "<tr><td colspan='7' style='text-align: center; color: #ef4444;'>Failed to sync order layers.</td></tr>";
  }
}

window.viewSummary = async function (orderId) {
  const modal = document.getElementById("summaryModal");
  const listContainer = document.getElementById("summaryItemsList");

  listContainer.innerHTML = "<p>Retrieving items...</p>";
  modal.style.display = "flex";

  try {
    const response = await fetch(`../api/get_order_summary.php?id=${orderId}`);
    const products = await response.json();
    listContainer.innerHTML = "";

    products.forEach((itemString) => {
      const p = document.createElement("p");
      p.style.cssText =
        "display: flex; justify-content: space-between; font-weight: 500; font-size: 0.88rem;";

      const lastSpaceIdx = itemString.lastIndexOf(" ");
      if (lastSpaceIdx !== -1) {
        p.innerHTML = `<span>${itemString.substring(0, lastSpaceIdx)}</span><span>${itemString.substring(lastSpaceIdx + 1)}</span>`;
      } else {
        p.textContent = itemString;
      }
      listContainer.appendChild(p);
    });
  } catch (error) {
    console.error("Summary Error:", error);
    listContainer.innerHTML = "<p>Error pulling items map.</p>";
  }
};

window.repeatPastOrder = async function (orderId) {
  try {
    const response = await fetch(
      `../api/get_order_items_raw.php?id=${orderId}`,
    );
    const itemsArray = await response.json();

    if (!itemsArray || itemsArray.error) {
      showToast("Could not process order reconstruction.", "error");
      return;
    }

    let prospectiveCart = {};
    itemsArray.forEach((item) => {
      prospectiveCart[item.product_id] = parseInt(item.quantity);
    });

    localStorage.setItem("waterShopCart", JSON.stringify(prospectiveCart));

    if (typeof showToast === "function") {
      showToast(
        "Order copied to cart! Redirecting to checkout view...",
        "success",
        1500,
      );
    }

    setTimeout(() => {
      window.location.href = "index.php?action=checkout";
    }, 1200);
  } catch (error) {
    console.error("Reorder Error:", error);
    if (typeof showToast === "function") {
      showToast("System error copying configuration.", "error");
    } else {
      alert("System error copying configuration.");
    }
  }
};

window.closeSummaryModal = function () {
  const modal = document.getElementById("summaryModal");
  if (modal) modal.style.display = "none";
};

function closeSummaryOutside(event) {
  if (event.target.id === "summaryModal") closeSummaryModal();
}
