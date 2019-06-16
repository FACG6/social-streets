const yup = require('yup');

module.exports = yup.object().shape({
  first_name: yup.string().min(3).required(),
  last_name: yup.string().min(3).required(),
  email: yup.string().email(),
  avatar: yup.string(),
});
