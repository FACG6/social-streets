const { compare } = require('bcryptjs');

const { getPassword } = require('./../../../database/queries/getPassword');
const { updateBusinessDataQuery } = require('./../../../database/queries/updateBusinessData');

exports.updateBusiness = (req, res, next) => {
  console.log('object');
  console.log(req.body);
};
