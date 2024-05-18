localStorage.clear();

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
  try {
    const response = await fetch(
      "http://localhost:8080/api/session/currentCart",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    const cid = data;

    //const email = data.email;
    
 

  window.location.href = `http://localhost:8080/carts/${cid}`;
  
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred");
  }
});
