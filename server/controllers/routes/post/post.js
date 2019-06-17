const {
  join
} = require('path');

const {
  addEvent,
  addTopic,
  addPublicServices,
  addSecondaryTag
} = require('../../../database/queries/postEvent');
const {
  eventSchema,
  publicServiceSchema
} = require('../../utils/postSchema');
const post = async (req, res, next) => {
  try {
    const {
      type,
      eventTopic,
      secondaryTag
    } = req.body;

    const {
      image
    } = req.files;
    const publisherId = Number(req.user.id)
  
    if (type === 'event') {
      if (!image) throw new Error();
      const valid = await eventSchema
        .isValid(req.body)
      if (valid) {
        const imageName = Date.now() + image.name;
        const addedEvent = await addEvent({
          ...req.body,
          publisherId,
          imageName
        })
        await Promise.all(eventTopic.map((topicId) => addTopic(addedEvent.rows[0].id, topicId)));
        image.mv(join(__dirname, '..', '..', '..', 'uploads', imageName), (err) => {
          if (err) {
            next(err)
          } else {
            res.status(201).send({
              data: {
                ...addedEvent.rows[0]
              },
              statusCode: 201
            })
          }
        })
      } else {
        const error = new Error('validation');
        error.statusCode = 400
        throw error;
      }
    } else if (type === 'public_services') {
      const valid = await publicServiceSchema
        .isValid(req.body)
      if (valid) {
        const imageName = Date.now() + image.name;
        const addedPublicServices = await addPublicServices({
          ...req.body,
          publisherId,
          imageName
        })
        await Promise.all(secondaryTag.map((secondaryTagId) => addSecondaryTag(addedPublicServices.rows[0].id, secondaryTagId)));
        image.mv(join(__dirname, '..', '..', '..', 'uploads', imageName), (err) => {
          if (err) {
            next(err)
          } else {
            res.status(201).send({
              data: {
                ...addedPublicServices.rows[0]
              },
              statusCode: 201
            })
          }
        })
      } else {
        const error = new Error('validation');
        error.statusCode = 400
        throw error;
      }
    } else {
      const error = new Error('Bad Request');
      error.statusCode = 400
      throw error;
    }
  } catch (err) {
    if (err.statusCode) {
      res.status(statusCode).send({
        error: err.message,
        statusCode: statusCode
      })
    } else {
      next(err)
    }
  }
};

module.exports = post;