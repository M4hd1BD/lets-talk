const Post = require('../database/models/post')

module.exports = (req, res) => {
    Post.findById(req.params.id, function(err, post) {
      if (err) {
        console.log(err);
        res.redirect('/')
      }
      else {
        res.render("post", {
            post
        });
      }
    });
}
