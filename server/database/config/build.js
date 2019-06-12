const { readFileSync } = require("fs");
const { join } = require("path");

const dbConnection = require("./db_connection");

const buildDb = () => {
  const buildSql = readFileSync(join(__dirname, "build.sql")).toString();
  const staticSql = readFileSync(join(__dirname, "staticData.sql")).toString();
  return dbConnection.query(buildSql + staticSql);
};

const buildFakeData = () => {
  const sql = readFileSync(join(__dirname, "fakeData.test.sql")).toString();
  return dbConnection.query(sql);
};

module.exports = { buildDb, buildFakeData };
