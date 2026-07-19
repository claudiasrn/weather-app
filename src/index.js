import {
	createIcons,
	Search,
	MapPin,
	Droplets,
	Wind,
	Sun,
	Sunrise,
	Sunset,
	CloudRain,
} from "lucide";
import { render } from "./js/domRenderer.js";
import { handleSubmit, loadWeather } from "./js/controller.js";
import State from "./js/state.js";
import "./styles/style.css";

createIcons({
	icons: { Search, MapPin, Droplets, Wind, Sun, Sunrise, Sunset, CloudRain },
});

const state = new State();
document
	.querySelector("form")
	.addEventListener("submit", (event) => handleSubmit(event, state));

loadWeather("Frankfurt am Main", state);

document.querySelector(".toggle-button button").addEventListener("click", () => {
	state.unit = state.unit === "C" ? "F" : "C";

	document.querySelectorAll(".toggle-button button span").forEach((span, i) => {
		const isActive = (i === 0 && state.unit === "C") || (i === 1 && state.unit === "F");
		span.classList.toggle("active", isActive);
	});

	if (state.currentData) {
		render(state);
	}
});