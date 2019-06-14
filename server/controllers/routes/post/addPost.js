const { join } = require('path');

const { addEvent, addTopic, addPublicServices, addSecondaryTag } = require('../../../database/queries/postEvent');
const { eventSchema, publicServicesSchema } = require('../../utils/addPostSchema');

post = async (req, res, next) => {
  try {
    const { type, eventTopic, secondary_tag } = req.body;
    const { id: publisher_id } = req.user.id;
    
    if (type === 'event' && req.files.eventImg) {
     const valid = await eventSchema
        .validate(req.body)
        if(valid) {
          const { eventImg } = req.files 
          const image = 'eventImg' + Date.now() + eventImg.name;
          const addedEvent = await addEvent({ ...req.body, publisher_id, image })
          await eventTopic.forEach(async (topic_id) => {
            await addTopic(addedEvent.rows[0].id, topic_id)
          });
          eventImg.mv(join(__dirname, '..', '..', '..', 'uploads', image), (err) => {
            if (err) {
              next(err)
            } else {
              res.status(201).send({
                data: { ...addedEvent.rows[0] },
                statusCode: 201
              })
            }
          })
        } else {
          res.status(400).send({
            error: 'Bad Request',
            statusCode: 400
          })
        }
    } else if (type === 'public_services' && req.files.publicImg) {
      const valid = await publicServicesSchema
        .validate(req.body)
      if(valid) {
        const { publicImg } = req.files
        const image = 'publicImg' + Date.now() + publicImg.name;
        const addedPublicServices = await addPublicServices({ ...req.body, publisher_id, image })
        await secondary_tag.forEach(async (secondaryTag_id) => {
          await addSecondaryTag(addedPublicServices.rows[0].id, secondaryTag_id)
        });
        publicImg.mv(join(__dirname, '..', '..', '..', 'uploads', image), (err) => {
          if (err) {
            next(err)
          } else {
            res.status(201).send({
              data: { ...addedPublicServices.rows[0] },
              statusCode: 201
            })
          }
        })
      } else {
        res.status(400).send({
          error: 'Bad Request',
          statusCode: 400
        })
      }
    } else {
      res.status(400).send({
        error: 'Bad Request',
        statusCode: 400
      })
    }
  } catch (err) {
    console.log(6666666666666666666, err)
    res.status(400).send({
      error: 'Bad Request',
      statusCode: 400
    })
  }
};

module.exports = post;
