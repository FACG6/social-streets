/* eslint-disable camelcase */
const { insertUser } = require("./../../../database/queries/insertUser");
const checkUser = require("./../../../database/queries/getUser");
const { userPostSchema } = require("./../../utils/validationSchemes");
const { hashPassword } = require("./../../utils/helper");

exports.post = (req, res, next) => {
  const userInfo = { ...req.body };
  userInfo.avatar = "avatar.png";
  userPostSchema
    .isValid(userInfo)
    .then(valid => {
      if (valid) return checkUser(userInfo.email);
      return res.status(400).send({
        error: "bad request",
        statusCode: 400
      });
    })
    .then(result => {
      if (!result) return hashPassword(userInfo.password);
      return res.status(400).send({
        error: "Email already exists.",
        statusCode: 400
      });
    })
    .then(hashedPass => {
      userInfo.password = hashedPass;
      return insertUser(userInfo);
    })
    .then(result => {
      const { password, ...userInfoResult } = result.rows[0];
      res.status(201).send({
        data: { ...userInfoResult },
        statusCode: 201
      });
    })
    .catch(next);
};
