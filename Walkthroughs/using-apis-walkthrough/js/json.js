(() => {
    /*const API_KEY_WEATHER = REDACTED;
    const API_KEY_NASA = REDACTED; */
    let lat = undefined
    let lon = undefined
    const urlNasa = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY_NASA}`
    const urlWeather = `https://api.openweathermap.org/data/2.5/forecast?q=vancouver&units=metric&appid=${API_KEY_WEATHER}`
    const getJSONData = async (url) => {
        try {
            const response = await window.fetch(url)
            const data = await response.json()
            return data
        }
        catch (error) {
            console.log("\t|Something went wrong while fetching JSON data!")
        }
    }

    const displayWeatherData = async () => {
        const data = await getJSONData(urlWeather)
        console.log(data)
        document.querySelector('#city').innerHTML = `<span class="btn btn-md btn-outline-info">${data.city.name.toUpperCase()}</span>`
        document.querySelector('#level').innerHTML = `<kbd>${data.list[0].main.sea_level} M</kbd>`
        document.querySelector('#description').innerHTML = `<span class="btn btn-md btn-outline-info">${data.list[0].weather[0]['description'].toUpperCase()}</span>`
        document.querySelector('#temperature').innerHTML = `<kbd>${data.list[0].main.temp} °C<kbd>`
        document.querySelector('#feels').innerHTML = `<kbd>${data.list[0].main.feels_like} °C<kbd>`

    }

    const displayImage = async () => {
        const data = await getJSONData(urlNasa)
        let index = Math.floor(Math.random() * data.photos.length)
        document.querySelector('#nasa').src = data.photos[index].img_src

    }

    const setCopyrightYear = () => {
        let year = new Date().getFullYear()
        document.querySelector('footer>kbd>span').textContent = year

    }

    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                lat = position.coords.latitude
                lon = position.coords.longitude
                let xy = {
                    latitude: lat,
                    longitude: lon
                }
                console.log(`(Latitude,Longitude)=(${xy.latitude},${xy.longitude})`)
            })
        } else {
            console.log(`\t|Geolocation is not supported by this browser!`)
        }
    }

    window.onload = () => {
        setCopyrightYear()
        getGeoLocation()
        document.querySelector('tr>td>button').onclick = displayWeatherData
        document.querySelector('button[class="btn btn-lg btn-primary"]').onclick = displayImage

    }

})()
