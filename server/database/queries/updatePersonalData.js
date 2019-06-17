const connection = require('./../config/connection');

exports.updatePersonalDataQuery = (first_name, last_name, email, avatar, user_id) => {
  connection.query('UPDATE "user" SET first_name=$1, last_name=$2, email=$3, avatar=$4 WHERE id=$5 RETURNING true',[first_name, last_name, email, avatar, user_id]);
};
