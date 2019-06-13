/* eslint-disable camelcase */
const { insertUser } = require('./../../../database/queries/insertUser');
const { userPostSchema } = require('./../../utils/validationShcem');

exports.post = (req, res, next) => {
  const userInfo = req.body.user;
  const userInfoClone = { ...userInfo };
  userInfoClone.avatar = 'avatar.png';

  userPostSchema
    .validate(userInfoClone)
    .then((valid) => {
      if (valid) return insertUser(Object.values(userInfoClone));
      return res.status(400).send({
        error: 'bad request',
        statusCode: 400,
      });
    })
    .then((result) => {
      const {
        first_name,
        last_name,
        email,
        password,
        organisation_name,
        business_type,
        website,
        address,
        city,
        country,
        zip_code,
        facebook,
        twitter,
        instagram,
        avatar,
      } = result.rows[0];

      res.status(201).send({
        data: {
          first_name,
          last_name,
          email,
          password,
          organisation_name,
          business_type,
          website,
          address,
          city,
          country,
          zip_code,
          facebook,
          twitter,
          instagram,
          avatar,
        },
        statusCode: 201,
      });
    })
    .catch(next);
};
