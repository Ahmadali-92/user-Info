import * as Yup from 'yup';

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

export const loginUserSchema = Yup.object().shape({
  email: commonFieldsSchema.email,
  password: commonFieldsSchema.password,
});

export const registerUserSchema = Yup.object().shape({
  fullName: commonFieldsSchema.fullName,
  email: commonFieldsSchema.email,
  password: commonFieldsSchema.password,
});

export const changeFullNameSchema = Yup.object().shape({
  fullName: commonFieldsSchema.fullName,
});

export const changePasswordSchema = Yup.object().shape({
  password: commonFieldsSchema.password,
});

export const sendResetPasswordLinkSchema = Yup.object().shape({
  email: commonFieldsSchema.email,
});
