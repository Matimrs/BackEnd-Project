const btnPurchase = document.getElementById("btnPurchase");

/*btnPurchase.addEventListener("click", async () => {
    const response = await fetch("http://localhost:8080/api/session/currentCart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const cid = await response.json();

  console.log(cid);

  const response2 = await fetch(`http://localhost:8080/api/carts/${cid}/purchase`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const message = await response2.json();

  console.log(message);

  //location.reload()
});*/