const connect = require('database/config/dbConnection');

exports.insertUser = userInfo => connect.query(`INSERT INTO 
                                                  user 
                                                  (first_name,last_name,email,password,org_name,business_type,website,address,city,country,zip_code,facebook,twitter,instagram,avatar) 
                                                VALUES
                                                  ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
                                                RETURNING * `, Object.values(userInfo));
