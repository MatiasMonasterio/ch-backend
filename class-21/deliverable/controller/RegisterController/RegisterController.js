class RegisterController {
  renderPage(_req, res) {
    return res.render("register");
  }

  renderErrorPage(_req, res) {
    return res.render("error-register");
  }
}

module.exports = RegisterController;
