const User = require('../database/models/user')

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        if (user) {
            if (user.administrator == true) {
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
