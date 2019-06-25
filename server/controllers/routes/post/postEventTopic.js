const insertEventTopic = require('../../../database/queries/addEventTopic')

module.exports = async (req, res, next) => {
  const { topic } = req.body
  try {
    const addedTopic = await insertEventTopic(topic)
    res.send({
      data: addedTopic.rows,
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
};
