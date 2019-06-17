const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

exports.hashPassword = password => bcrypt.hash(password, 10);

exports.genCookie = ({ id, email }) => sign({ id, email }, process.env.SECRET);
