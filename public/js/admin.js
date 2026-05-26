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
    const response = await fetch("../api/adminLogin.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      closeAdminModal();

      showToast("Welcome back, Admin!", "success");
      setTimeout(() => {
        window.location.href = "admin_pov.php";
      }, 1400);
    } else {
      showToast(data.message || "Invalid Credentials", "error");
    }
  } catch (error) {
    console.error("Login Error:", error);
    showToast("System error. Please try again later.", "error");
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

// forgot password admin update
function handleForgotPassword() {
  const forgotModal = document.getElementById("aq-forgot-modal");
  if (forgotModal) {
    forgotModal.classList.add("active");
  }
}

function closeForgotModal() {
  const forgotModal = document.getElementById("aq-forgot-modal");
  if (forgotModal) {
    forgotModal.classList.remove("active");
  }
}

function closeForgotModalOutside(event) {
  const forgotModal = document.getElementById("aq-forgot-modal");
  if (event.target === forgotModal) {
    closeForgotModal();
  }
}

// user accounts update
// USER AUTHENTICATION WINDOW INTERACTION HANDLERS
function openAuthModal() {
  const authModal = document.getElementById("aq-auth-modal");
  if (authModal) {
    authModal.classList.add("active");
    switchAuthTab("signin");
  }
}

function closeAuthModal() {
  const authModal = document.getElementById("aq-auth-modal");
  if (authModal) {
    authModal.classList.remove("active");
  }
}

function closeAuthModalOutside(event) {
  const authModal = document.getElementById("aq-auth-modal");
  if (event.target === authModal) {
    closeAuthModal();
  }
}

function switchAuthTab(targetView) {
  const tabSignIn = document.getElementById("tabSignIn");
  const tabSignUp = document.getElementById("tabSignUp");
  const viewSignIn = document.getElementById("formContainerSignIn");
  const viewSignUp = document.getElementById("formContainerSignUp");

  if (targetView === "signin") {
    tabSignIn.classList.add("active");
    tabSignUp.classList.remove("active");

    viewSignIn.classList.add("active");
    viewSignUp.classList.remove("active");
  } else {
    tabSignUp.classList.add("active");
    tabSignIn.classList.remove("active");

    viewSignUp.classList.add("active");
    viewSignIn.classList.remove("active");
  }
}

// user account system update
// USER LOGIN AND REGISTRATION FUNCTIONS

async function handleUserRegistration(event) {
  event.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const client_name = document.getElementById("regClientName").value.trim();
  const client_contact = document
    .getElementById("regClientContact")
    .value.trim();
  const client_address = document
    .getElementById("regClientAddress")
    .value.trim();

  if (
    !username ||
    !email ||
    !password ||
    !client_name ||
    !client_contact ||
    !client_address
  ) {
    if (typeof showToast === "function")
      showToast("Please fill in all profile fields.", "error");
    else alert("Please fill in all profile fields.");
    return;
  }

  try {
    const response = await fetch("../api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        client_name,
        client_contact,
        client_address,
      }),
    });

    const result = await response.json();

    if (result.status === "success") {
      showToast(result.message, "success", 2500);

      document.getElementById("userRegisterForm").reset();
      setTimeout(() => {
        switchAuthTab("signin");
      }, 2000);
    } else {
      showToast(result.message, "error", 3500);
    }
  } catch (error) {
    console.error("Registration Request Failure:", error);
    showToast(
      "Server dropped execution thread context. Check your configuration.",
      "error",
    );
  }
}

async function handleUserLogin(event) {
  event.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!username || !password) {
    showToast("Please provide both username and security password.", "error");
    return;
  }

  try {
    const response = await fetch("../api/userLogin.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (result.status === "success") {
      showToast(
        `Welcome back, ${result.user.name}! Access granted...`,
        "success",
        1500,
      );

      closeAuthModal();
      document.getElementById("userLoginForm").reset();

      setTimeout(() => {
        window.location.href = "account_dashboard.php";
      }, 1200);
    } else {
      showToast(result.message, "error", 3500);
    }
  } catch (error) {
    console.error("Login Request Failure:", error);
    showToast("Server dropped execution thread context.", "error");
  }
}
