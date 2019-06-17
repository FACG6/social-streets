const { getEvents, getPublicServices } = require('../../../database/queries/getPosts');

const livePosts = async (req, res, next) => {
  try {
    const { id: publisherId } = req.user;
    const resEvent = await getEvents('false', publisherId);
    const resPublic = await getPublicServices('false', publisherId);
    const allPosts = await [...resEvent.rows, ...resPublic.rows];
    if (!allPosts.length) {
      res.status(400).send({
        error: 'No Live Posts Available',
        statusCode: 400
      });
    } else {
      res.send({
        data: allPosts,
        statusCode: 200
      });
    }
  } catch (err) {
    next(err);
  };
}

module.exports = livePosts;
