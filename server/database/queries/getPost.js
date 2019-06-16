const connect = require("./../config/connection");

exports.getEvent = (eventId, userId) =>
  connect.query(
    `SELECT
   *,topic.topic
  FROM
   event 
  INNER JOIN
   event_category 
  ON
   event_category.id = event.category
  INNER JOIN
   event_topic
  ON
   event_topic.event_id = event.id
  INNER JOIN
   topic
  ON
   topic.id = event_topic.topic_id
  WHERE
   event.id=$1
  AND
   publisher_id=$2`,
    [eventId, userId]
  );

exports.getPublicService = (publicServiceId, userId) =>
  connect.query(
    `SELECT
        *,secondary_tag.tag
      FROM
        public_service
      INNER JOIN
        primary_tag
      ON
        primary_tag.id = public_service.primary_tag
      INNER JOIN
        public_service_tag
      ON
        public_service_tag.public_service_id = public_service.id
      INNER JOIN
        secondary_tag
      ON
        secondary_tag.id = public_service_tag.secondary_tag
      WHERE
        public_service.id=$1
      AND
        publisher_id=$2`,
    [publicServiceId, userId]
  );