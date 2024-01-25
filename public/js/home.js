const logout = document.getElementById("logout");

logout.addEventListener("click", async () => {
  const response = await fetch("http://localhost:8080/api/session/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  window.location.href = data.redirect;
});
