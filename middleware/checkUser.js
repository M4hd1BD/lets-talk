const Users = require('../database/models/user')

module.exports = async (req, res, next) => {
    const user = req.params.user;
    const users = await Users.find( {username: user} );
    if(!users.length) {
        return res.redirect("/404");
    }

    next();
}
