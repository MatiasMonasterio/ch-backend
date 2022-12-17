const { productService } = require("../../services");

async function renderPage(req, res) {
  const { passport } = req.session;

  try {
    const products = await productService.getAll();

    return res.render("index", {
      username: passport.user.email,
      products: products,
    });
  } catch (error) {
    console.error(error);
    return res.send("Error 500");
  }
}

module.exports = { renderPage };
