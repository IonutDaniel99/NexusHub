import {Navigate, Outlet} from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import {ThemeProvider} from './ui/theme-provider';
import useAxiosFetch from '@/hooks/useAxios';
import {OnboardingUrl} from '@/configs/GlobalsServicesURL';
import useGlobalStore from '@/stores/GlobalStore';
import useGeolocation from "@/hooks/useGeolocation";
import {useEffect} from "react";

const ProtectedRoute = () => {
    const {latitude, longitude} = useGeolocation() //retrive from browser;

    const [current_user, , remove_current_user] = useLocalStorage('current_user');
    const [user_logged, set_user_logged] = useLocalStorage('current_user_login');

    const [client_geolocation, set_client_geolocation] = useLocalStorage('current_client_geolocation');


    useEffect(() => {
        set_client_geolocation(JSON.stringify({latitude, longitude}))
    }, [latitude, longitude]);

    const [fetchUserData] = useAxiosFetch(OnboardingUrl + `/getUserData?user_id=${current_user}`);
    const {data, error} = fetchUserData

    if (error) {
        set_user_logged(false)
        remove_current_user()
        return <Navigate to="/" replace/>;
    }

    if (!current_user || !user_logged) {
        return <Navigate to="/" replace/>;
    }
    useGlobalStore.setState(data)

    return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Outlet/>
    </ThemeProvider>

};

export default ProtectedRoute

