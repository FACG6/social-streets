const connection = require('../config/connection');

getDraftEvents = (publisherId, isDraft) => connection.query(`
  SELECT id, category
  from event
  WHERE  is_draft = $1 and publisher_id = $2
`,
  [isDraft, publisherId]
);

getDraftPublicServices = (publisherId, isDraft) => connection.query(`
  SELECT id, primary_tag
  from public_service
  WHERE  is_draft = $1 and publisher_id = $2
`,
  [isDraft ,publisherId]
);

module.exports = { getDraftEvents, getDraftPublicServices };
