const { deleteEvent, deletePublicService } = require('../../../database/queries/deletePost');

module.exports = (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const { type } = req.body;
  let callback;
  if (type === 'event') {
    callback = deleteEvent;
  } else if (type === 'public_services') {
    callback = deletePublicService
  } else {
    return res.status(400).send({ error: 'Bad Request', statusCode: 400 })
  }
  callback(postId, userId)
    .then((response) => {
      if (!response.rowCount) {
        res.status(400).send({ statusCode: 400, error: 'Bad Request' });
      } else {
        res.send({ statusCode: 200, data: response.rows[0] });
      }
    })
    .catch(next);
}

