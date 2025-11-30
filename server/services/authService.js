const AuthModel = require('../models/authModel.js');

module.exports = class AuthServices {
  static async getUser({query}) {
    try {
      const user = await AuthModel.findOne({
        ...query,
      });

      return {user};
    } catch (error) {
      return {error};
    }
  }
  static async createUser({body}) {
    try {
      const newUser = new AuthModel(body);

      await newUser.save();

      return {newUser};
    } catch (error) {
      return {error};
    }
  }

  static async updateUser({id, body}) {
    try {
      const updatedUser = await AuthModel.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });

      return {updatedUser};
    } catch (error) {
      return {error};
    }
  }
};
