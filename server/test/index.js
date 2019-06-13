const {
  buildDb,
  buildFakeData,
  buildStaticData,
} = require('../database/config/build');

buildDb()
  .then(() => buildStaticData())
  .then(() => buildFakeData())
  .then(() => require('./queries/selectUsers'));
