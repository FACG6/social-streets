const connection = require('./../config/connection');

module.exports = userId => connection.query(`SELECT password FROM "user" WHERE id = ${userId}`);
