const dbConnection = require('../config/connection');

module.exports = email => dbConnection
  .query('SELECT * FROM "user" WHERE email = $1', [email])
  .then(res => res.rows.length && res.rows[0]);
