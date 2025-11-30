import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import RHFTextField from '../inputs/RHFTextField';
import {useForm, FormProvider} from 'react-hook-form';
import Button from '../button';
import {loginUserSchema} from '../../schemas/auth';
import {isUserLoading, logInUser} from '../../slices/authSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(isUserLoading);

  const methods = useForm({
    resolver: yupResolver(loginUserSchema),
  });

  const onSubmit = async (data) => {
    await dispatch(logInUser({payload: data}));
    navigate('/');
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full md:w-1/2 max-w-md space-y-8 bg-white p-6 rounded-lg shadow-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight">
              Sign in
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <RHFTextField name="email" label="Email" type="email" />
            <RHFTextField name="password" label="Password" type="password" />

            <Button
              onClick={methods.handleSubmit(onSubmit)}
              className={'w-full'}
              loading={isLoading}
            >
              Signin
            </Button>

            <p className="mt-10 text-center text-sm text-gray-400">
              Not a member?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
