// Profile
document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("Profile");
    var block = document.getElementsByClassName("profile");
    button.onclick = function () {
        block[0].classList.toggle("move");
    };
}, false);

// Login
function register(e) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var user = {
        email: email,
        pass: pass,
    }
    var json = JSON.stringify(user);
    localStorage.setItem(email, json);
    alert("Register successfully!");
    window.location.href = "index.html";

}

function login(e) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var user = localStorage.getItem(email);
    var data = JSON.parse(user);
    if (user == null) {
        alert("Enter email or password");
    } else if (email == data.email && pass == data.pass) {
        alert("Login successfully!");
        window.location.href = "Fitness&Health.html";
    } else {
        alert("This account is Invalid!")
    }
}
// Feedback
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form');
    const button = document.getElementById('submitFb');
    const nameInput = document.getElementById('nameFb');
    const emailInput = document.getElementById('emailFb');
    const feedbackInput = document.getElementById('feedback');

    button.onclick = function(event) {
        event.preventDefault();
        if (nameInput.value === '' || emailInput.value === '' || feedbackInput.value === '') {
            alert('Please fill in all fields.');
        } else {
            alert('Feedback submitted successfully!');
            form.reset();
        }
    };
});