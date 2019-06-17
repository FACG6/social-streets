const connection = require('../config/connection');

const deleteEvent = postId => connection.query('DELETE FROM event WHERE event.id = $1 RETURNING *', [postId]);

const deletePublicService = postId => connection.query('DELETE FROM public_service WHERE public_service.id = $1 RETURNING *', [postId]);

module.exports = {
  deleteEvent,
  deletePublicService,
};
