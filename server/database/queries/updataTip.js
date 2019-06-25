const connection = require('./../config/connection');

exports.updatePersonalDataQuery = (tip, id) => connection.query('UPDATE tip SET tip_description=$1 WHERE id=$2 RETURNING *', [tip, id]);
