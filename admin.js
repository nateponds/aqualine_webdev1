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
        const response = await fetch('admin_login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert("Login Successful! Redirecting...");
            window.location.href = "viewOrderList.html";
        } else {
            alert(data.message || "Invalid Credentials");
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("System error. Please try again later.");
    }
}