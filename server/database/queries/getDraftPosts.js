const connection = require('../config/connection');

getEvents = (isDraft, publisherId) => connection.query(`
  SELECT id, category
  from event
  WHERE  is_draft = $1 and publisher_id = $2
`,
  [isDraft, publisherId]
);

getPublicServices = (isDraft, publisherId) => connection.query(`
  SELECT id, primary_tag
  from public_service
  WHERE  is_draft = $1 and publisher_id = $2
`,
  [isDraft ,publisherId]
);

module.exports = { getEvents, getPublicServices };
