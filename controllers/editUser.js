const path = require('path')
const User = require('../database/models/user')

module.exports = (req, res) => {
    const {
        proPic
    } = req.files;
    const { fullName, email } = req.body;
    console.log(req.body);
    console.log(fullName);
    console.log(email);
    console.log(proPic.name);
    console.log(req.session.userId);
    proPic.mv(path.resolve(__dirname, '..', 'public/users', proPic.name), (error) => {
        User.updateOne({
          _id: req.session.userId
        },
        {
          $set: {
            profilePic: `/users/${proPic.name}`,
            fullName: fullName,
            email: email
          }
        }, function (err) {

        })
    })
    res.redirect('/');
}
