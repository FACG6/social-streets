const deletePublicPrimary = require('../../../database/queries/deletePublicPrimary')

module.exports = async (req, res, next) => {
  try {
    console.log(req.body)
  const { tag } = req.body
    const deletedTopic = await deletePublicPrimary(tag)
    res.send({
      data: deletedTopic.rows,
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
};
