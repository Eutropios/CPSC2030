(() => {
    const weatherApiKey = "975ec9bab286d6d3920bd31dd58e4998";

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
        const weatherUrlRoot = "https://api.openweathermap.org/data/2.5/forecast?q=";
        const weatherUrlSuffix = `&units=metric&appid=${weatherApiKey}`;
        const countryCodes = await getJsonData("./data/country-code.json");

        const targetCountry = normalizeString(document.getElementById("countryselect").value);
        const targetCity = normalizeString(document.getElementById("cityselect").value);
        console.log(targetCity);
        if (
            targetCity !== "" &&
            targetCity !== "select a city" &&
            targetCountry !== "Select a country"
        ) {
            const countryCode = countryCodes[targetCountry];
            /* const completeUrl =
                `${weatherUrlRoot}${targetCity},${countryCode}${weatherUrlSuffix}`.toLowerCase();
            const data = await getJsonData(completeUrl);*/
            const data = await getJsonData("./data/weather-vancouver.json");
            return data;
        }
    };

    const setWeatherIcon = (description) => {
        // your code goes here
    };

    const displayWeatherData = async () => {
        const weatherData = await fetchWeatherData();
        console.log(weatherData);
        if (
            document.querySelector("#countryselect").value !== "Select a country" &&
            document.querySelector("#cityselect").value !== "Select a city" &&
            document.querySelector("#cityselect").value !== ""
        ) {
            document.querySelector("#cityHeader").innerHTML =
                `Weather in <span class="btn btn-outline-warning mb-2">${weatherData.city.name}</span>`;
            // TODO: Figure out why the images go off center when the script executes
            // TODO: Figure out how to vertically center the kbd text
            // TODO: USE BOOTSTRAP ICONS INSTEAD OF THE IMAGES OMG WHY DIDN'T I THINK OF THIS
            document.querySelector("#latlong").innerHTML =
                `<kbd class="align-right mb-2">(${weatherData.city.coord.lat},${weatherData.city.coord.lon})</kbd>`;
            /*document.querySelector("#level").innerHTML =
                `<kbd>${weatherData.list[0].main.sea_level} M</kbd>`;
            /*document.querySelector("#description").innerHTML =
            `<span class="btn btn-md btn-outline-info">${data.list[0].weather[0]["description"].toUpperCase()}</span>`;
        document.querySelector("#temperature").innerHTML = `<kbd>${data.list[0].main.temp} °C<kbd>`;
        document.querySelector("#feels").innerHTML = `<kbd>${data.list[0].main.feels_like} °C<kbd>`;*/
        }
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

    const displayMap = () => {
        // your code goes here
    };

    window.onload = () => {
        setCopyRightYear();
        getGeoLocation();
        populateCountries();
        document.getElementById("weatherData").onclick = populateCities;
        document.getElementById("cityButton").onclick = displayWeatherData;
    };
})();
