import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../button';
import RHFTextField from '../inputs/RHFTextField';
import {sendResetPasswordLinkSchema} from '../../schemas/auth';
import {useDispatch, useSelector} from 'react-redux';
import {forgetPassword, isUserLoading} from '../../slices/authSlice';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const isLoading = useSelector(isUserLoading);

  const methods = useForm({
    defaultValues: {email: ''},
    resolver: yupResolver(sendResetPasswordLinkSchema),
  });

  const handleResetPassword = async (data) => {
    await dispatch(forgetPassword({payload: data}));
    methods.reset();
  };

  const {isDirty} = methods.formState;

  return (
    <FormProvider {...methods}>
      <section className="bg-white p-6 rounded-lg shadow-md space-y-4 relative">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        <RHFTextField name="email" label="Email" type="email" />
        <Button
          onClick={methods.handleSubmit(handleResetPassword)}
          disabled={!isDirty}
          loading={isLoading}
        >
          Send Reset Link
        </Button>
      </section>
    </FormProvider>
  );
}
