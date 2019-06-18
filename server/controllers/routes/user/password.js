const { compare } = require('bcryptjs');

const { hashPassword } = require('../../utils/helper');
const passwordSchema = require('./../../utils/passwordSchema');
const {
  updatePasswordQuery,
} = require('./../../../database/queries/updatePassword');
const { getPassword } = require('./../../../database/queries/getPassword');

exports.updatePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;
  getPassword(req.user.id)
    .then(dbRes => compare(oldPassword, dbRes.rows[0].password))
    .then((passMatch) => {
      if (passMatch) return passwordSchema.isValid({ password: newPassword });
      const objError = new Error('Bad Request');
      objError.statusCode = 400;
      throw objError;
    })
    .then((valid) => {
      if (valid) return hashPassword(newPassword);
      const objError = new Error('Bad Request');
      objError.statusCode = 400;
      throw objError;
    })
    .then(newHashedPass => updatePasswordQuery(newHashedPass, id))
    .then(() => res.send({
      data: 'Updated Password Successfully',
      statusCode: 200,
    }))
    .catch(() => {
      res.status(500).send({
        error: 'Internal Server Error',
        statusCode: 500,
      });
    });
};
