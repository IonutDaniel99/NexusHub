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

export const displayWeatherIconById = (id: number, unix_time: number, isBackground = false) => {
    const currentTime = moment.unix(unix_time);
    const currentHour = currentTime.hour();
    const startOfDay = 6;
    const endOfDay = 18;
    let current_weather: number = 800
    let isDay = currentHour >= startOfDay && currentHour < endOfDay;
    let weatherCustomString = ""
    switch (true) {
        case (id >= 200 && id < 250):
            current_weather = 200
            break;
        case (id >= 300 && id < 350):
            current_weather = 300
            break;
        case (id >= 500 && id < 550):
            current_weather = 500
            break;
        case (id >= 600 && id < 650):
            current_weather = 600
            break;
        case (id >= 700 && id < 750):
            current_weather = 700
            break;
        case (id === 800):
            current_weather = 800
            break;
        case (id >= 801 && id < 850):
            current_weather = 900
            break;
        default:
            current_weather = 800
    }

    if (current_weather === 800) {
        if (isDay) {
            weatherCustomString = `${current_weather}_day`
        } else {
            weatherCustomString = `${current_weather}_night`
        }
    } else {
        weatherCustomString = `${current_weather}`
    }
    if (isBackground) return weatherBackgroundById[weatherCustomString]
    return weatherIconsById[weatherCustomString]
}