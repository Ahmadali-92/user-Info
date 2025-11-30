import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {getIsUserLoggedIn} from '../slices/authSlice';

const ProtectedRoute = ({children}) => {
  const isUserLoggedIn = useSelector(getIsUserLoggedIn);

  if (!isUserLoggedIn) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
