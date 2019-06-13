const { Pool } = require('pg');
const { parse } = require('url');

let dbURL = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'test') dbURL = process.env.TEST_DATABASE_URL;

if (!dbURL) {
  throw new Error('No Database !');
}

const params = parse(dbURL);
const [user, password] = params.auth.split(':');
const { path, hostname: host, port } = params;

const config = {
  user,
  password,
  database: path.split('/')[1],
  host,
  port,
  ssl: !(host === 'localhost'),
};

module.exports = new Pool(config);
