console.log("Admin JS is successfully loaded!");

function openAdminModal() {
  const modal = document.getElementById("loginModal");
  modal.style.display = "flex";
}

function closeAdminModal() {
  const modal = document.getElementById("loginModal");
  modal.style.display = "none";
}

function closeAdminModalOutside(event) {
  const modal = document.getElementById("loginModal");

  if (event.target === modal) {
    closeAdminModal();
  }
}

async function handleAdminLogin(event) {
  event.preventDefault();

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  try {
    const response = await fetch("adminLogin.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });

    const data = await response.json();

    if (data.status === "success") {
      alert("Login Successful! Redirecting...");
      window.location.href = "admin_pov.html";
    } else {
      alert(data.message || "Invalid Credentials");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("System error. Please try again later.");
  }
}

window.viewSummary = async function (orderId) {
  const modal = document.getElementById("summaryModal");
  const listContainer = document.getElementById("summaryItemsList");

  listContainer.innerHTML = "<p>Retrieving items...</p>";
  modal.style.display = "flex";

  try {
    const response = await fetch(`get_order_summary.php?id=${orderId}`);
    const products = await response.json();

    listContainer.innerHTML = "";

    if (products.length === 0) {
      listContainer.innerHTML = "<p>No items found for this order.</p>";
    } else {
      products.forEach((itemString) => {
        const p = document.createElement("p");
        p.textContent = itemString;
        listContainer.appendChild(p);
      });
    }
  } catch (error) {
    console.error("Summary Error:", error);
    listContainer.innerHTML = "<p>Error connecting to order_items.</p>";
  }
};
