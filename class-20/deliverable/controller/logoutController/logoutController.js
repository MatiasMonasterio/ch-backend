function renderPage(req, res) {
  const { name } = req.session;

  req.session.destroy((error) => {
    if (error) return res.send(`Logout error ${error}`);
    return res.render("logout", { username: name });
  });
}

module.exports = { renderPage };
