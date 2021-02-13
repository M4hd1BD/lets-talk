const Posts = require('../database/models/post')

module.exports = async (req, res) => {
    const user = req.params.user;
    try {
      const posts = await Posts.find( {approved: true, username: user} ).sort({createdAt: -1})
      res.render("userProfile",{
        psts: posts,
        username: user
      });
    } catch (err) {
      console.error(err.message);
    }
}
