const { getDraftEvents, getDraftPublicServices } = require('../../../database/queries/getDraftPosts');

draftPosts = async (req, res) => {
  try {
    const { id: publisher_id } = req.user;
    const resEvent = await getDraftEvents(true, publisher_id)
    const resPublic = await getDraftPublicServices(true, publisher_id)
     
    res.status(200).send({
      data: [ ...resEvent.rows ,  ...resPublic.rows ],
      statusCode: 200
    })

  } catch (err) {
    res.status(400).send({
      error: 'Bad Request',
      statusCode: 400
    })
  };
}

module.exports = draftPosts;