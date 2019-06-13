const connection = require('../config/connection');

module.exports = id => connection.query('select first_name, last_name, email, avatar, organisation_name, business_type, website, address, city, country, zip_code, facebook, instagram, twitter from "user" where id = $1', [id]);
