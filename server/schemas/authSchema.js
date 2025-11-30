const {mongoose} = require('mongoose');
const Yup = require('yup');

const commonFieldsSchema = {
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(
      8,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    )
    .matches(
      /[A-Z]/,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    ),
};

const mongooseIdValidate = (name) => {
  return Yup.string()
    .required(`${name} ID is required`)
    .test({
      name: 'id-validation',
      message: `Invalid ${name} ID`,
      test: (value) => mongoose.Types.ObjectId.isValid(value),
    });
};

module.exports.loginUserSchema = Yup.object().shape({
  email: commonFieldsSchema.email,
  password: commonFieldsSchema.password,
});

module.exports.registerUserSchema = Yup.object().shape({
  fullName: commonFieldsSchema.fullName,
  email: commonFieldsSchema.email,
  password: commonFieldsSchema.password,
});

module.exports.sendResetPasswordLinkSchema = Yup.object().shape({
  email: commonFieldsSchema.email,
});

module.exports.resetPasswordSchema = Yup.object().shape({
  password: commonFieldsSchema.password,
});

module.exports.validateUserIdParams = Yup.object({
  id: mongooseIdValidate('User'),
});
