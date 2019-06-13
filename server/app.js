const express = require('express');
const cookieParser = require('cookie-parser');
const { join } = require('path');
const uploadeMiddleware = require('multer');

require('dotenv').config();
const router = require('./controllers');

const app = express();

app.set('port', process.env.PORT || 5000);
// app.use(uploadeMiddleware());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', router);
app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

module.exports = app;
