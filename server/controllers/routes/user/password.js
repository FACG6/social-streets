const yup = require('yup');

const updatePasswordQuery = require('./../../../database/queries/updatePassword');

exports.updatePassword = (req, res, next) => {
  const schema = yup.object().shape({
    password: yup.string().min(8),
  });
  
};
