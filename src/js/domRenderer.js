export async function render(state) {
	document.querySelector(".skeleton").classList.remove("is-visible");
	document.querySelector(".content").style.display = "grid";
	document.querySelector(".weather-now").style.display = "";
	document.querySelector(".next-24-hours").style.display = "";
	document.querySelector(".next-10-days").style.display = "";
	document.querySelector(".error").style.display = "none";
	document.querySelector("#search").disabled = false;

	const weatherData = state.currentData;
	const unit = state.unit;

	async function renderCurrentWeather() {
		const location = document.querySelector("#location");
		location.textContent = weatherData.location;

		const temp = document.querySelector("#temp");
		if (unit === "C") {
			temp.textContent = weatherData.current.tempC + "°";
		} else {
			temp.textContent = weatherData.current.tempF + "°";
		}

		const icon = document.querySelector("#icon");
		await renderIcon(weatherData.current.icon, icon);

		const condition = document.querySelector("#condition");
		condition.textContent = weatherData.current.condition;

		const feelslike = document.querySelector("#feelslike");
		if (unit === "C") {
			feelslike.textContent = weatherData.current.feelslikeC + "°";
		} else {
			feelslike.textContent = weatherData.current.feelslikeF + "°";
		}

		const high = document.querySelector("#high");
		if (unit === "C") {
			high.textContent = weatherData.current.highC + "°";
		} else {
			high.textContent = weatherData.current.highF + "°";
		}

		const low = document.querySelector("#low");
		if (unit === "C") {
			low.textContent = weatherData.current.lowC + "°";
		} else {
			low.textContent = weatherData.current.lowF + "°";
		}

		const humidity = document.querySelector("#humidity");
		humidity.textContent = weatherData.current.humidity + "%";

		const wind = document.querySelector("#windspeed");
		wind.textContent = weatherData.current.windspeed + " km/h";

		const uvindex = document.querySelector("#uvindex");
		uvindex.textContent = "UV " + weatherData.current.uvindex;

		const precipIcon = document.querySelector("#precip-icon");
		const precip = document.querySelector("#precip");
		const preciptype = document.querySelector("#preciptype");
		if (weatherData.current.precipIcon === "none") {
			precipIcon.textContent = "–";
			preciptype.textContent = "precip";
			precip.textContent = "0mm";
		} else {
			await renderIcon(weatherData.current.precipIcon, precipIcon);
			preciptype.textContent = weatherData.current.preciptype;
			precip.textContent = weatherData.current.precip + " mm";
		}

		const sunrise = document.querySelector("#sunrise");
		sunrise.textContent = weatherData.current.sunrise;

		const sunset = document.querySelector("#sunset");
		sunset.textContent = weatherData.current.sunset;

		const moonPic = document.querySelector("#moon-pic");
		await renderMoon(weatherData.current.moonPhaseImage, moonPic);

		const moonPhaseName = document.querySelector("#moon-phase-name");
		moonPhaseName.textContent = weatherData.current.moonPhaseName;

		const moonIllumination = document.querySelector("#moon-illumination");
		moonIllumination.textContent = weatherData.current.moonIllumination + "%";

		const localTime = document.querySelector("#local-time");
		startLocalClock(weatherData.timezone, localTime);

		const bgVideo = document.querySelector(".weather-bg");
		await renderVideo(weatherData.current.icon, bgVideo);

		const scrim = document.querySelector(".scrim");
		const tintColor = iconColors[weatherData.current.icon] || "#185FA5";
		scrim.style.background = `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, ${hexToRgba(tintColor, 0.25)} 45%, rgba(0,0,0,0.55) 100%)`;
	}

	async function renderHourlyWeather() {
		const next24El = document.querySelector(".next-24-hours .hourly");
		next24El.innerHTML = "";

		for (let i = 0; i <= 23; i++) {
			const hourEl = document.createElement("div");

			const time = document.createElement("span");
			time.textContent = weatherData.hourly[i].time;
			hourEl.append(time);

			const iconAndPrecip = document.createElement("div");
			iconAndPrecip.classList.add("icon-precip");

			const icon = document.createElement("span");
			await renderIcon(weatherData.hourly[i].icon, icon);
			iconAndPrecip.append(icon);

			const precipprob = document.createElement("span");
			precipprob.classList.add("precip-prob");
			if (weatherData.hourly[i].precipprob) {
				precipprob.textContent = weatherData.hourly[i].precipprob + "%";
			} else {
				precipprob.style.display = "none";
			}
			iconAndPrecip.append(precipprob);

			hourEl.append(iconAndPrecip);

			const temp = document.createElement("span");
			if (unit === "C") {
				temp.textContent = weatherData.hourly[i].tempC + "°";
			} else {
				temp.textContent = weatherData.hourly[i].tempF + "°";
			}
			hourEl.append(temp);

			next24El.append(hourEl);
		}
	}

	async function renderDailyWeather() {
		const next10El = document.querySelector(".next-10-days .daily");
		next10El.innerHTML = "";

		for (let i = 0; i <= 9; i++) {
			const dayEl = document.createElement("div");

			const weekday = document.createElement("span");
			weekday.textContent = weatherData.daily[i].day;
			dayEl.append(weekday);

			const precipprobAndIcon = document.createElement("div");
			await renderIcon(weatherData.daily[i].icon, precipprobAndIcon);
			const precipprob = document.createElement("span");
			if (weatherData.daily[i].precipprob) {
				precipprob.textContent = weatherData.daily[i].precipprob + "%";
			} else {
				precipprob.style.display = "none";
			}
			precipprob.classList.add("precip-prob");
			precipprobAndIcon.append(precipprob);
			dayEl.append(precipprobAndIcon);

			const low = document.createElement("span");
			if (unit === "C") {
				low.textContent = weatherData.daily[i].tempminC + "°";
			} else {
				low.textContent = weatherData.daily[i].tempminF + "°";
			}
			dayEl.append(low);

			const rangeTrack = document.createElement("div");
			rangeTrack.classList.add("range-track");
			const rangeFill = document.createElement("div");
			rangeFill.classList.add("range-fill");
			rangeTrack.append(rangeFill);
			rangeFill.style.left = weatherData.daily[i].barLeft + "%";
			rangeFill.style.width = weatherData.daily[i].barWidth + "%";
			dayEl.append(rangeTrack);

			const high = document.createElement("span");
			if (unit === "C") {
				high.textContent = weatherData.daily[i].tempmaxC + "°";
			} else {
				high.textContent = weatherData.daily[i].tempmaxF + "°";
			}
			dayEl.append(high);

			next10El.append(dayEl);
		}
	}

	await renderCurrentWeather();
	await renderHourlyWeather();
	await renderDailyWeather();

	document.querySelector(".next-24-hours .hourly").scrollLeft = 0;
	document.querySelector(".next-10-days .daily").scrollTop = 0;
}

