const { getAuthPost } = require('../../../database/queries/getAuthPost');
const { getEvent, getPublicService } = require('./../../../database/queries/getPost');
const { fetchPostSchema } = require('./../../utils/validationSchemes');

exports.get = (req, res, next) => {
  const { id: idUser } = req.user;
  const { postId } = req.params;
  const { postType } = req.body;
  fetchPostSchema
    .validate({ postId, postType })
    .then((valid) => {
      if (valid) return getAuthPost(postType, postId, idUser);
      return res.status(400).send({
        error: 'bad request',
        statusCode: 400,
      });
    })
    .then((authRes) => {
      if (authRes.rowCount === 1) {
        if (postType === 'event') {
          return getEvent(postId);
        }
        if (postType === 'public_service') {
          return getPublicService(postId);
        }
      }
      return res.status(401).send({ error: 'unauthorized' });
    })
    .then(result => res.send({ data: result.rows, statusCode: 200 }))
    .catch(err => next(err));
};
