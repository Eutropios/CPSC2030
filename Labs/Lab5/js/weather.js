(() => {
    const setCopyRightYear = () => {
        const copy = document.querySelector("footer>kbd>span");
        if (copy !== null) copy.textContent = new Date().getFullYear().toString();
    };

    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const xy = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                console.log(`(Latitude,Longitude)=(${xy.latitude},${xy.longitude})`);
            });
        } else {
            console.log("\t|Geolocation is not supported by this browser!");
        }
    };

    const getJSONData = async (url) => {
        try {
            const response = await window.fetch(url);
            const data = response.json();
            return data;
        } catch (error) {
            console.log("\t|Something went wrong while fetching JSON data!");
        }
    };

    const setWeatherIcon = (description) => {
        // your code goes here
    };

    const displayWeatherData = async () => {
        // your code goes here
    };

    const createCitySelect = (select) => {
        const cityPlaceholder = document.createElement("option");
        select.remove(0);
        cityPlaceholder.text = "Select a city";
        cityPlaceholder.hidden = true;
        select.add(cityPlaceholder);
    };

    const populateCities = async () => {
        const countrySelect = document.getElementById("countryselect").value;
        const citySelect = document.getElementById("cityselect");
        const data = await getJSONData("./data/cities.json");
        const cities = data[countrySelect];
        createCitySelect(citySelect);
        for (i of cities) {
            const option = document.createElement("option");
            option.value = i.toString();
            option.text = i.toString();
            citySelect.add(option);
        }
    };

    const populateCountries = async () => {
        const data = await getJSONData("./data/cities.json");
        const countries = Object.keys(data);
        const dropdown = document.getElementById("countryselect");
        for (i of countries) {
            const option = document.createElement("option");
            option.value = i.toString();
            option.text = i.toString();
            dropdown.add(option);
        }
    };

    const displayMap = () => {
        // your code goes here
    };

    window.onload = () => {
        setCopyRightYear();
        getGeoLocation();
        populateCountries();
        document.getElementById("weatherData").onclick = populateCities;
    };
})();
