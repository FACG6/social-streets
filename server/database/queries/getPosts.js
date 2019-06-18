const connection = require('../config/connection');

const getEvents = (isDraft, publisherId) => connection.query(`
  SELECT event.id, event_category.category, title
  FROM event 
  INNER JOIN event_category ON event_category.id = event.category 
  WHERE is_draft = $1 and publisher_id = $2
`,
  [isDraft, publisherId]
);

const getPublicServices = (isDraft, publisherId) => connection.query(`
  SELECT public_service.id, tag, title
  FROM public_service 
  INNER JOIN primary_tag ON primary_tag.id = public_service.primary_tag
  WHERE is_draft = $1 and publisher_id = $2
`,
  [isDraft, publisherId]
);

module.exports = { getEvents, getPublicServices };
