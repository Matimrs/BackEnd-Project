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

const seeCart = document.getElementById("seeCart");

seeCart.addEventListener("click", async () => {
  const response = await fetch("http://localhost:8080/api/session/current", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  const cid = data.cart;

  const response2 = await fetch(`http://localhost:8080/carts/${cid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  window.location.href = `http://localhost:8080/carts/${cid}`;
});
