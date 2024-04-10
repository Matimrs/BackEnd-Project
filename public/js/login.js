const inptEmail = document.getElementById("email");
const inptPassword = document.getElementById("password");

const emailExists = localStorage.getItem("email");
const passwordExists = localStorage.getItem("password");

if (emailExists) inptEmail.value = emailExists;

if (passwordExists) inptPassword.value = passwordExists;

inptEmail.addEventListener("change", () => {
  localStorage.setItem("email", inptEmail.value);
});

inptPassword.addEventListener("change", () => {
  localStorage.setItem("password", inptPassword.value);
});

// desarrollar logica para que cuando toquen restore password muestre un mensaje y envie el mail
