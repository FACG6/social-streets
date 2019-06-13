/* eslint-disable camelcase */
const { insertUser } = require('./../../../database/queries/insertUser');
const { userPostSchema } = require('./../../utils/validationSchemes');
const { hashPassword } = require('./../../utils/helper');

exports.post = (req, res, next) => {
  const userInfo = { ...req.body.user };
  userInfo.avatar = 'avatar.png';
  userPostSchema
    .validate(userInfo)
    .then((valid) => {
      if (valid) return hashPassword(userInfo.password, 10);
      return res.status(400).send({
        error: 'bad request',
        statusCode: 400,
      });
    })
    .then((hashedPass) => {
      userInfo.password = hashedPass;
      return insertUser(userInfo);
    })
    .then((result) => {
      const { password, ...userInfoResult } = result.rows[0];
      res.status(201).send({
        data: { ...userInfoResult },
        statusCode: 201,
      });
    })
    .catch(next);
};
insertUser(userInfo);
