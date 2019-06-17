const { join } = require('path');

const { eventSchema, publicServiceSchema } = require('../../utils/postSchema');
const {
  updateEventQuery,
  updateTopicQuery,
  updatePublicServiceQuery,
  updateSecondaryTagQuery,
} = require('../../../database/queries/updatePost');

const updateEvent = (req, res, next) => {
  const { postId: eventId } = req.params;
  const { eventTopic } = req.body;
  const { image } = req.files;
  let imageName = '';
  if (image) {
    imageName = Date.now() + image.name;
    image.mv(join(__dirname, '..', '..', '..', 'uploads', imageName), (err) => {
      if (err) next(err);
    });
  }

  eventSchema.isValid(req.body).then((valid) => {
    if (!valid) res.status(400).send({ error: 'Bad Request', statusCode: 400 });
    else {
      updateEventQuery(eventId, req.body, imageName)
        .then(() => eventTopic.forEach(topic => updateTopicQuery(eventId, topic)))
        .then(() => res.send({ data: 'Updated event successfully', statusCode: 200 }))
        .catch(next);
    }
  });
};

const updatePublicService = (req, res, next) => {
  const { postId: publicServiceId } = req.params;
  const { secondaryTag } = req.body;
  let imageName = '';
  if (req.files) {
    const { image } = req.files;
    imageName = Date.now() + image.name;
    image.mv(join(__dirname, '..', '..', '..', 'uploads', imageName), (err) => {
      if (err) next(err);
    });
  }

  publicServiceSchema.isValid(req.body).then((valid) => {
    if (!valid) res.status(400).send({ error: 'Bad Request', statusCode: 400 });
    else {
      updatePublicServiceQuery(publicServiceId, req.body, imageName)
        .then(() => secondaryTag.forEach(tag => updateSecondaryTagQuery(publicServiceId, tag)))
        .then(() => res.send({
          data: 'Updated public service successfully',
          statusCode: 200,
        }))
        .catch(next);
    }
  });
};

module.exports = (req, res, next) => {
  const { type } = req.body;
  if (type === 'event') updateEvent(req, res, next);
  else if (type === 'public_services') updatePublicService(req, res, next);
  else res.status(400).send('Unsupported type of post');
};
