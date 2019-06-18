const connection = require('./../config/connection');

exports.updatePasswordQuery = (newPassword, userId) => connection.query('UPDATE "user" SET password = $1 WHERE id = $2 RETURNING true', [
  newPassword,
  userId,
]);
