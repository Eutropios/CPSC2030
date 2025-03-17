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

    const extractData = (weatherData) => {
        const plotData = {
            temperature: [],
            feelsLike: [],
            timestamp: [],
        };
        for (const dataSet of weatherData) {
            plotData.temperature.push(dataSet.main.temp);
            plotData.feelsLike.push(dataSet.main.feels_like);
            plotData.timestamp.push(dataSet.dt_txt);
        }

        return plotData;
    };

    const displayPlots = async () => {
        const weatherData = await getJsonData("./data/weather-vancouver.json");
        const unpackedData = extractData(weatherData.list);

        const trace1 = {
            x: unpackedData.timestamp,
            y: unpackedData.temperature,
            mode: "markers",
            type: "scatter",
            name: "Temperature",
            marker: { size: unpackedData.temperature.map((x) => Math.abs(x * 3)), opacity: 0.5 },
        };

        const trace2 = {
            x: unpackedData.timestamp,
            y: unpackedData.feelsLike,
            mode: "markers",
            type: "scatter",
            name: "Feels Like",
            marker: { size: unpackedData.feelsLike.map((x) => Math.abs(x * 3)), opacity: 0.5 },
        };
        const data = [trace1, trace2];
        const layout = {
            xaxis: {
                title: {
                    text: "Weather Dates",
                    font: {
                        size: 18,
                        color: "#0000FF",
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Celsius (°C)",
                    font: {
                        size: 18,
                        color: "#0000FF",
                    },
                },
            },
        };

        Plotly.newPlot("plot", data, layout);
    };

    window.onload = () => {
        setCopyRightYear();
        getGeoLocation();
        document.getElementById("displayPlots").onclick = displayPlots;
    };
})();
