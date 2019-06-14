const connection = require('../config/connection');

addEvent = ( {title, description, category, image, event_datetime, venue, website, cost, focus_key, meta, alt_text, is_draft, publisher_id, publish_datetime} ) => {
  return connection.query(`
INSERT INTO event
      (title, description, category, event_datetime, venue, website, image, cost, focus_key, meta, alt_text, is_draft, publisher_id, publish_datetime)
VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`, [ title, description, category, event_datetime, venue,  website, image, cost, focus_key, meta, alt_text, is_draft, publisher_id, publish_datetime ]
);}

addTopic = (event_id, topicArray) => {
  connection.query(`
INSERT INTO event_topic
      (event_id, topic_id)
VALUES 
      ($1, $2) RETURNING *;`, [event_id, topicArray]
);}

addPublicServices = ({primary_tag, description, image, focus_key, alt_text, meta, publisher_id, publish_datetime, title, is_draft}) => {
  return connection.query(`
  INSERT INTO public_services
        (primary_tag, description, image, focus_key, alt_text, meta, publisher_id, publish_datetime, title, is_draft)
  VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`, [primary_tag, description, image, focus_key, alt_text, meta, publisher_id, publish_datetime, title, is_draft]
  ) 
}

addSecondaryTag = (public_services_id, secondary_tag) => {
   return connection.query(`
  INSERT INTO public_services_tag (public_services_id, secondary_tag)
  VALUES
      ($1, $2) RETURNING *;`, [public_services_id, secondary_tag]
)
}

module.exports = { addEvent, addTopic, addPublicServices, addSecondaryTag }