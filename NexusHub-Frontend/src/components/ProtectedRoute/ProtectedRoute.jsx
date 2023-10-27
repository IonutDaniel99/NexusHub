import { Navigate, Outlet } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

const ProtectedRoute = () => {
  const [current_user] = useLocalStorage('current_user');
  const [user_logged] = useLocalStorage('current_user_login');
  if (!current_user || !user_logged) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute

