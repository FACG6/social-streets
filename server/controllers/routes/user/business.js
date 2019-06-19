const { compare } = require('bcryptjs');

const { getPassword } = require('./../../../database/queries/getPassword');
const { businessDataSchema } = require('../../utils/businessSchema');
const { updateBusinessDataQuery } = require('./../../../database/queries/updateBusinessData');

exports.updateBusiness = (req, res, next) => {
  const {
    oldPassword,
    name,
    type,
    website,
    city,
    country,
    address,
    zipCode,
    facebook,
    twitter,
    instagram,
  } = req.body;
  const { id } = req.user;

  getPassword(id)
    .then(dbRes => compare(oldPassword, dbRes.rows[0].password))
    .then((passMatch) => {
      if (passMatch) {
        return businessDataSchema.isValid({
          name,
          type,
          website,
          city,
          country,
          address,
          zipCode,
          facebook,
          twitter,
          instagram,
        });
      }
      const objError = new Error('Password not match');
      objError.statusCode = 400;
      throw objError;
    })
    .then((valid) => {
      if (valid) {
        return updateBusinessDataQuery(name,
          type,
          website,
          city,
          country,
          address,
          zipCode,
          facebook,
          twitter,
          instagram,
          id);
      }
      const objError = new Error('Bad Request');
      objError.statusCode = 400;
      throw objError;
    })
    .then(() => res.send({
      data: 'Business Data Updated Successfully',
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
