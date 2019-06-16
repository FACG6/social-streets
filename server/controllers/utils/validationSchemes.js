const yup = require('yup');

exports.userPostSchema = yup.object().shape({
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
