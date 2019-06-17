const { getEvents, getPublicServices } = require('../../../database/queries/getDraftPosts');

const draftPosts = async (req, res) => {
  try {
    const { id: publisherId } = req.user;
    const resEvent = await getEvents('true', publisherId)
    const resPublic = await getPublicServices('true', publisherId)
     
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
