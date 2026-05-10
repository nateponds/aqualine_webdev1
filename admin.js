const modal = document.getElementById("loginModal");
const btn = document.getElementById("adminBtn");
const span = document.querySelector(".close-modal");

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("loginForm").onsubmit = function(e) {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if(user === "admin" && pass === "1234") {
        alert("Login Successful! Redirecting...");
        window.location.href = "viewOrderList.html";
    } else {
        alert("Invalid Credentials");
    }
}