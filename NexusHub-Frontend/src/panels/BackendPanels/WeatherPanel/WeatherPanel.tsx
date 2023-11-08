import {WeatherUrl} from '@/config';
import useAxiosFetch, {IFetchResponse} from '@/hooks/useAxios';
import useGlobalStore from '@/stores/GlobalStore';
import React from 'react'
import {WeatherData} from "@/panels/BackendPanels/WeatherPanel/types";
import moment from "moment";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {weatherDescriptions} from "@/panels/BackendPanels/WeatherPanel/utils";
import WeatherSubDetails from "@/panels/BackendPanels/WeatherPanel/components/WeatherSubDetails";
import {displayWeatherIconById, timestampToReadable} from "@/panels/BackendPanels/WeatherPanel/functions";
import WeatherHoursForecast from "@/panels/BackendPanels/WeatherPanel/components/WeatherHoursForecast";
import LoadingComponent from "@/components/LoadingComponent";

function WeatherPanel() {
    const latitude = useGlobalStore(state => state.latitude)
    const longitude = useGlobalStore(state => state.longitude)
    const openweatherapi = useGlobalStore(state => state.openweathermap_api)
    const url = WeatherUrl + `/getWeatherStatus?latitude=${latitude}&longitude=${longitude}&api=${openweatherapi}`
    const [fetchResponse, fetchAgain] = useAxiosFetch(url) as [IFetchResponse, () => void];
    const {data: weatherData, isLoading} = fetchResponse as WeatherData;

    if (isLoading) {
        return <LoadingComponent/>
    }
    if (weatherData.data.cod > 400) {
        return <div className={'flex items-center justify-center h-full flex-col opacity-80 gap-4'}>
            <p className={'font-bold text-2xl'}>You broke it. Somehow...</p>
            <p className={'w-1/2 text-center line-clamp-2'}>
                <span className={'text-red-500 font-bold '}>Error:</span> {weatherData.data.message}
            </p>
        </div>
    }


    return (
        <div className={'h-full text-secondary-foreground text-white overflow-y-auto'}>
            <div className={'absolute h-full w-full -z-50 bg-cover scale-105'}
                 style={{
                     backgroundImage: `url(${displayWeatherIconById(weatherData.data.list[0].weather[0].id, weatherData.data.list[0].dt, true)})`
                 }}>
            </div>
            <div className={'h-full pt-1'}>
                <div className={'w-full flex justify-end items-center'}>
                    <HoverCard>
                        <HoverCardTrigger
                            className={'flex items-center gap-1 px-2 w-fit hover:text-white hover:no-underline'}>
                            <h1 className={'font-semibold'}>Hover for Info</h1>
                        </HoverCardTrigger>
                        <HoverCardContent align={"end"} className={'flex flex-col gap-3'}>
                            <span>Latitude: {latitude}</span>
                            <span>Latitude: {longitude}</span>
                            <span>Last refresh: {timestampToReadable(weatherData.lastFetchedTime)}</span>
                            <Button size={"sm"} onClick={fetchAgain}>Refresh Again</Button>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <div className="flex px-4 justify-between">
                    <div className="mb-2 w-full">
                        <div
                            className="h-6 text-sm leading-6 overflow-hidden whitespace-nowrap font-bold">
                            Current weather in {weatherData.data.city.name}
                        </div>
                        <div className="h-4 text-xs leading-4 text-gray-50 font-semibold">{moment().format('LLL')}</div>
                    </div>
                </div>
                <div className="pl-4  max-w-2xl">
                    <div className="flex flex-row flex-wrap items-center justify-center w-full">
                        <img
                            alt={'g'}
                            className="w-18 h-18"
                            title="Mostly cloudy"
                            src={displayWeatherIconById(weatherData.data.list[0].weather[0].id, weatherData.data.list[0].dt)}
                        />
                        <span className="text-white ml-2 text-4xl leading-16 flex items-center decoration-0">
                            <span className="text-5xl">{weatherData.data.list[0].main.temp.toFixed()}</span>
                            <span className="text-2xl">°C</span>
                        </span>
                        <div className="ml-8">
                            <div className="inline-block text-lg font-semibold leading-6 whitespace-nowrap pt-4">
                                {weatherData.data.list[0].weather[0].main}
                            </div>
                            <span className="text-white flex h-9 font-normal items-center pt-1 decoration-0">
                                <div className="text-base leading-4 opacity-80 mr-3">Feels like</div>
                                <div
                                    className="text-base leading-6">{weatherData.data.list[0].main.feels_like.toFixed()}°</div>
                            </span>
                        </div>
                        <table className="max-w-50 text-base absolute right-2"></table>
                    </div>
                    <div className="flex h-16 items-center mb-3 justify-center flex-col">
                        <p className="text-sm leading-6 m-0 font-semibold">
                            {weatherDescriptions[weatherData.data.list[0].weather[0].id]}
                        </p>
                    </div>
                </div>
                <WeatherSubDetails weatherData={weatherData}/>
                <WeatherHoursForecast weatherData={weatherData}/>
            </div>
        </div>
    )
}

export default WeatherPanel