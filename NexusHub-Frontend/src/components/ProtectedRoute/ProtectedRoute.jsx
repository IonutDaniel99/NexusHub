import { Navigate, Outlet } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ThemeProvider } from '../ui/theme-provider';

const ProtectedRoute = () => {
  const [current_user] = useLocalStorage('current_user');
  const [user_logged] = useLocalStorage('current_user_login');
  if (!current_user || !user_logged) {
    return <Navigate to="/" replace />;
  }
  return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Outlet />
  </ThemeProvider>

};

export default ProtectedRoute

