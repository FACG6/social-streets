const { deleteEvent, deletePublicService } = require('../../../database/queries/deletePost');

module.exports = (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user.id;
  const { type } = req.body;
  let callback;
  if (type === 'event') {
    callback = deleteEvent;
  } else if (type === 'public_services') {
    callback = deletePublicService;
  } else {
    throw Error('Bad Request');
  }
  callback(postId, userId)
    .then((response) => {
      if (!response.rowCount) {
        throw Error('Bad Request');
      } else {
        res.send({ statusCode: 200, data: response.rows[0] });
      }
    })
    .catch((err) => {
      const { message } = err;
      switch (message) {
        case 'Bad Request':
          res.status(400).send({ statusCode: 400, error: message });
          break;
        default:
          next(err);
      }
    });
};
