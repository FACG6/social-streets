const { getEventCategory } = require('../../../database/queries/getEventCategories');
const { getEventTopics } = require('../../../database/queries/getEventTopics');
const { getPublicServiceTip } = require('../../../database/queries/getEventTip');

module.exports = async (req, res, next) => {
  try {
    const categories = await getEventCategory();
    const topics = await getEventTopics();
    const tips = await getPublicServiceTip();
    res.send({
      data: {
        categories: categories.rows,
        topics: topics.rows,
        tips: tips.rows,
      },
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
