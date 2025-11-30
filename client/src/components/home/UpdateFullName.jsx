import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import RHFTextField from '../inputs/RHFTextField';
import Button from '../button';
import {changeFullNameSchema} from '../../schemas/auth';
import {useSelector} from 'react-redux';
import {isUserLoading} from '../../slices/authSlice';

export default function UpdateFullName({user, handleUpdate}) {
  const isLoading = useSelector(isUserLoading);

  const methods = useForm({
    defaultValues: {fullName: user?.fullName || ''},
    resolver: yupResolver(changeFullNameSchema),
  });

  const {isDirty} = methods.formState;

  return (
    <FormProvider {...methods}>
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Update Full Name</h2>

        <RHFTextField name="fullName" label="Full Name" />

        <Button
          onClick={methods.handleSubmit(handleUpdate)}
          disabled={!isDirty}
          loading={isLoading}
        >
          Update Name
        </Button>
      </section>
    </FormProvider>
  );
}
