(() => {
    WEATHER_API_KEY = "975ec9bab286d6d3920bd31dd58e4998";
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
                const longlat = `(Latitude,Longitude)=(${xy.latitude},${xy.longitude})`;
                document.getElementById("geo-location").textContent = longlat;
                console.log(longlat);
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
        // rm blank option to make the website look more presentable
        select.remove(0);
        cityPlaceholder.text = "Select a city";
        cityPlaceholder.hidden = true;
        select.add(cityPlaceholder);
    };

    const populate = (select, content) => {
        for (i of content) {
            const option = document.createElement("option");
            option.value = i.toString();
            option.text = i.toString();
            select.add(option);
        }
    };

    const populateCities = async () => {
        const countrySelect = document.getElementById("countryselect").value;
        const citySelect = document.getElementById("cityselect");
        const data = await getJSONData("./data/cities.json");
        const cities = data[countrySelect];
        createCitySelect(citySelect);
        populate(citySelect, cities);
    };

    const populateCountries = async () => {
        const data = await getJSONData("./data/cities.json");
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
    };
})();
