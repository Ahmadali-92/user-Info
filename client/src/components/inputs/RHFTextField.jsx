import {Controller, useFormContext} from 'react-hook-form';

const RHFTextField = ({name, label, ...other}) => {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <div className="mb-4">
          {label && <label className="block text-gray-700 mb-1">{label}</label>}
          <input
            {...field}
            {...other}
            placeholder={`Enter ${label.toLowerCase()}`}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : ''
            }`}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default RHFTextField;
