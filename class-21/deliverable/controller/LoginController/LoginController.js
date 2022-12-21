class LoginController {
  async renderPage(req, res) {
    if (req.session.auth) return res.redirect("/");
    return res.render("login");
  }

  async renderErrorPage(req, res) {
    return res.render("error-login");
  }
}

module.exports = LoginController;
