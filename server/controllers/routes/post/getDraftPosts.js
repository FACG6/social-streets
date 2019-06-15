const { getDraftEvents, getDraftPublicServices } = require('../../../database/queries/getDraftPosts');

draftPosts = async (req, res) => {
  try {
    const { id: publisher_id } = req.user;
    const resEvent = await getDraftEvents(publisher_id)
    const resPublic = await getDraftPublicServices(publisher_id)
    let allPosts = [];
    await resEvent.rows.forEach( async (element) => {
      await allPosts.push(element);
    });
    await resPublic.rows.forEach( async (element) => {
      await allPosts.push(element);
    });
    res.status(200).send({
      data: {
        allPosts
      },
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