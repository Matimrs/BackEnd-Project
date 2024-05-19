localStorage.clear();

const rootURL = `${window.location.protocol}//${window.location.host}/`;

const logout = document.getElementById("logout");

logout.addEventListener("click", async () => {
  const response = await fetch(`${rootURL}/api/session/logout`, {
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
      `${rootURL}/api/session/currentCart`,
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
    
 

  window.location.href = `${rootURL}/carts/${cid}`;
  
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred");
  }
});
