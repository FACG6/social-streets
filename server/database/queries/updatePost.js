const connection = require('../config/connection');

exports.updateEventQuery = (
  eventId,
  {
    title,
    description,
    category,
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
  imageName,
) => {
  if (imageName) {
    return connection.query(
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
  }
  return connection.query(
    'UPDATE event SET title = $1, description = $2, category = $3, event_datetime = $4, venue = $5, website = $6, cost = $7, focus_key = $8, meta = $9, alt_text = $10, is_draft = $11, publisher_id = $12, publish_datetime = $13 WHERE id = $14;',
    [
      title,
      description,
      category,
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
      eventId,
    ],
  );
};

exports.deleteTopicQuery = eventId => connection.query('DELETE FROM event_topic WHERE event_id = $1;', [eventId]);

exports.updatePublicServiceQuery = (
  publicServiceId,
  {
    primaryTag,
    description,
    focusKey,
    altText,
    meta,
    publisherId,
    publishDatetime,
    title,
    isDraft,
  },
  imageName,
) => {
  if (imageName) {
    return connection.query(
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
  }
  return connection.query(
    'UPDATE public_service SET primary_tag = $1, description = $2, focus_key = $3, alt_text = $4, meta = $5, publisher_id = $6, publish_datetime = $7, title = $8, is_draft = $9 WHERE id = $10;',
    [
      primaryTag,
      description,
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
};

exports.deleteSecondaryTagQuery = publicServiceId => connection.query('DELETE FROM public_service_tag WHERE public_service_id = $1;', [
  publicServiceId,
]);
