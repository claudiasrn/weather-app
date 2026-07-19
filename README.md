# Weather App

A weather forecast web app built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-weather-app)'s Full Stack JavaScript curriculum. Search any location to see current conditions, an hourly forecast for the next 24 hours, and a 10-day outlook — styled with condition-based video backgrounds and a dynamic color palette that shifts with the weather.

## Features

- **Location search** — look up current weather and forecasts for any city
- **Current conditions** — temperature, feels-like, high/low, humidity, wind, UV index, precipitation, sunrise/sunset, and moon phase (with illumination percentage)
- **24-hour forecast** — scrollable hourly strip with temperature, condition icon, and rain probability
- **10-day forecast** — daily high/low with a visual range bar showing each day's temperature relative to the rest of the week
- **°C / °F toggle** — switches units instantly with no re-fetch, since both are precomputed up front
- **Condition-aware visuals** — background video, icon color, and a tinted overlay all change based on the current weather condition
- **Loading and error states** — a skeleton loading screen mirrors the real layout while data is fetching, and distinct error screens handle bad locations, connection issues, and API failures

## Built with

- Vanilla JavaScript (ES modules), HTML, CSS
- [Webpack](https://webpack.js.org/) for bundling and dev server
- [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api) for forecast data
- [Lucide](https://lucide.dev/) for interface icons
- Visual Crossing's [WeatherIcons](https://github.com/visualcrossing/WeatherIcons) set (2nd Set Monochrome) for condition icons, recolored dynamically per condition
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## Architecture

The app is split into small, single-responsibility modules rather than one large script:

| Module | Responsibility |
|---|---|
| `fetcher.js` | Makes the API request, throws on a bad response |
| `translator.js` | Converts the raw API response into a clean, display-ready data shape (unit conversions, date/time formatting, derived values) |
| `state.js` | Holds the current location, selected unit, and processed weather data |
| `domRenderer.js` | Renders state to the DOM — current conditions, hourly strip, daily list, loading skeleton, and error screens |
| `controller.js` | Orchestrates the above: handles form submission, calls the fetch → translate → render pipeline, and routes failures to the error screen |
## Note on the API key

This project hardcodes the Visual Crossing API key directly in `fetcher.js` rather than using an environment variable. Normally, API keys should never be committed to a public repo — but the assignment brief explicitly notes that Visual Crossing's key is safe to expose publicly, with no cost or security consequence for this use case. In a production app, or with any paid, rate-limited, or sensitive API, this key would instead be stored server-side and accessed via environment variables, never shipped to the client.

## Credits

- Weather data: [Visual Crossing](https://www.visualcrossing.com/)
- Condition icons: [Visual Crossing WeatherIcons](https://github.com/visualcrossing/WeatherIcons) (LGPL-3.0)
- Interface icons: [Lucide](https://lucide.dev/)
- Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) & [Inter](https://fonts.google.com/specimen/Inter)