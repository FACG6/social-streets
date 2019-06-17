const connection = require('../config/connection');

const getEvents = (isDraft, publisherId) => connection.query(`
  SELECT id, category, title
  from event
  WHERE  is_draft = $1 and publisher_id = $2
`,
  [isDraft, publisherId]
);

const getPublicServices = (isDraft, publisherId) => connection.query(`
  SELECT id, primary_tag, title
  from public_service
  WHERE  is_draft = $1 and publisher_id = $2
`,
  [isDraft, publisherId]
);

module.exports = { getEvents, getPublicServices };
