//const emailExists = localStorage.getItem("email");
const passExists = localStorage.getItem("password");

const emailInpt = document.getElementById("email");
const passwordBtn = document.getElementById("passwordBtn");
const passwordInpt = document.getElementById("passwordInput");
const confirmPasswordInpt = document.getElementById("confirmPassword");

//if (emailExists) emailInpt.value = emailExists;

if (passExists) passwordInpt.value = passExists;

passwordBtn.addEventListener("click", () => {
  switch (passwordInpt.type) {
    case "password":
      passwordInpt.type = "text";
      passwordBtn.textContent = "Hide";
      break;
    default:
      passwordInpt.type = "password";
      passwordBtn.textContent = "Show";
      break;
  }
});

/*emailInpt.addEventListener("change", () => {
  localStorage.setItem("email", emailInpt.value);
});*/

passwordInpt.addEventListener("change", () => {
  localStorage.setItem("password", passwordInpt.value);
});

const restoreForm = document.getElementById("restoreForm");

restoreForm.addEventListener("submit", (event) => {
  const password = passwordInpt.value;
  const confirmPassword = confirmPasswordInpt.value;

  if (password !== confirmPassword) {
    alert("Passwords dont match");

    event.preventDefault();
  }
});
