import { WeatherUrl } from '@/config';
import useAxiosFetch, { IFetchResponse } from '@/hooks/useAxios';
import useGlobalStore from '@/stores/GlobalStore';
import React from 'react'

function WeatherPanel() {
    const latitude = useGlobalStore(state => state.latitude)
    const longitude = useGlobalStore(state => state.longitude)
    const openweatherapi = useGlobalStore(state => state.openweathermap_api)

    const url = WeatherUrl + `/getWeatherStatus?latitude=${latitude}&longitude=${longitude}&api=${openweatherapi}`
    const [fetchResponse, fetchAgain] = useAxiosFetch(url) as [IFetchResponse, () => void];
    const { data, error, isLoading } = fetchResponse;


    if (isLoading) {
        return "Loading"
    }
    return (
        <div>Current Temp is {data.main.temp}</div>
    )
}

export default WeatherPanel