import React from 'react';
import {UmbrellaIcon} from "lucide-react";
import {FaRunning, FaWind} from "react-icons/fa";
import {TbJacket} from "react-icons/tb";
import {FaTemperatureThreeQuarters} from "react-icons/fa6";
import {WeatherList} from "@/panels/BackendPanels/WeatherPanel/types";
import {BsActivity} from "react-icons/bs";

function WeatherHealthAndSafety({weatherData}) {
    const currentWeather = weatherData.data.list[0] as WeatherList

    const customWeather = {
        precipitations: currentWeather.pop,
        feelsLike: currentWeather.main.feels_like,
        windSpeed: currentWeather.wind.speed,
    }

    const greenBubble = <span className="bg-green-500 ml-2 w-2 h-2 rounded-full"/>
    const yellowBubble = <span className="bg-yellow-500 ml-2 w-2 h-2 rounded-full"/>
    const redBubble = <span className="bg-red-500 ml-2 w-2 h-2 rounded-full"/>
    const purpleBubble = <span className="bg-purple-500 ml-2 w-2 h-2 rounded-full"/>

    const calculateUmbrellaLogic = () => {
        const {precipitations, feelsLike, windSpeed} = customWeather;

        const types = {
            1: "No need",
            2: "Likely needed",
            3: "Must have",
        };

        let typeOfRain = types[1];
        let colorOfRain = greenBubble;

        if (precipitations < 0.1) {
            typeOfRain = types[1];
            colorOfRain = greenBubble;
        } else if (precipitations >= 0.1 && precipitations < 0.5) {
            if (feelsLike < 20 || windSpeed >= 15) {
                typeOfRain = types[2];
                colorOfRain = yellowBubble;
            }
        } else if (precipitations >= 0.5) {
            typeOfRain = types[3];
            colorOfRain = redBubble;
        }

        return (
            <div className="flex flex-row items-center justify-end text-opacity-80 text-sm font-normal">
                <span className="text-right">{typeOfRain}</span>
                {colorOfRain}
            </div>
        );
    }

    const calculateOutdoorLogic = () => {
        const {precipitations, feelsLike, windSpeed} = customWeather;

        const types = {
            1: "Great",
            2: "Fair",
            3: "Very poor",
        };

        let outdoorStatus = types[2];
        let bubble = yellowBubble;

        if (precipitations >= 0.5) {
            outdoorStatus = types[3];
            bubble = redBubble;
        } else {
            if (feelsLike > 20 && windSpeed < 15) {
                outdoorStatus = types[1];
                bubble = yellowBubble;
            } else if ((feelsLike <= 20 && feelsLike >= 10) || windSpeed >= 15) {
                outdoorStatus = types[2];
                bubble = yellowBubble;
            } else {
                outdoorStatus = types[3];
                bubble = redBubble;
            }
        }

        return (
            <div className="flex flex-row items-center justify-end text-opacity-80 text-sm font-normal">
                <span className="text-right">{outdoorStatus}</span>
                {bubble}
            </div>
        );
    };

    const calculateClothingLogic = () => {
        const {precipitations, feelsLike, windSpeed} = customWeather;

        const types = {
            1: "Shorts",
            2: "Long sleeves",
            3: "Heavy Coat",
        };

        let typeOfCloth = types[1]
        let colorOfCloth = greenBubble

        if (precipitations >= 0 && precipitations < 0.3) {
            if (feelsLike > 25) {
                typeOfCloth = types[1];
                colorOfCloth = greenBubble// Wear shorts for warm and dry weather
            } else if (feelsLike >= 15 && feelsLike <= 25) {
                typeOfCloth = types[2]; // Long sleeves for moderate temperatures and dry weather
                colorOfCloth = yellowBubble
            } else {
                typeOfCloth = types[3]; // Heavy coat for cold and dry weather
                colorOfCloth = purpleBubble
            }
        } else if (precipitations >= 0.3 && precipitations <= 1) {

            if (feelsLike > 20 && windSpeed < 10) {
                typeOfCloth = types[2]; // Long sleeves for mild temperatures and light rain with low wind
                colorOfCloth = yellowBubble

            } else if (feelsLike <= 20 || windSpeed >= 10) {
                typeOfCloth = types[3]; // Heavy coat for cooler temperatures or windy/rainy conditions
                colorOfCloth = purpleBubble
            }
        }

        return (
            <div className="flex flex-row items-center justify-end text-opacity-80 text-sm font-normal">
                <span className="text-right">{typeOfCloth}</span>
                {colorOfCloth}
            </div>
        );
    };

    const calculateHeatstrokeRiskLogic = () => {
        const {feelsLike} = customWeather

        const types = {
            1: "Safe",
            2: "Caution",
            3: "Danger",
        };

        let heatstrokeRisk = types[1];
        let colorOfRisk = greenBubble

        if (feelsLike < 30) {
            heatstrokeRisk = types[1]; // Safe (32.2°C is equivalent to 90°F)
            colorOfRisk = greenBubble
        } else if (feelsLike >= 30 && feelsLike < 35) {
            heatstrokeRisk = types[2]; // Caution (40.5°C is equivalent to 105°F)
            colorOfRisk = yellowBubble
        } else if (feelsLike >= 35) {
            heatstrokeRisk = types[3]; // Danger
            colorOfRisk = redBubble
        }

        return (
            <div className="flex flex-row items-center justify-end text-opacity-80 text-sm font-normal">
                <span className="text-right">{heatstrokeRisk}</span>
                {colorOfRisk}
            </div>
        );
    };

    const calculateWindSpeedRisk = () => {
        const {windSpeed} = customWeather

        const types = {
            1: "Safe",
            2: "Moderate",
            3: "High",
        };

        let windRisk = types[1];
        let colorOfWind = greenBubble
        if (windSpeed < 11) {
            windRisk = types[1]; // Low (16 km/h is around 10 mph)
            colorOfWind = greenBubble
        } else if (windSpeed >= 11 && windSpeed < 22) {
            colorOfWind = yellowBubble
            windRisk = types[2]; // Moderate (32 km/h is around 20 mph)
        } else if (windSpeed >= 22) {
            windRisk = types[3]; // High
            colorOfWind = redBubble
        }

        return (
            <div className="flex flex-row items-center justify-end text-opacity-80 text-sm font-normal">
                <span className="text-right">{windRisk}</span>
                {colorOfWind}
            </div>
        );
    };

    const calculateActivitiesLogic = () => {
        const {precipitations, feelsLike, windSpeed} = customWeather;

        const types = {
            1: "Very Poor",
            2: "Fair",
            3: "Great",
        };

        let activityFeasibility = types[3]; // Default to "Great"
        let colorOfActivity = greenBubble
        if (precipitations >= 0.5) {
            activityFeasibility = types[1]; // "Very Poor" if heavy precipitation
            colorOfActivity = redBubble
        } else {
            if (feelsLike < 10 || feelsLike > 30 || windSpeed > 25) {
                activityFeasibility = types[1]; // "Very Poor" if conditions are extreme
                colorOfActivity = redBubble
            } else if ((feelsLike >= 10 && feelsLike <= 20) && windSpeed < 15) {
                activityFeasibility = types[3]; // "Great" for mild conditions with low wind
                colorOfActivity = greenBubble
            } else {
                activityFeasibility = types[2]; // "Fair" for other acceptable conditions
                colorOfActivity = yellowBubble

            }
        }

        return (
            <div className="flex flex-row items-center justify-end text-opacity-80 text-sm font-normal">
                <span className="text-right">{activityFeasibility}</span>
                {colorOfActivity}
            </div>
        );
    };

    const healthAndSafetyCards = [
        {
            icon: <UmbrellaIcon size={20}/>,
            name: "Umbrella",
            details: calculateUmbrellaLogic()
        },
        {
            icon: <FaRunning size={20}/>,
            name: "Outdoor",
            details: calculateOutdoorLogic()
        },
        {
            icon: <FaTemperatureThreeQuarters size={20}/>,
            name: "Heat Stroke",
            details: calculateHeatstrokeRiskLogic()
        },
        {
            icon: <BsActivity size={20}/>,
            name: "Activities",
            details: calculateActivitiesLogic()
        },
        {
            icon: <FaWind size={20}/>,
            name: "Wind Chill",
            details: calculateWindSpeedRisk()
        },
        {
            icon: <TbJacket size={20}/>,
            name: "Clothing",
            details: calculateClothingLogic()
        }
    ]

    return (
        <div className={'flex px-4 pb-4 gap-2 flex-wrap justify-center'}>
            {healthAndSafetyCards.map((card, index) => (
                <div
                    key={index}
                    className="w-64 bg-opacity-10 bg-white flex relative cursor-pointer h-12 rounded-2xl p-2.5 px-3 flex-row items-center z-2 border-2 border-transparent">
                    <div
                        className="flex items-center justify-center flex-shrink-0 bg-opacity-20 bg-black w-9 h-9 rounded-full text-white">
                        {card.icon}
                    </div>
                    <div className="flex flex-grow flex-row items-center justify-between">
                        <div className="text-white ml-2.5 text-left font-semibold text-sm leading-5 capitalize">
                            {card.name}
                        </div>
                        {card.details}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WeatherHealthAndSafety;