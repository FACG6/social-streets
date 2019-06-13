const connect = require('./../config/connection');

exports.insertUser = userInfo => connect.query(`INSERT INTO 
                                                  "user" 
                                                  (first_name,last_name,email,password,business_type,website,organisation_name,address,city,country,zip_code,facebook,twitter,instagram,avatar) 
                                                VALUES
                                                  ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
                                                RETURNING * `, Object.values(userInfo));
