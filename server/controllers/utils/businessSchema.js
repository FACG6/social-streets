const yup = require('yup');

exports.businessDataSchema = yup.object().shape({
  organization: yup.string().min(5).required(),
  businessType: yup.mixed().oneOf(['Business', 'Charity', 'Community', 'Organization', 'Education', 'Faith Group', 'Public service']).required(),
  website: yup.string().url().required(),
  city: yup.string().min(3).required(),
  country: yup.string().min(3).required(),
  address: yup.string().min(5).required(),
  zipCode: yup.number().min(4).required(),
  facebook: yup.string().url(),
  twitter: yup.string().url(),
  instagram: yup.string().url(),
});
