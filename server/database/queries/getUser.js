const dbConnection = require('../config/connection');

module.exports = email => dbConnection
  .query({
    sql: 'SELECT * FROM user WHERE email = $1',
    values: [email],
  })
  .then(res => res.rows.length && res.rows);
