const { rmdir } = require('fs');
const { join } = require('path');

const { eventSchema, publicServiceSchema } = require('../../utils/postSchema');
const {
  updateEventQuery,
  deleteTopicQuery,
  updatePublicServiceQuery,
  deleteSecondaryTagQuery,
} = require('../../../database/queries/updatePost');
const getPostPublisher = require('../../../database/queries/getPostPublisher');
const getPostImg = require('../../../database/queries/getPostImg');
const { addTopic, addSecondaryTag } = require('../../../database/queries/postEvent');

const updateEvent = async (req, res, next) => {
  const { postId: eventId } = req.params;
  const { eventTopic } = req.body;
  const { image } = req.files;
  let imageName = '';
  if (image) {
    imageName = Date.now() + image.name;
    try {
      await image.mv(join(__dirname, '..', '..', '..', 'uploads', imageName));
    } catch (err) {
      next(err);
    }
    getPostImg('event', eventId).then((postImg) => {
      rmdir(join(__dirname, '..', '..', '..', 'uploads', postImg), console.warn);
    });
  }

  eventSchema
    .isValid(req.body)
    .then((valid) => {
      if (!valid) {
        const valErr = new Error('Bad Request');
        valErr.statusCode = 400;
        throw valErr;
      }
      return getPostPublisher('event', eventId);
    })
    .then((publisherId) => {
      if (publisherId !== req.user.id) {
        const authErr = new Error('Unauthorized');
        authErr.statusCode = 401;
        throw authErr;
      }
      return updateEventQuery(eventId, req.body, imageName);
    })
    .then(() => deleteTopicQuery(eventId))
    .then(() => Promise.all(eventTopic.map(topic => addTopic(eventId, topic))))
    .then(() => res.send({ data: 'Updated event successfully', statusCode: 200 }))
    .catch((e) => {
      const { statusCode } = e;
      switch (statusCode) {
        case 400:
          res.status(400).send({ error: e.message, statusCode: 400 });
          break;
        case 401:
          res.status(401).send({ error: e.message, statusCode: 401 });
          break;
        default:
          next(e);
      }
    });
};

const updatePublicService = async (req, res, next) => {
  const { postId: publicServiceId } = req.params;
  const { secondaryTag } = req.body;
  let imageName = '';
  if (req.files) {
    const { image } = req.files;
    imageName = Date.now() + image.name;
    try {
      await image.mv(join(__dirname, '..', '..', '..', 'uploads', imageName));
    } catch (err) {
      next(err);
    }
    getPostImg('public_service', publicServiceId).then((postImg) => {
      rmdir(join(__dirname, '..', '..', '..', 'uploads', postImg), console.warn);
    });
  }

  publicServiceSchema
    .isValid(req.body)
    .then((valid) => {
      if (!valid) {
        const valErr = new Error('Bad Request');
        valErr.statusCode = 400;
        throw valErr;
      }
      return getPostPublisher('public_service', publicServiceId);
    })
    .then((publisherId) => {
      if (publisherId !== req.user.id) {
        const authErr = new Error('Unauthorized');
        authErr.statusCode = 401;
        throw authErr;
      }
      return updatePublicServiceQuery(publicServiceId, req.body, imageName);
    })
    .then(() => deleteSecondaryTagQuery(publicServiceId))
    .then(() => Promise.all(secondaryTag.map(tag => addSecondaryTag(publicServiceId, tag))))
    .then(() => res.send({
      data: 'Updated public service successfully',
      statusCode: 200,
    }))
    .catch((e) => {
      const { statusCode } = e;
      switch (statusCode) {
        case 400:
          res.status(400).send({ error: e.message, statusCode: 400 });
          break;
        case 401:
          res.status(401).send({ error: e.message, statusCode: 401 });
          break;
        default:
          next(e);
      }
    });
};

module.exports = (req, res, next) => {
  const { type } = req.body;
  if (type === 'event') updateEvent(req, res, next);
  else if (type === 'public_services') updatePublicService(req, res, next);
  else res.status(400).send({ error: 'Unsupported type of post', statusCode: 400 });
};
