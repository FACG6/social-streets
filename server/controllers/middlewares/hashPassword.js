const bcrypt = require('bcryptjs');

exports.hashPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (error, hashPassword) => {
    if (error) {
      res.status(500).send({ error: 'Internal Server Error!' });
    } else {
      req.body.password = hashPassword;
      next();
    }
  });
};
