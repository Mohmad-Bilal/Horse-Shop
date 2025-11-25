let userName = document.querySelector("#user");
let allUserContent = document.querySelector("#user-stuf");
let buttons = document.querySelector("#buttons");
let logoutBtn = document.querySelector("#logout");

if (localStorage.getItem("email")) {
  buttons.remove();

  allUserContent.style.display = "block";
  userName.innerHTML =
    localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
}

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(() => {
    window.location = "login.html";
  }, 1500);
});
