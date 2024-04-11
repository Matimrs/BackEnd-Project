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

const restoreBtn = document.getElementById("restoreBtn");

restoreBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/session/restorePassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: inptEmail.value}),
      }
    );

    if (response.ok) {
      alert("Check your mailbox");
    }else if(response.status === 404){
      alert("User not found, wrong mail");
    }else {
      throw new Error("Error sending reset password request");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while sending the reset password request");
  }
});
