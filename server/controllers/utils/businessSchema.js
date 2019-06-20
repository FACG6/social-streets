const yup = require('yup');

exports.businessDataSchema = yup.object().shape({
  organisationName: yup.string().min(8).required(),
  type: yup.string().min(8).required(),
  website: yup.string().url().required(),
  city: yup.string().min(8).required(),
  country: yup.string().min(8).required(),
  address: yup.string().min(15).required(),
  zipCode: yup.number().min(5).required(),
  facebook: yup.string().url(),
  twitter: yup.string().url(),
  instagram: yup.string().url(),
});
