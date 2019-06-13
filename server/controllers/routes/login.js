const bcrypt = require('bcrypt');
const yup = require('yup');

const getUser = require('database/queries/getUser');
const genCookie = require('controllers/utils/genCookie');

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
      getUser(email).then((user) => {
        if (!user) res.status(400).send('Bad Request');
        else {
          bcrypt.compare(password, user.password).then((passIsValid) => {
            if (!passIsValid) res.status(400).send('Bad Request');
            else {
              res.cookie('jwt', genCookie(user));
              res.status(200).send(user);
            }
          });
        }
      });
    })
    .catch(() => res.status(400).send('Bad Request'));
};
