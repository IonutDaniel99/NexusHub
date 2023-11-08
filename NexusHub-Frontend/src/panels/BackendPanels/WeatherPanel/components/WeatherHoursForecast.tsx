import {WeatherList} from "@/panels/BackendPanels/WeatherPanel/types";
import {displayWeatherIconById, unixToHHmm} from "@/panels/BackendPanels/WeatherPanel/functions";
import React from "react";

const WeatherHoursForecast = ({weatherData}) => {
    return <div className={"flex-wrap flex px-4 pb-4 gap-2 w-full justify-center"}>
        {weatherData.data.list.map((weatherCard: WeatherList, index: number) => {
            if (index === 0) return null
            return <div
                key={index}
                className="w-28 outline-none border-0 bg-white bg-opacity-5 relative flex justify-between items-center h-28 text-center bg-opacity-3 rounded-md p-0">
                <div className={'flex flex-col p-3 h-full w-full'}>
                    <p className={'w-full font-semibold text-base h-1/4 flex opacity-80 pl-2'}>{unixToHHmm(weatherCard.dt)}</p>
                    <div className={'flex h-3/4 w-full gap-3 items-center justify-center'}>
                        <img
                            className={'w-10 h-10'}
                            alt={''}
                            src={displayWeatherIconById(weatherCard.weather[0].id, weatherCard.dt)}/>
                        <div className={'flex flex-col'}>
                            <span
                                className={'font-semibold opacity-90 text-xl'}>{weatherCard.main.temp_max.toFixed()}°</span>
                        </div>
                    </div>
                </div>
            </div>
        })}
    </div>
}
export default WeatherHoursForecast