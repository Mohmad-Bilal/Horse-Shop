let loginBtn = document.querySelector("#login-btn");

let email = document.querySelector("#email");
let password = document.querySelector("#password");

let storedEmail = localStorage.getItem("email");
let storedPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (email.value === "" || password.value === "") {
    alert("please fill all fields");
  } else {
    if (
      storedEmail &&
      storedEmail.trim() === email.value.trim() &&
      storedPassword &&
      storedPassword.trim() === password.value.trim()
    ) {
      setTimeout(() => {
        window.location = "index.html";
      });
    } else {
      alert("Invalid email or password");
    }
  }
});
