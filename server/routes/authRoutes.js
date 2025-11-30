const {
  loginUserSchema,
  registerUserSchema,
  validateUserIdParams,
  sendResetPasswordLinkSchema,
  resetPasswordSchema,
} = require('../schemas/authSchema.js');
const catchAsync = require('../utils/catchAsync.js');
const AuthController = require('../controllers/authController.js');
const validatorMiddleware = require('../middlewares/validatorMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const express = require('express');

const router = express.Router();

router.post(
  '/signup',
  validatorMiddleware(registerUserSchema),
  catchAsync(AuthController.createUser)
);

router.post(
  '/login',
  validatorMiddleware(loginUserSchema),
  catchAsync(AuthController.loginUser)
);

router.patch(
  '/:id',
  authMiddleware,
  validatorMiddleware(validateUserIdParams, 'params'),
  catchAsync(AuthController.updateUser)
);
router.post(
  '/forgot-password',
  authMiddleware,
  validatorMiddleware(sendResetPasswordLinkSchema),
  catchAsync(AuthController.forgetPassword)
);

router.patch(
  '/reset/:token',
  validatorMiddleware(resetPasswordSchema),
  catchAsync(AuthController.resetPassword)
);

module.exports = router;
