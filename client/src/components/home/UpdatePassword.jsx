import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../button';
import RHFTextField from '../inputs/RHFTextField';
import {changePasswordSchema} from '../../schemas/auth';
import {useSelector} from 'react-redux';
import {isUserLoading} from '../../slices/authSlice';

export default function UpdatePassword({handleUpdate}) {
  const isLoading = useSelector(isUserLoading);

  const methods = useForm({
    defaultValues: {password: ''},
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    await handleUpdate(data);
    methods.reset();
  };

  const {isDirty} = methods.formState;

  return (
    <FormProvider {...methods}>
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>

        <RHFTextField name="password" label="New Password" type="password" />

        <Button
          onClick={methods.handleSubmit(onSubmit)}
          disabled={!isDirty}
          loading={isLoading}
        >
          Update Password
        </Button>
      </section>
    </FormProvider>
  );
}
