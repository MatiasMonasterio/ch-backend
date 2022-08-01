const form = document.querySelector("form");
const toastLive = document.getElementById("liveToast");

const toast = new bootstrap.Toast(toastLive);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const price = document.querySelector("#price").value;
  const thumbnail = document.querySelector("#thumbnail").value;

  const respone = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, price, thumbnail }),
  });

  const { data: newProduct } = await respone.json();
  const { id } = newProduct;

  const toastMessage = document.querySelector("#toast-message");
  toastMessage.innerHTML = `New Product! ${title} was upload with id ${id}`;

  toast.show();
  form.reset();
});
