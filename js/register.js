let registerBtn = document.querySelector("#register-btn");

let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    firstName.value === "" ||
    lastName.value === "" ||
    email.value === "" ||
    password.value === ""
  ) {
    alert("please fill all fields");
  } else {
    localStorage.setItem("firstName", firstName.value);
    localStorage.setItem("lastName", lastName.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    setTimeout(() => {
      window.location = "login.html";
    });
  }
});
