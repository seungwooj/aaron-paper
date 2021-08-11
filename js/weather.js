const API_KEY = "c0e89ea5a1f93f7d1f250e40f2d447a2";
const COORDS = "coords";

function getWeatherAndCity(lat, lon) {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const weather = document.querySelector("#weather span:first-child");
			const city = document.querySelector("#weather span:last-child");
			weather.innerText = `${data.weather[0].main} / ${data.main.temp} Celcius @`;
			city.innerText = data.name;
		});
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function onGeoSuccess(position) {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	const coordsObj = {
		latitude: lat,
		longitude: lon,
	};
	saveCoords(coordsObj);
	getWeatherAndCity(lat, lon);
}

function onGeoFailure() {
	alert("Can't find your location.");
}

function requestCoords() {
	navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFailure);
}

const loadedCoords = localStorage.getItem(COORDS);
if (loadedCoords === null) {
	requestCoords();
} else {
	const parseCoords = JSON.parse(loadedCoords);
	getWeatherAndCity(parseCoords.latitude, parseCoords.longitude);
}