import { createIcons, MapPinOff, CloudOff, Hourglass, WifiOff } from "lucide";

export function renderError(error, location) {
	document.querySelector(".skeleton").classList.remove("is-visible");
	document.querySelector(".content").style.display = "none";
	document.querySelector("#search").disabled = false;

	const errorContent = {
		400: {
			icon: "map-pin-off",
			title: "Location not found",
			desc: `We couldn't find weather data for "${location}". Check the spelling and try searching again.`,
		},
		401: {
			icon: "cloud-off",
			title: "Something went wrong",
			desc: "We're having trouble connecting to the weather service right now. Please try again shortly.",
		},
		429: {
			icon: "hourglass",
			title: "Too many requests",
			desc: "You've made too many requests. Please wait a moment and try again.",
		},
		network: {
			icon: "wifi-off",
			title: "Connection issue",
			desc: "Check your internet connection and try again.",
		},
	};

	const content = errorContent[error.status] || errorContent.network;

	const iconEl = document.querySelector(".error-icon");
	iconEl.innerHTML = `<i data-lucide="${content.icon}"></i>`;
	createIcons({ icons: { MapPinOff, CloudOff, Hourglass, WifiOff } });

	document.querySelector(".error-title").textContent = content.title;
	document.querySelector(".error-desc").textContent = content.desc;

	const errorEl = document.querySelector(".error");
	errorEl.style.display = "flex";

	const retryButton = errorEl.querySelector("button");
	retryButton.onclick = () => {
		errorEl.style.display = "none";
		document.querySelector(".content").style.display = "grid";
		document.querySelector("#search").focus();
	};
}

export function renderLoading() {
	document.querySelector(".skeleton").classList.add("is-visible");
	document.querySelector(".weather-now").style.display = "none";
	document.querySelector(".next-24-hours").style.display = "none";
	document.querySelector(".next-10-days").style.display = "none";
	document.querySelector("#search").disabled = true;
}

const iconColors = {
	"clear-day": "#BA7517",
	"clear-night": "#4A5578",
	"partly-cloudy-day": "#7C8A94",
	"partly-cloudy-night": "#4A5578",
	cloudy: "#7C8A94",
	fog: "#8B8B84",
	wind: "#3F9C88",
	rain: "#185FA5",
	"showers-day": "#185FA5",
	"showers-night": "#185FA5",
	"thunder-rain": "#4C3F91",
	"thunder-showers-day": "#4C3F91",
	"thunder-showers-night": "#4C3F91",
	snow: "#8FB4C7",
	"snow-showers-day": "#8FB4C7",
	"snow-showers-night": "#8FB4C7",
	freezingrain: "#5FB3C9",
	ice: "#B8DCE3",
};

async function renderIcon(iconName, targetElement) {
	const iconModule = await import(`../assets/icons/${iconName}.svg?raw`);
	targetElement.innerHTML = iconModule.default;
	const color = iconColors[iconName];
	if (color) {
		targetElement.style.color = color;
	}
}

async function renderMoon(moonName, targetElement) {
	const pictureModule = await import(`../assets/moon-pictures/${moonName}.png`);
	targetElement.innerHTML = `<img src="${pictureModule.default}" alt="${moonName}" />`;
}

function startLocalClock(timezone, targetElement) {
	function updateClock() {
		const timeString = new Intl.DateTimeFormat("en-GB", {
			timeZone: timezone,
			hour: "2-digit",
			minute: "2-digit",
		}).format(new Date());
		targetElement.textContent = timeString + " local";
	}

	updateClock();
	return setInterval(updateClock, 1000 * 30);
}

async function renderVideo(iconName, targetElement) {
	const videoModule = await import(`../assets/videos/${iconName}.mp4`);
	targetElement.src = videoModule.default;
	targetElement.load();
	targetElement.play();
}

function hexToRgba(hex, alpha) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
