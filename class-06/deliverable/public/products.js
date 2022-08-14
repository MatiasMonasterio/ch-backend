const productForm = document.querySelector("#product-form");
const tableBody = document.querySelector("table tbody");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("input[name=name]").value;
  const price = document.querySelector("input[name=price]").value;
  const thumbnail = document.querySelector("input[name=image]").value;

  socket.emit("add-product", { title, price, thumbnail });
  productForm.reset();
});

socket.on("new-product", (newProduct) => {
  const productRow = buildProductRow(newProduct);
  tableBody.innerHTML += productRow;
});

const buildProductRow = ({ title, price, thumbnail }) => {
  return `
      <tr>
        <td>${title}</td>
        <td>${price}</td>
        <td>
          <img
            width="50"
            height="50"
            class="img-thumbnail"
            src=${thumbnail}
            alt=${title}
          />
        </td>
      </tr>
    `;
};
