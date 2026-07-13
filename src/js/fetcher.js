export async function getWeather(location) {
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?unitGroup=metric&include=current,hours,days&iconSet=icons2&contentType=json&key=3G2UJSYZQQGV8H98VNCZ56NDU"
    const weatherData = await fetch(url);

    if (!weatherData.ok) {
        throw new Error(`Weather API error: ${weatherData.status}`);
    }

    return await weatherData.json();

}