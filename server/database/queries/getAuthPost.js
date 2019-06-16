const connect = require('../config/connection');

exports.getAuthPost = (postType, postId, userId) => connect.query(
  `SELECT 
    publisher_id
  FROM
    ${postType}
  WHERE
    id=$1
  AND
    publisher_id=$2`,
  [postId, userId],
);
