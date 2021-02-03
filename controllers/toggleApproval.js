const path = require('path')
const Post = require('../database/models/post')

module.exports = (req, res) => {
  const {
      id,
      toDo
  } = req.body;

  if (toDo == 'Approve') {
    Post.updateOne({_id: id},
    {approved: true}, function (err) {
    });
  }

  else if (toDo == 'Disapprove') {
    Post.updateOne({_id: id},
    {approved: false}, function (err) {
    });
  }
    res.redirect("/dashboard/posts");
}
