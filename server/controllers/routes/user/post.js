const yup = require('yup');
const insertUser = require('database/queries/insertUser');

exports.post = (req, res, next) => {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(3)
      .required(),
    lastName: yup
      .string()
      .min(3)
      .required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .min(8)
      .required(),
    orgName: yup.string().required(),
    typeOfBusiness: yup.string().required(),
    website: yup
      .string()
      .url()
      .required(),
    address: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    zipCode: yup.string().required(),
    facebook: yup
      .string()
      .url()
      .notRequired(),
    twitter: yup
      .string()
      .url()
      .notRequired(),
    instagram: yup
      .string()
      .url()
      .notRequired(),
  });

  const userInfo = req.body.user;
  const userInfoClone = { ...userInfo };
  userInfoClone.avatar = 'avatar.png';

  schema
    .isValid(userInfoClone)
    .then((valid) => {
      if (valid) return insertUser(userInfo);
      res.status(400).send({
        error: 'bad request',
        statusCode: 400,
      });
    })
    .then((result) => {
      const {
        firstName,
        lastName,
        email,
        password,
        orgName,
        typeOfBusiness,
        website,
        address,
        city,
        country,
        postalCode,
        facebook,
        twitter,
        instagram,
        avatar,
      } = result.rows[0];

      res.status(201).send({
        data: {
          firstName,
          lastName,
          email,
          password,
          orgName,
          typeOfBusiness,
          website,
          address,
          city,
          country,
          postalCode,
          facebook,
          twitter,
          instagram,
          avatar,
        },
        statusCode: 201,
      });
    })
    .catch(err => next(err));
};
