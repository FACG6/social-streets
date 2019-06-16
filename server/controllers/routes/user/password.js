const { compare } = require('bcryptjs');

const hashPassword = require('../../utils/hashPassword');
const passwordSchema = require('./../../utils/passwordSchema');
const { updatePasswordQuery } = require('./../../../database/queries/updatePassword').updatePasswordQuery;
const { getPassword } = require('./../../../database/queries/getPassword').getPassword;

exports.updatePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  getPassword(req.user.id)
    .then(dbRes => compare(oldPassword, dbRes.rows[0].password))
    .then(() => {
      passwordSchema.isValid(newPassword);
    })
    .then((valid) => {
      if (valid) return hashPassword(newPassword);
      return res.status(400).send({
        error: 'Bad Request!',
        statusCode: 400,
      });
    })
    .then(updatePasswordQuery)
    .then(() => res.send({ data: 'Updated Password Successfully', statusCode: 200 }))
    .catch((e) => {
      res.status(500).send({
        error: 'Internal Server Error',
        statusCode: 500,
      });
    });
};
