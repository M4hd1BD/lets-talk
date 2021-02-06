const path = require('path')
const User = require('../database/models/user')

module.exports = (req, res) => {
  const {
      id,
      toDo
  } = req.body;

  if (toDo == 'Promote') {
    User.updateOne({_id: id},
    {administrator: true}, function (err) {
    });
  }

  else if (toDo == 'Demote') {
    User.updateOne({_id: id},
    {administrator: false}, function (err) {
    });
  }
    res.redirect("/dashboard/users");
}
