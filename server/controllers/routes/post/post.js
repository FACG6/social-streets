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
      secondaryTag,
    } = req.body;

    const {
      image
    } = req.files;
    const publisherId = Number(req.user.id)
    console.log(publisherId, 11111111);

    if (type === 'event') {
      if (!image) throw new Error();
      const valid = await eventSchema
        .validate(req.body)
      if (valid) {
        const imageName = Date.now() + image.name;
        const addedEvent = await addEvent({
          ...req.body,
          publisherId,
          imageName
        })
        await eventTopic.forEach(async (topicId) => {
          await addTopic(Number(addedEvent.rows[0].id), Number(topicId))
        });
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
        throw new Error();
      }
    } else if (type === 'public_services') {
      const valid = await publicServiceSchema
        .validate(req.body)
      if (valid) {
        const imageName = Date.now() + image.name;
        const addedPublicServices = await addPublicServices({
          ...req.body,
          publisherId,
          imageName
        })
        console.log(secondaryTag)
        await secondaryTag.forEach(async (secondaryTagId) => {
          await addSecondaryTag(Number(addedPublicServices.rows[0].id), Number(secondaryTagId))
        });
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
      } else throw new Error();
    } else throw new Error();
  } catch (err) {
    res.status(400).send({
      error: 'Bad Request',
      statusCode: 400
    })
  }
};

module.exports = post;