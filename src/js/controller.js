import { getWeather } from "./fetcher.js";
import { processWeatherData } from "./translator.js";
import { render, renderLoading, renderError } from "./domRenderer.js";

export async function loadWeather(location, state) {
	renderLoading();

	try {
		const rawData = await getWeather(location);
		const processedData = processWeatherData(rawData);

		state.location = location;
		state.currentData = processedData;

		await render(state);
	} catch (error) {
		renderError(error, location);
	}
}

export async function handleSubmit(event, state) {
	event.preventDefault();
	const input = event.target.querySelector("#search");
	const location = input.value.trim();
	if (!location) return;

	await loadWeather(location, state);
}
