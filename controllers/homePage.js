const Posts = require('../database/models/post')

module.exports = async (req, res) => {
  const limit = 5;
  const page = parseInt(req.params.page) || 1;

  try {
    // execute query with page and limit values
    const posts = await Posts.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await Posts.countDocuments();
    const total = Math.ceil(count / limit);
    var tpgs = [];

    // edge apparently don't iterate a number (i guess there's nothing to iterate)
    // that's why making that number into an array, so that I can iterate properly
    for (let i = 1; i <= total; i++) {
      tpgs.push(i);
    }

    // return response with posts, total pages, and current page
    res.render("index",{
      psts: posts,
      totalPages: tpgs,
      currentPage: page,
      total: total
    });
  } catch (err) {
    console.error(err.message);
  }
}
