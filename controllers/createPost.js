const Users = require('../database/models/user')

module.exports = (req, res) => {
    Users.findById(req.session.userId, function(err, user) {
      if (err) {
        console.log(err);
        res.redirect('/')
      }
      else {
        res.render("create", {
            user
        });
      }
    });
}
