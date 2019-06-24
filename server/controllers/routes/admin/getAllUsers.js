const { getAllUsers } = require('../../../database/queries/getUser');

module.exports = (req, res, next) => getAllUsers()
  .then(dbRes => dbRes.rows.map((user) => {
    delete user.password;
    delete user.avatar;
    return user;
  }))
  .then(users => res.send({ data: users, statusCode: 200 }))
  .catch(next);
