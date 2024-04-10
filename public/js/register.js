const inptFirstName = document.getElementById("firstName");
const inptLastName = document.getElementById("lastName");
const inptEmail = document.getElementById("email");
const inptAge = document.getElementById("age");
const inptPassword = document.getElementById("password");

const firstNameExists = localStorage.getItem("firstName");
const lastNameExists = localStorage.getItem("lastName");
const emailExists = localStorage.getItem("email");
const ageExists = localStorage.getItem("age");
const passwordExists = localStorage.getItem("password");

if (firstNameExists) inptFirstName.value = firstNameExists;

if (lastNameExists) inptLastName.value = lastNameExists;

if (emailExists) inptEmail.value = emailExists;

if (ageExists) inptAge.value = ageExists;

if (passwordExists) inptPassword.value = passwordExists;

inptFirstName.addEventListener("change", () => {
  localStorage.setItem("firstName", inptFirstName.value);
});

inptLastName.addEventListener("change", () => {
  localStorage.setItem("lastName", inptLastName.value);
});

inptEmail.addEventListener("change", () => {
  localStorage.setItem("email", inptEmail.value);
});

inptAge.addEventListener("change", () => {
  localStorage.setItem("age", inptAge.value);
});

inptPassword.addEventListener("change", () => {
  localStorage.setItem("password", inptPassword.value);
});
