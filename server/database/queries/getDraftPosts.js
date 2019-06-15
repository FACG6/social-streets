const connection = require('../config/connection');

getDraftEvents = (publisher_id) => connection.query(`
  SELECT id, category
  from event
  WHERE  is_draft = true and publisher_id = $1
`,
  [publisher_id]
);

getDraftPublicServices = (publisher_id) => connection.query(`
  SELECT id, primary_tag
  from public_service
  WHERE  is_draft = true and publisher_id = $1
`,
  [publisher_id]
);

module.exports = { getDraftEvents, getDraftPublicServices };
