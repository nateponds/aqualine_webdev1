function fetchOrderDetails() {
  const orderID = document.getElementById("order-number").value.trim();
  const receiptContainer = document.getElementById("order-receipt");

  if (orderID === "") {
    showToast("Please enter an Order ID.", "error");
    return;
  }

  fetch(`../api/get_order_details.php?id=${orderID}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        let itemsHTML = "";
        data.order.items.forEach((item) => {
          let itemTotal = (
            parseFloat(item.price) * parseInt(item.quantity)
          ).toFixed(2);

          itemsHTML += `
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 6px; border-bottom: 1px dashed #ccc; padding-bottom: 4px;">
                            <span>${item.quantity}x ${item.product_name}</span>
                            <span>₱${itemTotal}</span>
                        </div>
                    `;
        });

        receiptContainer.innerHTML = `
                    <div class="receipt-fade-in" style="background: #f8f9fa; padding: 18px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e9ecef;">
                        <div style="border-bottom: 2px solid #dee2e6; padding-bottom: 10px; margin-bottom: 12px;">
                            <h4 style="margin: 0 0 5px 0; color: #003366; font-size: 1.2rem;">Order #${data.order.id}</h4>
                            <p style="margin: 2px 0; font-size: 0.85rem;"><strong>Customer:</strong> ${data.order.name}</p>
                            <p style="margin: 2px 0; font-size: 0.85rem;"><strong>Address:</strong> ${data.order.address}</p>
                            <p style="margin: 2px 0; font-size: 0.85rem;"><strong>Status:</strong> 
                                <span style="color: #fff; background: ${data.order.status === "delivered" ? "#28a745" : "#007bff"}; padding: 2px 8px; border-radius: 12px; font-weight: 600; text-transform: uppercase; font-size: 0.75rem;">
                                    ${data.order.status}
                                </span>
                            </p>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <strong style="display: block; margin-bottom: 8px; font-size: 0.85rem; color: #6c757d;">ORDER ITEMS:</strong>
                            ${itemsHTML}
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #003366; padding-top: 10px; margin-top: 10px;">
                            <strong style="color: #003366; font-size: 1.1rem;">TOTAL:</strong>
                            <strong style="color: #007bff; font-size: 1.2rem;">₱${data.order.total}</strong>
                        </div>
                    </div>
                `;
      } else {
        receiptContainer.innerHTML = "";
        showToast(data.message, "error");
      }
    })
    .catch((error) => {
      console.error("Error fetching order:", error);
      receiptContainer.innerHTML = "";
      showToast("Failed to connect to the server.", "error");
    });
}
