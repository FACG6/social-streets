const {
  getEvent,
  getPublicService,
} = require('./../../../database/queries/getPost');
const { fetchPostSchema } = require('./../../utils/validationSchemes');

exports.get = (req, res, next) => {
  const { id: idUser } = req.user;
  const { postId } = req.params;
  const { postType } = req.body;

  fetchPostSchema
    .isValid({ postId, postType, idUser })
    .then((validation) => {
      if (validation) {
        return postType === 'event'
          ? getEvent(postId, idUser)
          : getPublicService(postId, idUser);
      }
      return res.status(400).send({
        error: 'bad request',
        statusCode: 400,
      });
    })
    .then(result => res.send({ data: result.rows, statusCode: 200 }))
    .catch(err => next(err));
};
