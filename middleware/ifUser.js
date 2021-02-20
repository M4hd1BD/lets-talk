const User = require('../database/models/user')

module.exports = (req, res, next) => {
  User.findById(req.session.userId, (error, user) => {
      if (user) {
          if (user.username == req.params.user) {
            next();
          }
          else {
            return res.redirect('/');
          }
      }
      else {
        return res.redirect('/');
      }
  })
}
