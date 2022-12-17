async function renderPage(req, res) {
  if (req.session.auth) return res.redirect("/");
  return res.render("login");
}

async function renderErrorPage(req, res) {
  return res.render("error-login");
}

module.exports = { renderPage, renderErrorPage };
