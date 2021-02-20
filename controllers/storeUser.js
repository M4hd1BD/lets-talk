const User = require('../database/models/user')

module.exports = (req, res) => {
    User.create({
      ...req.body,
      administrator: false,
      profilePic: `/public/users/default.jpg`,
    }, (error, user) => {
        if (error) {
          const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
          req.flash('registrationErrors', registrationErrors)
          return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}
