const connect = require('./../config/connection');

exports.insertUser = ({
  firstName,
  lastName,
  email,
  password,
  orgName,
  typeOfBusiness,
  website,
  address,
  city,
  country,
  zipCode,
  facebook,
  twitter,
  instagram,
  avatar,
}) => connect.query(
  `INSERT INTO 
    "user" 
    (first_name,last_name,email,password,business_type,website,organisation_name,address,city,country,zip_code,facebook,twitter,instagram,avatar) 
  VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
  RETURNING *`,
  [
    firstName,
    lastName,
    email,
    password,
    orgName,
    typeOfBusiness,
    website,
    address,
    city,
    country,
    zipCode,
    facebook,
    twitter,
    instagram,
    avatar,
  ],
);
