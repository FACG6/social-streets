const dbConnection = require('../config/connection');

exports.getUserByEmail = email => dbConnection
  .query('SELECT * FROM "user" WHERE email = $1', [email])
  .then(res => res.rows.length && res.rows[0]);

const connection = require('../config/connection');

exports.getUserById = id => connection.query('select * from "user" where id = $1', [id]);
