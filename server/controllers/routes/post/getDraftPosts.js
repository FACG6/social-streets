const { getEvents, getPublicServices } = require('../../../database/queries/getPosts');

const draftPosts = async (req, res, next) => {
  try {
    const { id: publisherId } = req.user;
    const resEvent = await getEvents('true', publisherId)
    const resPublic = await getPublicServices('true', publisherId)
    res.status(200).send({
      data: [...resEvent.rows, ...resPublic.rows],
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = draftPosts;
