import { Navigate, Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { ThemeProvider } from './ui/theme-provider';
import useAxiosFetch from '@/hooks/useAxios';
import { OnboardingUrl } from '@/config';
import useGlobalStore from '@/stores/GlobalStore';

const ProtectedRoute = () => {
  const [current_user] = useLocalStorage('current_user');
  const [user_logged] = useLocalStorage('current_user_login');
  if (!current_user || !user_logged) {
    return <Navigate to="/" replace />;
  }
  const [user_id] = useLocalStorage('current_user');
  const [fetchUserData] = useAxiosFetch(OnboardingUrl + `/getUserData?user_id=${user_id}`);

  useGlobalStore.setState(fetchUserData.data)

  return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
    <Outlet />
  </ThemeProvider>

};

export default ProtectedRoute

