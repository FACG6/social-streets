const connection = require('../config/connection');

const deleteEvent = postId => connection.query('DELETE from event where event.id = $1 RETURNING *', [postId]);

const deletePublicService = postId => connection.query('DELETE from public_service where public_service.id = $1 RETURNING *', [postId]);

module.exports = {
  deleteEvent,
  deletePublicService,
};
