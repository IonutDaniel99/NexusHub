import { WeatherUrl } from '@/config';
import useAxiosFetch, { IFetchResponse } from '@/hooks/useAxios';
import React from 'react'

function WeatherPanel() {
    const [fetchResponse, fetchAgain] = useAxiosFetch(WeatherUrl + '/') as [IFetchResponse, () => void];
    const { data, error, isLoading } = fetchResponse;


    return (
        <div>WeatherPanel = {data}</div>
    )
}

export default WeatherPanel