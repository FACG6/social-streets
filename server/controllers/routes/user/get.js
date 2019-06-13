const getUser = require('database/queries/selectUser');

exports.getUser = (req, res, next) => {
  const userId = req.user.id;
  getUser(userId)
    .then((response) => {
      if (!response.rowCount) {
        res.status(400).send('Bad Request');
      } else {
        res.send(response.rows[0]);
      }
    })
    .catch(error => next(error));
};
