(() => {
    const setCopyRightYear = () => {
        const copy = document.querySelector("footer>kbd>span");
        if (copy !== null) {
            copy.textContent = new Date().getFullYear().toString();
        }
    };

    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const xy = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                const longlat = `(Latitude,Longitude)=(${xy.latitude}, ${xy.longitude})`;
                document.getElementById("geo-location").textContent = longlat;
                console.log(longlat);
            });
        } else {
            console.log("\t|Geolocation is not supported by this browser!");
        }
    };

    const getJsonData = async (url) => {
        try {
            const response = await window.fetch(url);
            const data = response.json();
            return data;
        } catch (_error) {
            console.log("\t|Something went wrong while fetching JSON data!");
        }
    };

    const normalizeString = (str) => {
        const charsToReplace = {
            ".": "%2E",
            " ": "%20",
        };
        return str.replace(/" "|"."/g, (m) => charsToReplace[m]);
    };

    const fetchWeatherData = async () => {
        const apiKeys = await getJsonData("./data/apiKeys.json");
        const weatherApiKey = apiKeys.weather;
        const weatherUrlRoot = "https://api.openweathermap.org/data/2.5/forecast?q=";
        const weatherUrlSuffix = `&units=metric&appid=${weatherApiKey}`;
        const countryCodes = await getJsonData("./data/country-code.json");

        const targetCountry = normalizeString(document.getElementById("countryselect").value);
        const targetCity = normalizeString(document.getElementById("cityselect").value);
        if (
            targetCity !== "" &&
            targetCity !== "select a city" &&
            targetCountry !== "Select a country"
        ) {
            const countryCode = countryCodes[targetCountry];
            const completeUrl =
                `${weatherUrlRoot}${targetCity},${countryCode}${weatherUrlSuffix}`.toLowerCase();
            const data = await getJsonData(completeUrl);
            return data;
        }
    };

    const setWeatherIcon = (description) => {
        // Reference: https://openweathermap.org/weather-conditions#example
        const iconCodeToBsName = {
            800: "bi-brightness-high",
            801: "bi-cloud-sun",
            802: "bi-cloud",
            803: "bi-clouds",
            804: "bi-clouds",
            5: "bi-cloud-rain-heavy",
            3: "bi-cloud-rain",
            2: "bi-cloud-lightning",
            6: "bi-snow3",
            7: "bi-cloud-fog",
        };
        const prefixChar = String(description).charAt(0);
        let code = prefixChar;
        if (prefixChar === "8") {
            code = description;
        }
        document.querySelector("#weatherIcon").innerHTML =
            `<i class="bi ${iconCodeToBsName[code]} display-4 align-middle"></i>`;
    };

    const editTable = (weatherData) => {
        document.querySelector("#error-box").innerHTML = "";
        document.querySelector("#cityHeader").innerHTML =
            `Weather in <span class="btn btn-outline-warning mb-2 align-middle">${weatherData.city.name}</span>`;
        const longlatStr = `(${weatherData.city.coord.lat},${weatherData.city.coord.lon})`;
        document.querySelector("#latlong").innerHTML =
            `<kbd class="align-right d-inline-flex h4 mt-2" id="longlatval">${longlatStr}</kbd>`;
        document.querySelector("#level").innerHTML =
            `<kbd class="align-right d-inline-flex h4 mt-2">${weatherData.list[0].main.sea_level} M</kbd>`;
        document.querySelector("#description").innerHTML =
            `<span class="btn btn-md btn-outline-info">${weatherData.list[0].weather[0].description.toUpperCase()}</span>`;
        document.querySelector("#temperature").innerHTML =
            `<kbd class="align-right d-inline-flex h4 mt-2">${weatherData.list[0].main.temp} °C<kbd>`;
        document.querySelector("#feels").innerHTML =
            `<kbd class="align-right d-inline-flex h4 mt-2">${weatherData.list[0].main.feels_like} °C<kbd>`;
        document.querySelector("#humidity").innerHTML =
            `<kbd class="align-right d-inline-flex h4 mt-2">${weatherData.list[0].main.humidity} %<kbd>`;
        document.querySelector("#wind").innerHTML =
            `<kbd class="align-right d-inline-flex h4 mt-2">${weatherData.list[0].wind.speed} (KM/H)<kbd>`;
        setWeatherIcon(weatherData.list[0].weather[0].id);
    };

    const displayWeatherData = async () => {
        const weatherData = await fetchWeatherData();
        const country = document.querySelector("#countryselect").value;
        const city = document.querySelector("#cityselect").value;
        if (
            weatherData.cod === "200" &&
            country !== "Select a country" &&
            city !== "Select a city" &&
            city !== ""
        ) {
            editTable(weatherData);
            return;
        }
        document.querySelector("#error-box").innerHTML =
            `<div class="h2 bg-danger-subtle text-center border border-danger-subtle error-text-span mb-3 p-2">No weather data for ${city}</div>`;
    };

    const createCitySelect = (select) => {
        const cityPlaceholder = document.createElement("option");
        // rm all previous options in case the user picks a different country
        for (const _ in select.options) {
            select.remove(0);
        }
        cityPlaceholder.text = "Select a city";
        cityPlaceholder.hidden = true;
        select.add(cityPlaceholder);
    };

    const populate = (select, content) => {
        for (const i of content) {
            const option = document.createElement("option");
            option.value = i.toString();
            option.text = i.toString();
            select.add(option);
        }
    };

    const populateCities = async () => {
        const countrySelect = document.getElementById("countryselect").value;
        const citySelect = document.getElementById("cityselect");
        if (countrySelect !== "" && countrySelect !== "Select a country") {
            const data = await getJsonData("./data/cities.json");
            const cities = data[countrySelect];
            createCitySelect(citySelect);
            populate(citySelect, cities);
        }
    };

    const populateCountries = async () => {
        const data = await getJsonData("./data/cities.json");
        const countries = Object.keys(data);
        const dropdown = document.getElementById("countryselect");
        populate(dropdown, countries);
    };

    const displayMap = async () => {
        // NOTE: I made this function async to read the API keys from a JSON as to prevent
        // making them public on Github.
        const apiKeys = await getJsonData("./data/apiKeys.json");
        const mapBoxApiKey = apiKeys.mapbox;

        const coordsStr = document.querySelector("#longlatval").textContent;
        const arrayFromString = coordsStr.slice(1, -1).split(",").map(Number);
        mapboxgl.accessToken = mapBoxApiKey;
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/satellite-streets-v12",
            projection: "mercator",
            zoom: 10,
            interactive: false,
            center: [arrayFromString[1], arrayFromString[0]],
        });

        map.scrollZoom.disable();

        map.on("style.load", () => {
            map.setFog({});
        });
    };

    window.onload = () => {
        setCopyRightYear();
        getGeoLocation();
        populateCountries();
        document.getElementById("weatherData").onclick = populateCities;
        document.getElementById("cityButton").onclick = displayWeatherData;
        document.getElementById("displayMap").onclick = displayMap;
    };
})();
