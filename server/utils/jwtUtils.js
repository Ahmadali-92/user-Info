const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.generateHashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports.compareHashPassword = async (reqPassword, existPassword) => {
  return await bcrypt.compare(reqPassword, existPassword);
};

module.exports.generateToken = (userId) => {
  return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
};

module.exports.verifyToken = ({token}) => {
  try {
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

    return decodedObj;
  } catch (error) {
    return false;
  }
};
