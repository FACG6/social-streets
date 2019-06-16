const connection = require('../config/connection');

getDraftEvents = (publisherId) => connection.query(`
  SELECT id, category
  from event
  WHERE  is_draft = true and publisher_id = $1
`,
  [publisherId]
);

getDraftPublicServices = (publisherId) => connection.query(`
  SELECT id, primary_tag
  from public_service
  WHERE  is_draft = true and publisher_id = $1
`,
  [publisherId]
);

module.exports = { getDraftEvents, getDraftPublicServices };
