const { compare } = require('bcryptjs');

const personalSchema = require('../../utils/personalSchema');
const { getPassword } = require('./../../../database/queries/getPassword');
const { updatePersonalDataQuery } = require('./../../../database/queries/updatePersonalData');

exports.updatePersonal = (req, res, next) => {
  const {
    oldPassword, firstName, lastName, email,
  } = req.body;
  const { id } = req.user;

  getPassword(id)
    .then(dbRes => compare(oldPassword, dbRes.rows[0].password))
    .then((passMatch) => {
      if (passMatch) {
        return personalSchema.isValid({
          firstName,
          lastName,
          email,
        });
      }
      const objError = new Error('Retry, password is wrong');
      objError.statusCode = 400;
      throw objError;
    })
    .then((valid) => {
      if (valid) return updatePersonalDataQuery(firstName, lastName, email, id);
      const objError = new Error('Bad Request');
      objError.statusCode = 400;
      throw objError;
    })
    .then(() => res.send({
      data: 'Personal Data Updated Successfully',
      statusCode: 200,
    }))
    .catch((e) => {
      const { statusCode, message } = e;
      if (statusCode) {
        res.status(statusCode).send({
          statusCode, error: message,
        });
      } else {
        next(e);
      }
    });
};
