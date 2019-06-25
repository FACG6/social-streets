const deleteEventCategory = require('../../../database/queries/deleteEventCategory')

module.exports = async (req, res, next) => {
  try {
  const {category} = req.body
    const deletedCategory = await deleteEventCategory(category)
    res.send({
      data: deletedCategory.rows,
      statusCode: 200
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
};
