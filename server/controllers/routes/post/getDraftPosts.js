const { getDraftEvents, getDraftPublicServices } = require('../../../database/queries/getDraftPosts');

draftPosts = async (req, res) => {
  try {
    const { id: publisher_id } = req.user;
    const resEvent = await getDraftEvents(publisher_id, true)
    const resPublic = await getDraftPublicServices(publisher_id, true)
     
    res.status(200).send({
      data: [ ...resEvent.rows ,  ...resPublic.rows ],
      statusCode: 200
    })

  } catch (err) {
    console.log(err)
    res.status(400).send({
      error: 'Bad Request',
      statusCode: 400
    })
  };
}

module.exports = draftPosts;