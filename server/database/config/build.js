const { readFileSync } = require("fs");
const { join } = require("path");

const dbConnection = require("./db_connection");

function dbBuild() {
  const sql = readFileSync(join(__dirname, "build.sql")).toString();
  return dbConnection.query(sql);
}

function dbFakeData() {
  const sql = readFileSync(join(__dirname, "fakeData.sql")).toString();
  return dbConnection.query(sql);
}

module.exports = { dbBuild, dbFakeData };
