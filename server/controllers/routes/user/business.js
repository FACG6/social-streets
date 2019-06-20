const { compare } = require('bcryptjs');

const { getPassword } = require('./../../../database/queries/getPassword');
const { businessDataSchema } = require('../../utils/businessSchema');
const { updateBusinessDataQuery } = require('./../../../database/queries/updateBusinessData');

exports.updateBusiness = (req, res, next) => {
  const {
    oldPassword,
    organisationName,
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
          organisationName,
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
      const objError = new Error('Retry, password is wrong');
      objError.statusCode = 401;
      throw objError;
    })
    .then((valid) => {
      if (valid) {
        return updateBusinessDataQuery(organisationName,
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
    .then((dbToFront) => {
      const data = {
        id: dbToFront.rows[0].id,
        business_type: dbToFront.rows[0].business_type,
        website: dbToFront.rows[0].website,
        organisation_name: dbToFront.rows[0].organisation_name,
        address: dbToFront.rows[0].address,
        city: dbToFront.rows[0].city,
        country: dbToFront.rows[0].country,
        zip_code: dbToFront.rows[0].zip_code,
        facebook: dbToFront.rows[0].facebook,
        instagram: dbToFront.rows[0].instagram,
        twitter: dbToFront.rows[0].twitter,
      };
      res.send({
        data,
        statusCode: 200,
      });
    })
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
