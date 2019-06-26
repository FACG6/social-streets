const getTips = require("../../../database/queries/getTips");

module.exports = async (req, res) => {
  try {
    const tips = (await getTips()).rows;
    res.send({ statusCode: 200, data: tips });
  } catch (e) {
    next(e);
  }
};
