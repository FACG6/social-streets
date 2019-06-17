const { compare } = require('bcryptjs');

const personalSchema = require('../../utils/personalSchema');
const { getPassword } = require('./../../../database/queries/getPassword');
const { updatePersonalDataQuery } = require('./../../../database/queries/updatePersonalData');

exports.updatePersonal = (req, res) => {
  console.log(req.body);
  const { oldPassword, first_name, last_name, email, avatar } = req.body;

  getPassword(req.user.id)
    .then(dbRes => compare(oldPassword, dbRes.rows[0].password))
    .then(passMatch => {
      if (passMatch) return personalSchema.isValid({ 
        first_name: first_name,
        last_name: last_name,
        email: email,
        avatar: avatar
       });
      return res.status(400).send({
        error: "Wrong Personal Data",
        statusCode: 400
      });
    })
    .then(valid => {
      if (valid) {
        data = {
          first_name,
          last_name,
          email,
          avatar,
          id: req.body.id
        }
      } else {
        return res.status(400).send({
          error: "Bad Request!",
          statusCode: 400
        });
      }
    })
    .then(newHashedPass => updatePasswordQuery(newHashedPass, req.user.id))
    .then(() =>
      res.send({ data: "Updated Password Successfully", statusCode: 200 })
    )
    .catch(e => {
      res.status(500).send({
        error: "Internal Server Error",
        statusCode: 500
      });
    });
}
