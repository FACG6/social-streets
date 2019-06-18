const { compare } = require('bcryptjs');

const personalSchema = require('../../utils/personalSchema');
const { getPassword } = require('./../../../database/queries/getPassword');
const { updatePersonalDataQuery } = require('./../../../database/queries/updatePersonalData');

exports.updatePersonal = (req, res) => {
  const {
    oldPassword, firstName, lastName, email,
  } = req.body;
  const { id } = req.user;

  getPassword(req.user.id)
    .then(dbRes => compare(oldPassword, dbRes.rows[0].password))
    .then((passMatch) => {
      if (passMatch) {
        return personalSchema.isValid({
          firstName,
          lastName,
          email,
        });
      }
      return res.status(401).send({
        error: 'Bad Request',
        statusCode: 401,
      });
    })
    .then((valid) => {
      if (valid) return updatePersonalDataQuery(firstName, lastName, email, id);
      return res.status(401).send({
        error: 'Bad Request',
        statusCode: 401,
      });
    })
    .then(() => res.send({
      data: 'Personal Data Updated Successfully',
      statusCode: 200,
    }))
    .catch(() => {
      res.status(500).send({
        error: 'Internal Server Error',
        statusCode: 500,
      });
    });
};
