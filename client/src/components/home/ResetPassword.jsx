import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {isUserLoading, resetPassword} from '../../slices/authSlice';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {changePasswordSchema} from '../../schemas/auth';
import RHFTextField from '../inputs/RHFTextField';
import Button from '../button';

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useParams();

  const isLoading = useSelector(isUserLoading);

  const methods = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const handleResetPassword = async (data) => {
    await dispatch(resetPassword({payload: data, token}));
    navigate('/login');
  };

  const {isDirty} = methods.formState;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full md:w-1/2 max-w-md space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>

            <RHFTextField
              name="password"
              label="New Password"
              type="password"
            />

            <Button
              onClick={methods.handleSubmit(handleResetPassword)}
              disabled={!isDirty}
              loading={isLoading}
            >
              Reset
            </Button>
          </section>
        </div>
      </div>
    </FormProvider>
  );
}
