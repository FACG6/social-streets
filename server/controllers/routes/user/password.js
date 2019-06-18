const { compare } = require('bcryptjs');

const { hashPassword } = require('../../utils/helper');
const passwordSchema = require('./../../utils/passwordSchema');
const {
  updatePasswordQuery,
} = require('./../../../database/queries/updatePassword');
const { getPassword } = require('./../../../database/queries/getPassword');

exports.updatePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  getPassword(req.user.id)
    .then(dbRes => compare(oldPassword, dbRes.rows[0].password))
    .then((passMatch) => {
      if (passMatch) return passwordSchema.isValid({ password: newPassword });
      return res.status(401).send({
        error: 'Wrong Password',
        statusCode: 401,
      });
    })
    .then((valid) => {
      if (valid) return hashPassword(newPassword);
      return res.status(400).send({
        error: 'Bad Request!',
        statusCode: 400,
      });
    })
    .then(newHashedPass => updatePasswordQuery(newHashedPass, req.user.id))
    .then(() => res.send({ data: 'Updated Password Successfully', statusCode: 200 }))
    .catch(() => {
      res.status(500).send({
        error: 'Internal Server Error',
        statusCode: 500,
      });
    });
};
