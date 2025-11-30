import {Routes, Route} from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './routes/ProtectedRoute';
import ResetPasswordPage from './pages/ResetPasswordPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/reset/:token"
        element={
          <ProtectedRoute>
            <ResetPasswordPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
