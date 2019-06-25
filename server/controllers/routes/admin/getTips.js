const { getPublicServiceTip } = require('../../../database/queries/getEventTip');

module.exports = async (req, res, next) => {
  try {
    const tips = await getPublicServiceTip();
    res.send({
      data: {
        tips: tips.rows,
      },
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
