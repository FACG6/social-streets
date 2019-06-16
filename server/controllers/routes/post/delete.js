const { deleteEvent, deletePublicService } = require('../../../database/queries/deletePost');

exports.deleteEvent = (req, res, next) => {
  const eventId = req.params.postId;
  deleteEvent(eventId)
    .then((response) => {
      if (!response.rowCount) {
        res.status(400).send({ statusCode: 400, data: 'Bad Request' });
      } else {
        res.send({ statusCode: 200, data: response.rows[0] });
      }
    })
    .catch(error => next(error));
};

exports.deletePublicService = (req, res, next) => {
  const eventId = req.params.postId;
  deletePublicService(eventId)
    .then((response) => {
      if (!response.rowCount) {
        res.status(400).send({ statusCode: 400, data: 'Bad Request' });
      } else {
        res.send({ statusCode: 200, data: response.rows[0] });
      }
    })
    .catch(error => next(error));
};
