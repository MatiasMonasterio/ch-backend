function renderPage(_req, res) {
  return res.render("register");
}

function renderErrorPage(_req, res) {
  return res.render("error-register");
}

module.exports = { renderPage, renderErrorPage };
