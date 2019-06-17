const bcrypt = require('bcryptjs');

const { genCookie } = require('../utils/helper.js');
const getUser = require('../../database/queries/getUser');
const { loginSchema } = require('../utils/validationSchemes');

module.exports = (req, res) => {
  const { email, password } = req.body;

  loginSchema
    .isValid({ email, password })
    .then((valid) => {
      if (!valid) {
        const validationErr = new Error('Bad Request');
        validationErr.statusCode = 400;
        throw validationErr;
      }
      return getUser(email);
    })
    .then((user) => {
      if (!user) {
        const noUserErr = new Error(`User with email '${email}' does not exist`);
        noUserErr.statusCode = 400;
        throw noUserErr;
      } else {
        bcrypt
          .compare(password, user.password)
          .then((passIsValid) => {
            if (!passIsValid) res.status(400).send({ error: 'Wrong password', statusCode: 400 });
            else {
              const { password: pass, ...userResult } = user;
              res.cookie('jwt', genCookie(user));
              res.send({ data: userResult, statusCode: 200 });
            }
          })
          .catch(() => res.status(500).send({ error: 'Internal Server Error', statusCode: 500 }));
      }
    })
    .catch((e) => {
      const { statusCode } = e;
      switch (statusCode) {
        case 400:
          res.status(400).send({ error: e.message, statusCode: 400 });
          break;
        default:
          res.status(500).send({ error: 'Internal Server Error', statusCode: 500 });
      }
    });
};
