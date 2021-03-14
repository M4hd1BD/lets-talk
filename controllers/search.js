const Posts = require('../database/models/post')
const Users = require('../database/models/user')

module.exports = async(req, res) => {
    const query = req.query.q;
    try {
        const posts = await Posts.find({ 
            $and: [
                {approved: true}, 
                {$or: [
                    {title: {$regex: query}}, 
                    {description: {$regex: query}}, 
                    {content: {$regex: query}}
                ]}
            ]
        }).sort({ createdAt: -1 });
        const counter = posts.length;
        res.render("searchPage", {
            psts: posts,
            count: counter
        });
    } catch (err) {
        console.error(err.message);
    }
}