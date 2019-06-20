const bcrypt = require("bcryptjs");

const { genCookie } = require("../utils/helper.js");
const { getUserByEmail } = require("../../database/queries/getUser");
const { loginSchema } = require("../utils/validationSchemes");

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  loginSchema
    .isValid({ email, password })
    .then(valid => {
      if (!valid) {
        const validationErr = new Error("Bad Request");
        validationErr.statusCode = 400;
        throw validationErr;
      }
      return getUserByEmail(email);
    })
    .then(user => {
      if (!user) {
        const authErr = new Error("Check your email or password");
        authErr.statusCode = 401;
        throw authErr;
      } else {
        return bcrypt.compare(password, user.password).then(passIsValid => {
          if (!passIsValid) {
            const authErr = new Error("Check your email or password");
            authErr.statusCode = 401;
            throw authErr;
          } else {
            const { password: pass, ...userResult } = user;
            res.cookie("jwt", genCookie(user));
            res.send({ data: userResult, statusCode: 200 });
          }
        });
      }
    })
    .catch(e => {
      const { statusCode, message } = e;
      return statusCode
        ? res.status(statusCode).send({ error: message, statusCode })
        : next(e);
    });
};
