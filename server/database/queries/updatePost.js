const connection = require('../config/connection');

exports.updateEventQuery = (
  eventId,
  {
    title,
    description,
    category,
    imageName,
    eventDatetime,
    venue,
    website,
    cost,
    focusKey,
    meta,
    altText,
    isDraft,
    publisherId,
    publishDatetime,
  },
) => connection.query(
  'UPDATE event SET title = $1, description = $2, category = $3, event_datetime = $4, venue = $5, website = $6, image = $7, cost = $8, focus_key = $9, meta = $10, alt_text = $11, is_draft = $12, publisher_id = $13, publish_datetime = $14 WHERE id = $15;',
  [
    title,
    description,
    category,
    eventDatetime,
    venue,
    website,
    imageName,
    cost,
    focusKey,
    meta,
    altText,
    isDraft,
    publisherId,
    publishDatetime,
    eventId,
  ],
);

exports.updateTopicQuery = (eventId, topicId) => connection.query('UPDATE event_topic SET topic_id = $1 WHERE event_id = $2;', [topicId, eventId]);

exports.updatePublicServiceQuery = (
  publicServiceId,
  {
    primaryTag,
    description,
    imageName,
    focusKey,
    altText,
    meta,
    publisherId,
    publishDatetime,
    title,
    isDraft,
  },
) => connection.query(
  'UPDATE public_service SET primary_tag = $1, description = $2, image = $3, focus_key = $4, alt_text = $5, meta = $6, publisher_id = $7, publish_datetime = $8, title = $9, is_draft = $10 WHERE id = $11;',
  [
    primaryTag,
    description,
    imageName,
    focusKey,
    altText,
    meta,
    publisherId,
    publishDatetime,
    title,
    isDraft,
    publicServiceId,
  ],
);

exports.updateSecondaryTagQuery = (publicServiceId, secondaryTag) => connection.query(
  'UPDATE public_service_tag SET secondary_tag = $1 WHERE public_service_id = $2;',
  [secondaryTag, publicServiceId],
);
