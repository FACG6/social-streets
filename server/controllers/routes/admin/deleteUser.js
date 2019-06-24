const { compare } = require('bcryptjs');

const { getUserById } = require('../../../database/queries/getUser');
const deleteUser = require('../../../database/queries/deleteUser');

module.exports = async (req, res, next) => {
  try {
    const dbRes = await getUserById(1);
    const admin = dbRes.rows[0];

    const passIsValid = await compare(req.body.password, admin.password);
    if (!passIsValid) return res.status(401).send({ error: 'Please check your password', statusCode: 401 });

    const { userId } = req.params;
    const deletedUser = await deleteUser(userId);

    return res.send({ data: deletedUser.rows[0], statusCode: 200 });
  } catch (e) {
    return next(e);
  }
};
