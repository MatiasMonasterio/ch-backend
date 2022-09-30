const tableBody = document.querySelector("table tbody");

const showProductsOnView = async () => {
  const response = await fetch("/api/products-test");
  const { data: productsTest } = await response.json();

  const productsRows = productsTest.map((product) => buildProductRow(product));
  tableBody.innerHTML += productsRows;
};

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

showProductsOnView();
