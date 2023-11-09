import moment from "moment/moment";
import {weatherBackgroundById, weatherIconsById} from "@/panels/BackendPanels/WeatherPanel/utils";

export const timestampToReadable = (unix_time: number) => {
    const date = moment(unix_time);
    return date.fromNow()
}

export const unixToHHmm = (unix_time: number) => {
    const currentTime = moment.unix(unix_time);
    return currentTime.format('hh:mm A')
}

export const displayWeatherAssetsById = (id: number, unix_time: number, isBackground = false) => {
    const currentTime = moment.unix(unix_time);
    const currentHour = currentTime.hour();
    const startOfDay = 6;
    const endOfDay = 18;
    let current_weather: number = 800
    let isDay = currentHour >= startOfDay && currentHour < endOfDay;
    let idDawn = currentHour >= 17 && currentHour < 19;
    let weatherCustomString = ""

    weatherCustomString = `${current_weather}`

    switch (true) {
        case (id >= 200 && id < 250): // Thunder
            current_weather = 200
            break;
        case (id >= 300 && id < 350): // Drizzle
            current_weather = 300
            break;
        case (id >= 500 && id < 550): // Rain
            current_weather = 500
            break;
        case (id >= 600 && id < 650): // Snow
            current_weather = 600
            break;
        case (id >= 700 && id < 750): // Fog
            current_weather = 700
            break;
        case (id === 800): // Clear
            current_weather = 800
            weatherCustomString = '800_day'
            if (isDay) {
                weatherCustomString = '800_day'
            } else {
                weatherCustomString = '800_night'
            }
            break;
        case (id >= 801 && id < 850): // Clouds
            weatherCustomString = '900'
            if (idDawn) {
                weatherCustomString = '900_dawn'
            }
            current_weather = 900
            break;
        default:
            current_weather = 800
    }
    if (isBackground) return weatherBackgroundById[weatherCustomString]
    return weatherIconsById[weatherCustomString]
}