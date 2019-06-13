const bcrypt = require('bcryptjs');

const { genCookie } = require('../utils/helper.js');
const getUser = require('../../database/queries/getUser');
const schema = require('../utils/loginSchema');

module.exports = (req, res) => {
  const { email, password } = req.body;

  schema
    .isValid({ email, password })
    .then(() => {
      getUser(email)
        .then((user) => {
          if (!user) {
            res
              .status(400)
              .send({ error: `User with email '${email}' does not exist`, statusCode: 400 });
          } else {
            bcrypt.compare(password, user.password).then((passIsValid) => {
              if (!passIsValid) res.status(400).send({ error: 'Wrong password', statusCode: 400 });
              else {
                const { password: pass, ...userResult } = user;
                res.cookie('jwt', genCookie(user));
                res.status(200).send({ data: userResult, statusCode: 200 });
              }
            });
          }
        })
        .catch(() => res.status(500).send({ error: 'Internal Server Error', statusCode: 500 }));
    })
    .catch(() => res.status(400).send({ error: 'Bad Request', statusCode: 400 }));
};
