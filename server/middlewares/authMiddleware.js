const {verifyToken} = require('../utils/jwtUtils');

module.exports = (req, res, next) => {
  const cookie = req.headers['x-auth-token'];

  const token = verifyToken({token: cookie});

  if (token) {
    req.jwtToken = token;
    next();
  } else {
    res.status(500).json({message: 'Internal Server error'});
  }
};
