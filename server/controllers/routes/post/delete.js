const { deleteEvent, deletePublicService } = require('../../../database/queries/deletePost');

module.exports = (req, res, next) => {
  const eventId = req.params.postId;
  const { type: postType } = req.body;
  if (postType === 'event') {
    deleteEvent(eventId)
      .then((response) => {
        if (!response.rowCount) {
          res.status(400).send({ statusCode: 400, data: 'Bad Request' });
        } else {
          res.send({ statusCode: 200, data: response.rows[0] });
        }
      })
      .catch(error => next(error));
  } else if (postType === 'public_services') {
    deletePublicService(eventId)
      .then((response) => {
        if (!response.rowCount) {
          res.status(400).send({ statusCode: 400, data: 'Bad Request' });
        } else {
          res.send({ statusCode: 200, data: response.rows[0] });
        }
      })
      .catch(error => next(error));
  }
};

