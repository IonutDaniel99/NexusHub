// @ts-nocheck
import thunderstorm from "./Icons/thunderstorm.svg";
import clouds from "./Icons/clouds.svg";
import dayClear from "./Icons/dayClear.svg";
import fog from "./Icons/fog.svg";
import nightClear from "./Icons/nightClear.svg";
import snow from "./Icons/snow.svg";
import rain from "./Icons/rain.svg";
import drizzle from "./Icons/drizzle.svg";


import clearNightBg from "./Backgrounds/clearNight.png"
import cloudyBg from "./Backgrounds/cloudy.png"
import fogBg from "./Backgrounds/fog.png"
import rainBg from "./Backgrounds/rain.png"
import snowBg from "./Backgrounds/snow.png"
import sunnyBg from "./Backgrounds/sunny.png"
import thunderBg from "./Backgrounds/thunderstorm.png"
import mostCloudyBg from "./Backgrounds/mostcloudy_sunset.png"


export const weatherBackgroundById = {
    "200": thunderBg,
    "300": rainBg,
    "500": rainBg,
    "600": snowBg,
    "700": fogBg,
    "800_day": sunnyBg,
    "800_night": clearNightBg,
    "900_dawn": mostCloudyBg,
    "900": cloudyBg,
};
export const weatherIconsById = {
    "200": thunderstorm,
    "300": drizzle,
    "500": rain,
    "600": snow,
    "700": fog,
    "800_day": dayClear,
    "800_night": nightClear,
    "900": clouds,
};

export const weatherDescriptions = {
    "200": "Thunderstorm with light rain. Expect some lightning and light rain showers.",
    "201": "Thunderstorm with rain. Prepare for thunder and rainfall.",
    "202": "Expect heavy rain and strong thunderstorms.",
    "210": "Experience light thunderstorms.",
    "211": "Prepare for a typical thunderstorm with moderate rainfall.",
    "212": "Get ready for a heavy thunderstorm with intense rain.",
    "221": "Ragged thunderstorm ahead. Expect irregular rain and thunder.",
    "230": "Expect thunderstorms with light drizzle.",
    "231": "Thunderstorm with drizzle. Prepare for light rain amidst thunder.",
    "232": "Prepare for heavy drizzle during thunderstorms.",
    "300": "Experience light intensity drizzle. Expect light, scattered drizzles.",
    "301": "Drizzle. Light rainfall to be expected.",
    "302": "Expect heavy intensity drizzle. Prepare for intense and continuous drizzle.",
    "310": "Light intensity drizzle rain.",
    "311": "Drizzle rain. Light rain accompanied by drizzle.",
    "312": "Prepare for heavy intensity drizzle rain.",
    "313": "Expect showers and drizzles together.",
    "314": "Prepare for heavy showers along with drizzle.",
    "321": "Expect drizzle along with light rain showers.",
    "500": "Expect light rain. Prepare for mild rainfall.",
    "501": "Moderate rain is expected. Prepare for a medium-intensity rainfall.",
    "502": "Heavy intensity rain. Expect intense and heavy rainfall.",
    "503": "Expect very heavy rainfall. Prepare for extreme rain showers.",
    "504": "Extreme rain. Prepare for torrential rainfall.",
    "511": "Prepare for freezing rain. Expect ice formation due to freezing rainfall.",
    "520": "Expect light intensity shower rain.",
    "521": "Shower rain. Rain showers expected.",
    "522": "Prepare for heavy intensity shower rain.",
    "531": "Ragged shower rain. Prepare for irregular and scattered heavy rainfall.",
    "600": "Light snowfall expected.",
    "601": "Expect moderate snowfall.",
    "602": "Heavy snow. Prepare for intense and heavy snow showers.",
    "611": "Prepare for sleet - a mixture of snow and rain.",
    "612": "Expect light sleet showers.",
    "613": "Sleet showers expected.",
    "615": "Light rain and snow together.",
    "616": "Rain and snow combination expected.",
    "620": "Expect light shower snow.",
    "621": "Shower snow. Prepare for snow showers.",
    "622": "Heavy shower snow. Prepare for intense snow showers.",
    "701": "Expect mist. Fog-like conditions with reduced visibility.",
    "711": "Smoke. Hazy conditions due to smoke.",
    "721": "Haze. Expect reduced visibility due to hazy conditions.",
    "731": "Expect sand or dust whirls.",
    "741": "Fog. Prepare for thick fog with limited visibility.",
    "751": "Expect sand in the atmosphere.",
    "761": "Dust. Presence of dust in the air.",
    "762": "Volcanic ash in the atmosphere.",
    "771": "Expect squalls with strong winds and rain.",
    "781": "Tornado. Expect a tornado.",
    "800": "Clear skies with no clouds in sight.",
    "801": "Few clouds expected, around 11-25% coverage.",
    "802": "Scattered clouds expected, around 25-50% coverage.",
    "803": "Broken clouds expected, around 51-84% coverage.",
    "804": "Overcast clouds expected, around 85-100% coverage."
};


