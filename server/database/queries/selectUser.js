const connection = require('../config/connection');

module.exports = id => connection.query('select * from "user" where id = $1', [id]);
