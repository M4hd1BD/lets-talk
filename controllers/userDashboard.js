const Users = require('../database/models/user')

module.exports = async (req, res) => {

  try {
    const users = await Users.find()
    res.render("userDashboard",{
      users
    });
  } catch (err) {
    console.error(err.message);
  }
}
