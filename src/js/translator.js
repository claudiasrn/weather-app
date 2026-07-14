export function processWeatherData(rawWeatherData) {
    const localMs = (rawWeatherData.currentConditions.datetimeEpoch + rawWeatherData.tzoffset * 3600) * 1000;
    const todayStr = new Date(localMs).toISOString().split('T')[0];
    const todayIndex = rawWeatherData.days.findIndex(d => d.datetime === todayStr);

    const currentHour = Number(rawWeatherData.currentConditions.datetime.split(':')[0]);
    const startIndex = rawWeatherData.days[todayIndex].hours.findIndex(
        h => Number(h.datetime.split(':')[0]) === currentHour
    );

    const next24Raw = [
        ...rawWeatherData.days[todayIndex].hours.slice(startIndex),
        ...rawWeatherData.days[todayIndex + 1].hours
    ].slice(0, 24);

    let processedWeatherData = {
        location: rawWeatherData.resolvedAddress,
        current: {
            tempC: roundTemp(rawWeatherData.currentConditions.temp),
            tempF: celsiusToFahrenheit(rawWeatherData.currentConditions.temp),
            highC: roundTemp(rawWeatherData.days[todayIndex].tempmax),
            lowC: roundTemp(rawWeatherData.days[todayIndex].tempmin),
            highF: celsiusToFahrenheit(rawWeatherData.days[todayIndex].tempmax),
            lowF: celsiusToFahrenheit(rawWeatherData.days[todayIndex].tempmin),
            feelslikeC: roundTemp(rawWeatherData.currentConditions.feelslike),  
            feelslikeF: celsiusToFahrenheit(rawWeatherData.currentConditions.feelslike),
            condition: rawWeatherData.currentConditions.conditions,
            icon: rawWeatherData.currentConditions.icon,
            humidity: rawWeatherData.currentConditions.humidity,
            windspeed: rawWeatherData.currentConditions.windspeed,
            uvindex: rawWeatherData.currentConditions.uvindex,
            precip: rawWeatherData.currentConditions.precip,
            preciptype: rawWeatherData.currentConditions.preciptype,
            moonphase: rawWeatherData.currentConditions.moonphase,
            sunrise: formatHHMM(rawWeatherData.currentConditions.sunrise),
            sunset: formatHHMM(rawWeatherData.currentConditions.sunset),
        },
        hourly: [],
        daily: []
    };

    let processedWeatherDataDayIdex = 0;
    for (let i = todayIndex+1; i <= todayIndex + 10; i++) {
        processedWeatherData.daily[processedWeatherDataDayIdex] = {
            tempmaxC: roundTemp(rawWeatherData.days[i].tempmax),
            tempminC: roundTemp(rawWeatherData.days[i].tempmin),
            tempmaxF: celsiusToFahrenheit(rawWeatherData.days[i].tempmax),
            tempminF: celsiusToFahrenheit(rawWeatherData.days[i].tempmin),
            icon: rawWeatherData.days[i].icon,
            condition: rawWeatherData.days[i].conditions,
            day: getWeekday(rawWeatherData.days[i].datetime),
            date: rawWeatherData.days[i].datetime
        };

        processedWeatherDataDayIdex++;
    }

    for (let i = 0; i <= 23; i++) {
        processedWeatherData.hourly[i] = {
            time: next24Raw[i].datetime.split(':')[0],
            icon: next24Raw[i].icon,
            tempC: roundTemp(next24Raw[i].temp),
            tempF: celsiusToFahrenheit(next24Raw[i].temp),
            precipprob: next24Raw[i].precipprob
        };
    }

    console.log(processedWeatherData);
    return processedWeatherData;

}

function celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 9/5) + 32);
}

function roundTemp(value) {
    return Math.round(value);
}

function getWeekday(dateStr) {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' });
}

function formatHHMM(timeStr) {
    return timeStr.slice(0, 5);
}