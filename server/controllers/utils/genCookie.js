const { sign } = require('jsonwebtoken');

module.exports = ({ id, email }) => sign({ id, email }, process.env.SECRET);
