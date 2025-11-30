import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import RHFTextField from '../inputs/RHFTextField';
import Button from '../button';
import {registerUserSchema} from '../../schemas/auth';
import {createUser, isUserLoading} from '../../slices/authSlice';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(isUserLoading);

  const methods = useForm({
    resolver: yupResolver(registerUserSchema),
  });

  const onSubmit = async (data) => {
    await dispatch(createUser({payload: data}));
    navigate('/login');
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full md:w-1/2 max-w-md space-y-8 bg-white p-6 rounded-lg shadow-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight">
              Sign up
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <RHFTextField name="fullName" label="Full Name" />
            <RHFTextField name="email" label="Email" type="email" />
            <RHFTextField name="password" label="Password" type="password" />

            <Button
              onClick={methods.handleSubmit(onSubmit)}
              className={'w-full'}
              loading={isLoading}
            >
              Signup
            </Button>

            <p className="mt-10 text-center text-sm text-gray-400">
              Already a member?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
