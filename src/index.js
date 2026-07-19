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
