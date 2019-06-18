const { getPrimaryTags } = require('../../../database/queries/getPrimaryTags');
const { getSecondaryTags } = require('../../../database/queries/getSecondaryTags');

module.exports = async (req, res, next) => {
  try {
    const primaryTags = await getPrimaryTags()
    const secondaryTags = await getSecondaryTags()
    res.send({
      data: [primaryTags.rows, secondaryTags.rows],
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
};
