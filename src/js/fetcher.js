export async function getWeather(location) {
	const url =
		"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
		location +
		"?unitGroup=metric&include=current,hours,days&iconSet=icons2&contentType=json&key=3G2UJSYZQQGV8H98VNCZ56NDU";

	let response;
	try {
		response = await fetch(url);
	} catch (networkError) {
		throw networkError;
	}

	if (!response.ok) {
		const error = new Error(`Weather API error: ${response.status}`);
		error.status = response.status;
		throw error;
	}

	return await response.json();
}
