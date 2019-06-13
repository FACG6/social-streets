const connection = require('../config/connection');

module.exports = ({title, description, category, event_datetime, venue, website, cost, image, focus_key, meta, alt_text, is_draft, publisher_id, publish_datetime}) => connection.query(`
INSERT INTO event
(title, description, category, event_datetime, venue, website, cost, image, focus_key, meta, alt_text, is_draft, publisher_id, publish_datetime)
VALUES ('The main Event', ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', 1, '11/6/ 2019 - 04.30 p.m', 'Abed al Aziz Venue',  'www.gaza-sky-geeks.com', '15', 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress& cs=tinysrgb&dpr=1&w=500', 'Lorem', 'Lorem  Ipsum is simply dummy text of the printing  and typesetting industry.', 'alt text', false, 2, '11/4/2019 - 02.23 p.m')
returning *`,
[title, description, category, event_datetime, venue, website, cost, image, focus_key, meta, alt_text, is_draft, publisher_id, publish_datetime]);
