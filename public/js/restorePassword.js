const rootURL = `${window.location.protocol}//${window.location.host}/`;

const passExists = localStorage.getItem("password");

const emailInpt = document.getElementById("email");
const passwordBtn = document.getElementById("passwordBtn");
const passwordInpt = document.getElementById("passwordInput");
const confirmPasswordInpt = document.getElementById("confirmPassword");

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

passwordInpt.addEventListener("change", () => {
  localStorage.setItem("password", passwordInpt.value);
});

const restoreForm = document.getElementById("restoreForm");

restoreForm.addEventListener("submit", async (event) => {
  const password = passwordInpt.value;
  const confirmPassword = confirmPasswordInpt.value;
  event.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords dont match");

  } else {
    const token = document.getElementById("token").textContent;
    const response = await fetch(
      `${rootURL}api/session/restorePassword/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      }
    );

    if (response.status === 401) {
      alert("Your password reset time expired");
    } else {
      alert("Your password has been reset");
    }

    window.location.href = `${rootURL}/login`;
  }
});
