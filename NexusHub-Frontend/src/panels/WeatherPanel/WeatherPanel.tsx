import { WeatherUrl } from '@/config';
import useAxiosFetch from '@/hooks/useAxios';
import React from 'react'

function WeatherPanel() {
    const { data, error, isLoading } = useAxiosFetch(WeatherUrl + '/');

    return (
        <div>WeatherPanel = {data}</div>
    )
}

export default WeatherPanel