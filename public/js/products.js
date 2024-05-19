const rootURL = `${window.location.protocol}//${window.location.host}/`;

const buttons = document.getElementsByClassName("addToCart");

async function addToCart(event) {
  const btn = event.target; // Obtiene el botón que se hizo clic

  try {
    // Se recupera la información del usuario dentro del controlador de clic
    const response = await fetch(`${rootURL}api/session/current`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();

    const result = await fetch(
      `${rootURL}api/carts/${user.cart}/product/${btn.id}`,
      {
        body: JSON.stringify({}), // Suponiendo que tiene un cuerpo vacío para agregar productos
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!result.ok) { // Verifica si la respuesta es exitosa
      const data = await result.json(); 
      const error = data.message;
      alert(`Error adding product: ${error}`);
    } else {
      alert("Product added successfully!");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    alert("An error occurred. Try again later.");
  }
}

// Se adjunta el controlador de eventos a todos los botones (ajustar si el carrito es específico del usuario)
for (const btn of buttons) {
  btn.addEventListener("click", addToCart);
}

const logout = document.getElementById("logout");

logout.addEventListener("click", async () => {
  const response = await fetch(`${rootURL}api/session/logout`, {
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
      `${rootURL}api/session/currentCart`,
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
    
 

  window.location.href = `${rootURL}carts/${cid}`;
  
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred");
  }
});