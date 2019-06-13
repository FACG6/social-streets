const getUser = require('./../../../database/queries/selectUser');

exports.getUser = (req, res, next) => {
  const userId = req.user.id;
  getUser(userId)
    .then((response) => {
      if (!response.rowCount) {
        res.status(400).send({ error: 'Bad Request', statusCode: 400 });
      } else {
        res.send({ data: response.rows[0], statusCode: 200 });
      }
    })
    .catch(error => next(error));
};
