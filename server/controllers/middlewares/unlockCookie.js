const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (jwt) {
    verify(jwt, process.env.SECRET, (error, unlockedCookie) => {
      if (error) {
        res.status(401).send('unauthorized');
      } else {
        req.clearCookie(jwt);
        req.user = unlockedCookie;
        next();
      }
    });
  } else {
    res.status(401).send('unauthorized');
  }
};
