import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import React from "react";
import {unixToHHmm} from "@/panels/BackendPanels/WeatherPanel/functions";

const WeatherSubDetails = ({weatherData}) => {

    const windPopupInfoLogic = () => {
        const windSpeed = weatherData.data.list[0].wind.speed.toFixed(0);
        const windSpeedDetails = {
            1: {
                title: "Light air (0 - 5 km/h)",
                description: "Direction shown by smoke drift but not by wind vanes."
            },
            2: {
                title: "Light breeze (6 - 11 km/h)",
                description: "Wind felt on face; leaves rustle; wind vane moved by wind."
            },
            3: {
                title: "Gentle breeze (11 - 20 km/h)",
                description: "Leaves and small twigs in constant motion."
            },
            4: {
                title: "Strong breeze (20+ km/h)",
                description: "Large branches in motion ; whistling heard in telegraph wires; umbrellas used with difficulty."
            }
        }
        let windInfo: { title: string, description: string } = {
            title: "",
            description: ""
        };
        switch (true) {
            case windSpeed > 20:
                windInfo = windSpeedDetails[1];
                break;
            case windSpeed > 11:
                windInfo = windSpeedDetails[3];
                break;
            case windSpeed > 6:
                windInfo = windSpeedDetails[2];
                break;
            case windSpeed <= 6:
                windInfo = windSpeedDetails[1];
                break;
        }

        return windInfo;
    }
    const windPopupInfo: { title: string, description: string } = windPopupInfoLogic()

    const visiblitiyPopupInfo = () => {
        const visibility = weatherData.data.list[0].visibility / 1000 // 10000meters divided by 1000
        const visibilityDetails = {
            1: "Good visibility (5 - 10 km)",
            2: "Moderate visibility (2 - 5 km)",
            3: "Poor visibility (1 - 2 km)",
            4: "Bad visibility (0 - 1 km)",
        }
        switch (true) {
            case visibility > 5:
                return visibilityDetails[1];
            case visibility > 2:
                return visibilityDetails[2];
            case visibility > 1:
                return visibilityDetails[3];
            case visibility <= 1:
                return visibilityDetails[4];
            default:
                return visibilityDetails[4]
        }
    }

    return <div className={'px-4 pb-4 flex items-center justify-center'}>
        <div className={'flex justify-between flex-wrap gap-4'}>
            <div className="h-9 flex w-20">
                <div
                    className="relative block overflow-hidden text-xs font-normal leading-4 opacity-100">
                    <HoverCard>
                        <HoverCardTrigger className={'hover:text-white no-underline hover:no-underline'}>
                            <div className={'flex items-center gap-1'}>
                                <h1 className={'text-white font-semibold opacity-80'}>Wind</h1>
                                <InfoCircledIcon className={'opacity-30'}/>
                            </div>
                            <div className="text-base leading-6 font-normal flex items-center gap-1">
                                {weatherData.data.list[0].wind.speed.toFixed(0)} km/h
                                <span className=" w-4 h-4"
                                      style={{rotate: `${weatherData.data.list[0].wind.deg}deg`}}>
                                                <svg width="14" height="14" viewBox="0 0 10 14">
                                                    <path d="M5 0L9.67 14L5 9.33L0.33 14L5 0Z" fill="white"></path>
                                                </svg>
                                            </span>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent align={"end"} className={'flex flex-col gap-3'}>
                            <span className={'font-bold'}>{windPopupInfo.title}</span>
                            {windPopupInfo.description}
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
                                {weatherData.data.list[0].main.humidity} %
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
                                {weatherData.data.list[0].visibility / 1000}km
                                <span className="pl-1 block transform -rotate-80 opacity-100"
                                      style={{width: "14px", height: "14px"}}>
                                                <svg width="14" height="14" viewBox="0 0 10 14">
                                                    <path d="M5 0L9.67 14L5 9.33L0.33 14L5 0Z" fill="white"></path>
                                                </svg>
                                            </span>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent align={"end"} className={'flex flex-col gap-3 font-semibold'}>
                            {visiblitiyPopupInfo()}
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
                                {weatherData.data.list[0].main.pressure} mb
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
                                <h1 className={'text-white font-semibold opacity-80'}>Sunrise</h1>
                                <InfoCircledIcon className={'opacity-30'}/>
                            </div>
                            <div className="text-base leading-6 font-normal">
                                {unixToHHmm(weatherData.data.city.sunrise)}
                                <span className="pl-1 block transform -rotate-80 opacity-100"
                                      style={{width: "14px", height: "14px"}}>
                                                <svg width="14" height="14" viewBox="0 0 10 14">
                                                    <path d="M5 0L9.67 14L5 9.33L0.33 14L5 0Z" fill="white"></path>
                                                </svg>
                                            </span>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent align={"end"}>
                            Sunrise marks the beginning of the day as the sun emerges above the horizon,
                            painting the sky with vibrant colors and signaling the start of daylight.
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
                                <h1 className={'text-white font-semibold opacity-80'}>Sunset</h1>
                                <InfoCircledIcon className={'opacity-30'}/>
                            </div>
                            <div
                                className="text-base leading-6 font-normal flex items-center">
                                {unixToHHmm(weatherData.data.city.sunset)}
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent align={"end"}>
                            Sunset symbolizes the day's end as the sun dips below the horizon, casting
                            stunning hues across the sky and ushering in the transition from day to night.
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
        </div>
    </div>

}

export default WeatherSubDetails