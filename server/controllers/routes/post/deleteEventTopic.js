const deleteEventTopic = require('../../../database/queries/deleteEventTopic')

module.exports = async (req, res, next) => {
  try {
  const {topic} = req.body
    const deletedTopic = await deleteEventTopic(topic)
    res.send({
      data: deletedTopic.rows,
      statusCode: 200
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
};
