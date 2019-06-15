const bcrypt = require('bcryptjs');

exports.hashPassword = password => bcrypt.hash(password, 12);
