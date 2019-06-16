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
  publicServicesSchema
} = require('../../utils/postSchema');

const post = async (req, res, next) => {
  try {
    const {
      type,
      eventTopic,
      secondary_tag
    } = req.body;
    const {
      id: publisher_id
    } = req.user.id;
    const {
      image
    } = req.files;

    if (type === 'event') {
      if (!image) throw new Error();
      const valid = await eventSchema
        .validate(req.body)
      if (valid) {
        const imageName = Date.now() + image.name;
        const addedEvent = await addEvent({
          ...req.body,
          publisher_id,
          imageName
        })
        await eventTopic.forEach(async (topic_id) => {
          await addTopic(addedEvent.rows[0].id, topic_id)
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
      const valid = await publicServicesSchema
        .validate(req.body)
      if (valid) {
        const imageName = Date.now() + image.name;
        const addedPublicServices = await addPublicServices({
          ...req.body,
          publisher_id,
          imageName
        })
        await secondary_tag.forEach(async (secondaryTag_id) => {
          await addSecondaryTag(addedPublicServices.rows[0].id, secondaryTag_id)
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
  } catch {
    res.status(400).send({
      error: 'Bad Request',
      statusCode: 400
    })
  }
};

module.exports = post;