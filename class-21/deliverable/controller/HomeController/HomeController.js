const { ProductService } = require("../../services");

const productService = new ProductService();

class HomeController {
  constructor() {}

  async renderPage(req, res) {
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
}

module.exports = HomeController;
