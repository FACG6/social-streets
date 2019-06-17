const { getEvents, getPublicServices } = require('../../../database/queries/getPosts');

module.exports = async (req, res, next) => {
  try {
    const { id: publisherId } = req.user;
    const resEvent = await getEvents('false', publisherId);
    const resPublic = await getPublicServices('false', publisherId);
    res.send({
      data: [...resEvent.rows, ...resPublic.rows],
      statusCode: 200
    });
  } catch (err) {
    next(err);
  };
}

