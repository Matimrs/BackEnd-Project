const buttons = document.getElementsByClassName("addToCart");

async function addToCart(event) {
  const btn = event.target; // Obtiene el botón que se hizo clic

  try {
    // Se recupera la información del usuario dentro del controlador de clic
    const response = await fetch(`http://localhost:8080/session/current`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();

    const result = await fetch(
      `http://localhost:8080/api/carts/${user.cart}/product/${btn.id}`,
      {
        body: JSON.stringify({}), // Suponiendo que tiene un cuerpo vacío para agregar productos
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!result.ok) { // Verifica si la respuesta es exitosa
      const error = await result.text(); // Obtiene el mensaje de error de la respuesta
      alert(`Error al agregar producto: ${error}`);
    } else {
      alert("¡Producto agregado exitosamente!");
    }
  } catch (error) {
    console.error("Error al agregar producto:", error);
    alert("Ocurrió un error. Inténtalo de nuevo más tarde."); // Mensaje amigable para el usuario
  }
}

// Se adjunta el controlador de eventos a todos los botones (ajustar si el carrito es específico del usuario)
for (const btn of buttons) {
  btn.addEventListener("click", addToCart);
}