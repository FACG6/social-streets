const { hash } = require('bcryptjs');

exports.hashPassword = password => hash(password, 10);
