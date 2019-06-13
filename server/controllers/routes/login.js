const bcrypt = require('bcryptjs');
const yup = require('yup');

const genCookie = require('../utils/genCookie');
const getUser = require('../../database/queries/getUser');

module.exports = (req, res) => {
  const { email, password } = req.body;

  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required(),
  });

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
                const userToRes = user;
                delete userToRes.password;
                res.cookie('jwt', genCookie(user));
                res.status(200).send({ data: userToRes, statusCode: 200 });
              }
            });
          }
        })
        .catch(() => res.status(500).send({ error: 'Internal Server Error', statusCode: 500 }));
    })
    .catch(() => res.status(400).send({ error: 'Bad Request', statusCode: 400 }));
};
