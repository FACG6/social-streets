const connection = require('./../config/connection');

exports.updatePasswordQuery = (userEmail, newPassword) => connection.query(`UPDATE "user" SET password = ${newPassword} WHERE email = ${userEmail} RETURNING 1`);
