const connection = require('../config/connection');

getEvents = (isDraft, publisherId) => connection.query(`
  SELECT id, category, title
  from event
  WHERE  is_draft = $1 and publisher_id = $2
`,
  [isDraft, publisherId]
);


getPublicServices = (isDraft, publisherId) => connection.query(`
  SELECT id, primary_tag, title
  from public_service
  WHERE  is_draft = $1 and publisher_id = $2
`,
  [isDraft, publisherId]
);

module.exports = { getEvents, getPublicServices };
