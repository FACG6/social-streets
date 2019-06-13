/* eslint-disable camelcase */
const { insertUser } = require('./../../../database/queries/insertUser');
const { userPostSchema } = require('./../../utils/validationSchemes');

exports.post = (req, res, next) => {
  const userInfo = { ...req.body.user };
  userInfo.avatar = 'avatar.png';

  userPostSchema
    .validate(userInfo)
    .then((valid) => {
      if (valid) return insertUser(userInfo);
      return res.status(400).send({
        error: 'bad request',
        statusCode: 400,
      });
    })
    .then((result) => {
      res.status(201).send({
        data: { ...result.rows[0] },
        statusCode: 201,
      });
    })
    .catch(next);
};
