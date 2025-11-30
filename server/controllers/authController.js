const AuthServices = require('../services/authService.js');
const {
  generateHashPassword,
  compareHashPassword,
  generateToken,
  verifyToken,
} = require('../utils/jwtUtils.js');
const emailNotificationProcesses = require('../utils/email/process/resetPassword.js');
const {response} = require('../utils/responseHandler.js');

module.exports = class AuthController {
  static async createUser(req, res, next) {
    try {
      const {fullName, email, password} = req.body;

      const {user, error} = await AuthServices.getUser({email});
      if (error) throw error;
      if (user) {
        return response({
          res,
          status: 400,
          message: 'User already registered',
        });
      }

      // Hash password
      const hashedPassword = await generateHashPassword(password);

      // create User
      const {error: createError} = await AuthServices.createUser({
        body: {
          fullName,
          email,
          password: hashedPassword,
        },
      });
      if (createError) throw createError;

      return response({
        res,
        status: 201,
        message: 'User registered successfully',
      });
    } catch (error) {
      response({res, status: 500, message: 'Internal Server error'});
    }
  }

  static async loginUser(req, res, next) {
    try {
      const {email, password} = req.body;

      const {user, error} = await AuthServices.getUser({email});
      if (error) throw error;
      if (!user) {
        return response({
          res,
          status: 400,
          message: 'Invalid email or password',
        });
      }

      // Check password
      const isMatch = await compareHashPassword(password, user.password);
      if (!isMatch) {
        return response({
          res,
          status: 400,
          message: 'Invalid email or password',
        });
      }

      // Generate JWT
      const token = generateToken(user._id);

      return response({
        res,
        status: 200,
        message: 'Login successful',
        body: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      response({res, status: 500, message: 'Internal Server error'});
    }
  }

  static async updateUser(req, res, next) {
    try {
      const {id} = req.params;
      const {fullName, password} = req.body;

      // Check if the user exists
      const {user, error} = await AuthServices.getUser({_id: id});
      if (error) throw error;
      if (!user) return response({res, status: 404, message: 'User not found'});

      const updatedData = {};

      if (fullName) updatedData.fullName = fullName;
      if (password) updatedData.password = await generateHashPassword(password);

      // Update user
      const {updatedUser, error: updateError} = await AuthServices.updateUser({
        id,
        body: updatedData,
      });
      if (updateError) throw updateError;

      return response({
        res,
        status: 200,
        message: 'User updated successfully',
        body: {
          id: updatedUser._id,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
        },
      });
    } catch (error) {
      response({res, status: 500, message: 'Internal Server error'});
    }
  }

  static async forgetPassword(req, res, next) {
    try {
      const email = req.body.email;

      // Check if the user exists
      const {user, error} = await AuthServices.getUser({email});
      if (error) throw error;
      if (!user) return response({res, status: 404, message: 'User not found'});

      const resetToken = generateToken(user._id);
      const url = `${process.env.FRONTEND_URL}/auth/reset/${resetToken}`;
      await emailNotificationProcesses({user, resetUrl: url});

      return response({
        res,
        status: 200,
        message: 'Reset password link sent successfully',
      });
    } catch (error) {
      response({res, status: 500, message: 'Internal Server error'});
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const newPassword = req.body.password;
      const token = req.params.token;

      const decodedToken = verifyToken({token});
      if (!decodedToken) {
        return response({
          res,
          status: 401,
          message:
            'Token is either expired or is invalid. Please create a new token and try again',
        });
      }

      const password = await generateHashPassword(newPassword);

      // Update user
      const {updatedUser, error} = await AuthServices.updateUser({
        id: decodedToken.id,
        body: {password},
      });
      if (error) throw error;

      return response({
        res,
        status: 200,
        message: 'Password reset successfully',
      });
    } catch (error) {
      response({res, status: 500, message: 'Internal Server error'});
    }
  }
};
