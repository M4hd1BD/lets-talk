const path = require('path')
const Post = require('../database/models/post')
const User = require('../database/models/user')
let uname = "";
module.exports = (req, res) => {
    const {
        image
    } = req.files

    User.findById(req.session.userId, (error, user) => {
      if(error || !user){
        res.redirect('/');
      }
      else {
        uname = user.username;
      }
    })
    image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`,
            approved: true,
            username: uname
        }, (error, post) => {
            res.redirect("/");
        });
    })
}
