const express = require('express');
const cookieParser = require('cookie-parser');
const { join } = require('path');

require('dotenv').config();

const router = require('./controllers');


const app = express();

app.use(express.json());
app.use(cookieParser());

app.set('port', process.env.PORT || 5000);
app.use('/api/v1', router);

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
