(() => {
    const API_KEY_NASA = 'YOUR NAS API KEY'
    const API_KEY_WEATHER = 'YOUR OPEN WETHEAR MAP API KEY'
    const urlNasa = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY_NASA}`
    const urlWeather =`https://api.openweathermap.org/data/2.5/forecast?lat=49.28&lon=-123.12&units=metric&appid=${API_KEY_WEATHER}`   
   
    const setCopyrightYear = () => {
      let year = new Date().getFullYear();
      document.querySelector("kbd>span").innerHTML = year;
    }
    const getJSONData = async (url) => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        return data
      }
      catch (error) {
        console.log("\t|Something went wrong while fetching JSON data!")
      }
    }
    const displayImage = async () => {
      const data = await getJSONData(urlNasa)
      image = document.querySelector('#nasa')
      image.src = data.photos[0].img_src
    }
    const displayData= async () => {
        const data = await getJSONData(urlWeather)  
        console.log(data)
        document.querySelector('#city').innerHTML = `<span class="btn btn-md btn-outline-info">${data.city.name.toUpperCase()}</span>`
        document.querySelector('#level').innerHTML = `<kbd>${data.list[0].main.sea_level} M</kbd>` 
        document.querySelector('#description').innerHTML = `<span class="btn btn-md btn-outline-info">${data.list[0].weather[0]['description'].toUpperCase()}</span>` 
        document.querySelector('#temperature').innerHTML = `<kbd>${data.list[0].main.temp} °C<kbd>` 
        document.querySelector('#feels').innerHTML = `<kbd>${data.list[0].main.feels_like} °C<kbd>`
    }
    window.onload = () => {
      setCopyrightYear()
      document.querySelector('#weatherData').onclick = displayData
      document.querySelector('button[class="btn btn-lg btn-primary"]').onclick = displayImage
      }
  
  })()