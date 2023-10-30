import { WeatherUrl } from '@/src/config';
import useAxiosFetch from '@/src/hooks/useAxios';
import React from 'react'

function WeatherPanel() {
    const { data, error, isLoading } = useAxiosFetch(WeatherUrl + '/');

    return (
        <div>WeatherPanel = {data}</div>
    )
}

export default WeatherPanel