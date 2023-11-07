import {WeatherUrl} from '@/config';
import useAxiosFetch, {IFetchResponse} from '@/hooks/useAxios';
import useGlobalStore from '@/stores/GlobalStore';
import React from 'react'
import {WeatherData} from "@/panels/BackendPanels/WeatherPanel/types";
import moment from "moment";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {InfoCircledIcon} from "@radix-ui/react-icons";

function WeatherPanel() {
    const latitude = useGlobalStore(state => state.latitude)
    const longitude = useGlobalStore(state => state.longitude)
    const openweatherapi = useGlobalStore(state => state.openweathermap_api)

    const url = WeatherUrl + `/getWeatherStatus?latitude=${latitude}&longitude=${longitude}&api=${openweatherapi}`
    const [fetchResponse, fetchAgain] = useAxiosFetch(url) as [IFetchResponse, () => void];
    const {data: weatherData, error: weatherError, isLoading} = fetchResponse as WeatherData;

    if (weatherError?.cod > 399) {
        return <div>
            {weatherError.message}
        </div>
    }

    if (isLoading) {
        return "Loading"
    }

    const timestampToReadable = (unix_time: number) => {
        const date = moment(unix_time);
        return date.fromNow()
    }

    return (
        <div className={'h-full text-secondary-foreground text-white overflow-y-auto'}
             style={{backgroundSize: "cover", backgroundImage: 'url(https://assets.msn.com/weathermapdata/1/static/background/v2.0/test/overview/mostcloudy_sunset.png)'}}>
            <div className={'h-full pt-1'}>
                <div className={'w-full flex justify-end items-center'}>
                    <HoverCard>
                        <HoverCardTrigger className={'flex items-center gap-1 px-2 w-fit'}>
                            <h1 className={'text-secondary-foreground font-semibold'}>Hover for Info</h1>
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
                            Current weather in {weatherData.data.name}
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
                            src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyCloudyDayV2.svg"
                        />
                        <span className="text-white ml-2 text-4xl leading-16 flex items-center decoration-0">
                            <span className="text-5xl">{weatherData.data.main.temp.toFixed()}</span>
                            <span className="text-2xl">°C</span>
                        </span>
                        <div className="ml-8">
                            <div className="inline-block text-lg font-semibold leading-6 whitespace-nowrap pt-4">Mostly
                                cloudy
                            </div>
                            <span className="text-white flex h-9 font-normal items-center pt-1 decoration-0">
                                <div className="text-base leading-4 opacity-80 mr-3">Feels like</div>
                                <div className="text-base leading-6">14°</div>
                            </span>
                        </div>
                        <table className="max-w-50 text-base absolute right-2"></table>
                    </div>
                    <div className="flex h-16 items-center mb-3 justify-center flex-col">
                        <p className="text-sm leading-6 m-0 font-semibold">
                            The skies will be mostly cloudy. </p>
                        <p className="text-sm leading-6 m-0 font-semibold">The high will be 17°</p>
                    </div>
                </div>
                <div className={'px-4 pb-4 max-w-2xl'}>
                    <div className={'flex justify-between flex-wrap gap-4'}>
                        <div className="h-9 flex w-20">
                            <div
                                className="relative block overflow-hidden text-xs font-normal leading-4 opacity-100">
                                <HoverCard>
                                    <HoverCardTrigger className={'hover:text-white no-underline hover:no-underline'}>
                                        <div className={'flex items-center gap-1'}>
                                            <h1 className={'text-white font-semibold opacity-80'}>Air quality</h1>
                                            <InfoCircledIcon className={'opacity-30'}/>
                                        </div>
                                        <div
                                            className="text-base leading-6 font-normal flex items-center">
                                            <svg width="14" height="14" style={{opacity: 1}}>
                                                <circle cx="5" cy="8" r="4" fill="#00AE56"></circle>
                                            </svg>
                                            30
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align={"end"}>
                                        <p>
                                            <span className="font-semibold">Good air quality (0-50)</span><br/>
                                            Primary pollutant <span className="font-semibold">PM2.5 6.0 μg/m³</span>
                                        </p>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        </div>
                        <div className="h-9 flex w-20">
                            <div
                                className="relative block overflow-hidden text-xs font-normal leading-4 opacity-100">
                                <HoverCard>
                                    <HoverCardTrigger className={'hover:text-white no-underline hover:no-underline'}>
                                        <div className={'flex items-center gap-1'}>
                                            <h1 className={'text-white font-semibold opacity-80'}>Wind</h1>
                                            <InfoCircledIcon className={'opacity-30'}/>
                                        </div>
                                        <div className="text-base leading-6 font-normal">
                                            7 km/h
                                            <span className="pl-1 block transform -rotate-80 opacity-100"
                                                  style={{width: "14px", height: "14px"}}>
                                                <svg width="14" height="14" viewBox="0 0 10 14">
                                                    <path d="M5 0L9.67 14L5 9.33L0.33 14L5 0Z" fill="white"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align={"end"} className={'flex flex-col gap-3'}>
                                        <span className={'font-bold'}>Light breeze (6 - 11 km/h)</span>
                                        Wind felt on face; leaves
                                        rustle;
                                        wind vane moved by wind.
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        </div>
                        <div className="h-9 flex w-20">
                            <div
                                className="relative block overflow-hidden text-xs font-normal leading-4 opacity-100">
                                <HoverCard>
                                    <HoverCardTrigger className={'hover:text-white no-underline hover:no-underline'}>
                                        <div className={'flex items-center gap-1'}>
                                            <h1 className={'text-white font-semibold opacity-80'}>Humidity</h1>
                                            <InfoCircledIcon className={'opacity-30'}/>
                                        </div>
                                        <div className="text-base leading-6 font-normal">
                                            70%
                                            <span className="pl-1 block transform -rotate-80 opacity-100"
                                                  style={{width: "14px", height: "14px"}}>
                                                <svg width="14" height="14" viewBox="0 0 10 14">
                                                    <path d="M5 0L9.67 14L5 9.33L0.33 14L5 0Z" fill="white"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align={"end"} className={'flex flex-col gap-3'}>
                                        Amount of moisture present in the
                                        air relative to the maximum amount of moisture the air can contain at its
                                        current temperature.
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        </div>
                        <div className="h-9 flex w-20">
                            <div
                                className="relative block overflow-hidden text-xs font-normal leading-4 opacity-100">
                                <HoverCard>
                                    <HoverCardTrigger className={'hover:text-white no-underline hover:no-underline'}>
                                        <div className={'flex items-center gap-1'}>
                                            <h1 className={'text-white font-semibold opacity-80'}>Visibility</h1>
                                            <InfoCircledIcon className={'opacity-30'}/>
                                        </div>
                                        <div className="text-base leading-6 font-normal">
                                            10km
                                            <span className="pl-1 block transform -rotate-80 opacity-100"
                                                  style={{width: "14px", height: "14px"}}>
                                                <svg width="14" height="14" viewBox="0 0 10 14">
                                                    <path d="M5 0L9.67 14L5 9.33L0.33 14L5 0Z" fill="white"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align={"end"} className={'flex flex-col gap-3 font-semibold'}>
                                        Good visibility (5 - 10 km)
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        </div>
                        <div className="h-9 flex w-20">
                            <div
                                className="relative block overflow-hidden text-xs font-normal leading-4 opacity-100">
                                <HoverCard>
                                    <HoverCardTrigger className={'hover:text-white no-underline hover:no-underline'}>
                                        <div className={'flex items-center gap-1'}>
                                            <h1 className={'text-white font-semibold opacity-80'}>Pressure</h1>
                                            <InfoCircledIcon className={'opacity-30'}/>
                                        </div>
                                        <div className="text-base leading-6 font-normal">
                                            1018 mb
                                            <span className="pl-1 block transform -rotate-80 opacity-100"
                                                  style={{width: "14px", height: "14px"}}>
                                                <svg width="14" height="14" viewBox="0 0 10 14">
                                                    <path d="M5 0L9.67 14L5 9.33L0.33 14L5 0Z" fill="white"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align={"end"} className={'flex flex-col gap-3'}>
                                        Pressure is the weight of the air
                                        in the atmosphere. It is normalized to the standard atmospheric pressure of
                                        1,013.25 mb (29.9212 inHg). Higher pressure is usually associated with sunny
                                        weather, lower pressure with stormy weather.
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        </div>
                        <div className="h-9 flex w-20">
                            <div
                                className="relative block overflow-hidden text-xs font-normal leading-4 opacity-100">
                                <HoverCard>
                                    <HoverCardTrigger className={'hover:text-white no-underline hover:no-underline'}>
                                        <div className={'flex items-center gap-1'}>
                                            <h1 className={'text-white font-semibold opacity-80'}>Dew point</h1>
                                            <InfoCircledIcon className={'opacity-30'}/>
                                        </div>
                                        <div className="text-base leading-6 font-normal">
                                            8°
                                            <span className="pl-1 block transform -rotate-80 opacity-100"
                                                  style={{width: "14px", height: "14px"}}>
                                                <svg width="14" height="14" viewBox="0 0 10 14">
                                                    <path d="M5 0L9.67 14L5 9.33L0.33 14L5 0Z" fill="white"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align={"end"}>
                                        The temperature to which the air
                                        needs to be cooled for moisture to condense, for example, as dew. The higher the
                                        dew point, the more "muggy" it feels.
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className={"h-32 flex-wrap flex px-2 m-0 max-w-3xl gap-2"}>
                    <div
                        className="w-32 outline-none border-0 bg-white bg-opacity-5 relative flex justify-between items-center h-28 text-center bg-opacity-3 rounded-md p-0">
                        <div className={'flex flex-col p-3 h-full w-full'}>
                            <p className={'w-full font-semibold text-base h-1/4 flex opacity-80 pl-2'}>7 Mar</p>
                            <div className={'flex h-3/4 w-full gap-6 items-center'}>
                                <img
                                    className={'w-12 h-12'}
                                    alt={'g'}
                                    src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D200PartlySunnyV2.svg"/>
                                <div className={'flex flex-col'}>
                                    <span className={'font-semibold opacity-90 text-xl'}>17°</span>
                                    <span className={'font-semibold opacity-70 text-xl'}>7°</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-32 outline-none border-0 bg-white bg-opacity-5 relative flex justify-between items-center h-28 text-center bg-opacity-3 rounded-md p-0">
                        <div className={'flex flex-col p-3 h-full w-full'}>
                            <p className={'w-full font-semibold text-base h-1/4 flex opacity-80 pl-2'}>7 Mar</p>
                            <div className={'flex h-3/4 w-full gap-6 items-center'}>
                                <img
                                    className={'w-12 h-12'}
                                    alt={'g'}
                                    src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D200PartlySunnyV2.svg"/>
                                <div className={'flex flex-col'}>
                                    <span className={'font-semibold opacity-90 text-xl'}>17°</span>
                                    <span className={'font-semibold opacity-70 text-xl'}>7°</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-32 outline-none border-0 bg-white bg-opacity-5 relative flex justify-between items-center h-28 text-center bg-opacity-3 rounded-md p-0">
                        <div className={'flex flex-col p-3 h-full w-full'}>
                            <p className={'w-full font-semibold text-base h-1/4 flex opacity-80 pl-2'}>7 Mar</p>
                            <div className={'flex h-3/4 w-full gap-6 items-center'}>
                                <img
                                    className={'w-12 h-12'}
                                    alt={'g'}
                                    src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D200PartlySunnyV2.svg"/>
                                <div className={'flex flex-col'}>
                                    <span className={'font-semibold opacity-90 text-xl'}>17°</span>
                                    <span className={'font-semibold opacity-70 text-xl'}>7°</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-32 outline-none border-0 bg-white bg-opacity-5 relative flex justify-between items-center h-28 text-center bg-opacity-3 rounded-md p-0">
                        <div className={'flex flex-col p-3 h-full w-full'}>
                            <p className={'w-full font-semibold text-base h-1/4 flex opacity-80 pl-2'}>7 Mar</p>
                            <div className={'flex h-3/4 w-full gap-6 items-center'}>
                                <img
                                    className={'w-12 h-12'}
                                    alt={'g'}
                                    src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D200PartlySunnyV2.svg"/>
                                <div className={'flex flex-col'}>
                                    <span className={'font-semibold opacity-90 text-xl'}>17°</span>
                                    <span className={'font-semibold opacity-70 text-xl'}>7°</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-32 outline-none border-0 bg-white bg-opacity-5 relative flex justify-between items-center h-28 text-center bg-opacity-3 rounded-md p-0">
                        <div className={'flex flex-col p-3 h-full w-full'}>
                            <p className={'w-full font-semibold text-base h-1/4 flex opacity-80 pl-2'}>7 Mar</p>
                            <div className={'flex h-3/4 w-full gap-6 items-center'}>
                                <img
                                    className={'w-12 h-12'}
                                    alt={'g'}
                                    src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D200PartlySunnyV2.svg"/>
                                <div className={'flex flex-col'}>
                                    <span className={'font-semibold opacity-90 text-xl'}>17°</span>
                                    <span className={'font-semibold opacity-70 text-xl'}>7°</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default WeatherPanel