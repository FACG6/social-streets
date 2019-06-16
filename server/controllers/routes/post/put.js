const { eventSchema, publicServiceSchema } = require("../../utils/postSchema");

const {
  updateEventQuery,
  updateTopicQuery,
  updatePublicServiceQuery,
  updateSecondaryTagQuery
} = require("../../../database/queries/updatePost");

const updateEvent = (req, res, next) => {
  console.log("Hello from update events", req.body);
  const eventId = req.params.postId;
  const { eventTopic } = req.body;
  eventSchema.isValid(req.body).then(valid => {
    if (!valid) res.status(400).send({ error: "Bad Request", statusCode: 400 });
    else {
      updateEventQuery(eventId, req.body)
        .then(() =>
          eventTopic.forEach(topic => updateTopicQuery(eventId, topic))
        )
        .then(() =>
          res.send({ data: "Updated event successfully", statusCode: 200 })
        )
        .catch(next);
    }
  });
};

const updatePublicService = (req, res, next) => {
  const publicServiceId = req.params.postId;
  const { secondaryTag } = req.body;
  publicServiceSchema.isValid(req.body).then(valid => {
    if (!valid) res.status(400).send({ error: "Bad Request", statusCode: 400 });
    else {
      updatePublicServiceQuery(publicServiceId, req.body)
        .then(() =>
          secondaryTag.forEach(tag =>
            updateSecondaryTagQuery(publicServiceId, tag)
          )
        )
        .then(() =>
          res.send({
            data: "Updated public service successfully",
            statusCode: 200
          })
        )
        .catch(next);
    }
  });
};

module.exports = (req, res, next) => {
  const { type } = req.body;
  if (type === "event") updateEvent(req, res, next);
  else if (type === "public_services") updatePublicService(req, res, next);
  else res.status(400).send("Unsupported type of post");
};
