const { acceptUser, rejectUser } = require('../../../database/queries/updatePendingUser');

exports.acceptUser = async (req, res, next) => {
  try {
    const acceptedUser = await acceptUser(req.params.userId);
    res.send({ data: acceptedUser.rows[0], statusCode: 200 });
  } catch (e) {
    next(e);
  }
};

exports.rejectUser = async (req, res, next) => {
  try {
    const rejectedUser = await rejectUser(req.params.userId);
    res.send({ data: rejectedUser.rows[0], statusCode: 200 });
  } catch (e) {
    next(e);
  }
};
