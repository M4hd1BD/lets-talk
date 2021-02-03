const Posts = require('../database/models/post')

module.exports = async (req, res) => {

  try {
    const posts = await Posts.find()
    res.render("postDashboard",{
      posts
    });
  } catch (err) {
    console.error(err.message);
  }
}
