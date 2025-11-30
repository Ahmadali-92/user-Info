import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import UserInfo from './UserInfo';
import UpdateFullName from './UpdateFullName';
import UpdatePassword from './UpdatePassword';
import ForgotPassword from './ForgotPassword';
import {getCurrentUser, updateUser} from '../../slices/authSlice';
import Button from '../button';
import {NAME} from '../../utils/general';

const SECTION_COMPONENTS = {
  [NAME.fullName.key]: UpdateFullName,
  [NAME.password.key]: UpdatePassword,
  [NAME.forgot.key]: ForgotPassword,
};

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);

  const [activeSection, setActiveSection] = useState(NAME.fullName.key);

  const handleUpdate = (data) => {
    dispatch(updateUser({payload: data, id: user.id}));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6 space-y-6">
      <UserInfo user={user} />

      {/* navigation */}
      <div className="flex gap-4">
        {Object.values(NAME).map((item) => (
          <Button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            active={activeSection === item.key}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* active section */}
      <div className="w-full md:w-1/2 max-w-md">
        {activeSection &&
          (() => {
            const SectionComponent = SECTION_COMPONENTS[activeSection];
            return <SectionComponent user={user} handleUpdate={handleUpdate} />;
          })()}
      </div>
    </div>
  );
}
