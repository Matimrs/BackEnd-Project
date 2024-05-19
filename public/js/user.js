const rootURL = `${window.location.protocol}//${window.location.host}/`;

const btnChangeRole = document.getElementById("btnChangeRole");

const btnDelete = document.getElementById("btnDelete");

const id = document.getElementById("id").textContent;

btnChangeRole.addEventListener("click", async () => {
  try {
    const response = await fetch(
      `${rootURL}/api/users/premium/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response) alert("An error occurred while changing role");
    else {
      const data = await response.json();
      alert(data.message);
      location.reload();
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while changing role");
  }
});

btnDelete.addEventListener("click", async () => {
  try {
    const response = await fetch(
      `${rootURL}/api/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response) alert("An error occurred while eliminating user");
    else {
      const data = await response.json();
      alert(data.message);
      location.reload();
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while eliminating user");
  }
});
