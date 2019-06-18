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
    const data = JSON.parse(req.body.data)
    const {
      type,
      eventTopic,
      secondaryTag
    } = data;
    const {
      image
    } = req.files;
    const publisherId = Number(req.user.id)
    console.log(image)

    console.log(data)
    if (type === 'event') {
      if (!image) throw new Error();
      console.log(999999999999999)
      const valid = await eventSchema
        .isValid(data)
        console.log(valid)
      if (valid) {
        const imageName = Date.now() + image.name;
        const addedEvent = await addEvent({
          ...req.body,
          publisherId,
          imageName
        })
        await eventTopic.forEach(async (topicId) => {
          await addTopic(addedEvent.rows[0].id, topicId)
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
        await secondaryTag.forEach(async (secondaryTagId) => {
          await addSecondaryTag(addedPublicServices.rows[0].id, secondaryTagId)
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