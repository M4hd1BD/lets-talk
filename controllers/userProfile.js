const Posts = require('../database/models/post')
const Users = require('../database/models/user')

module.exports = async (req, res) => {
    const user = await Users.findOne( {username: req.params.user} );
    try {
      const posts = await Posts.find( {approved: true, username: user.username} ).sort({createdAt: -1})
      res.render("userProfile",{
        psts: posts,
        user: user
      });
    } catch (err) {
      console.error(err.message);
    }
}
