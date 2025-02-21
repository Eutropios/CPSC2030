(() => {
    const url = 'https://picsum.photos/400/500?random=1'
    const setCopyrightYear = () => {
        let year = new Date().getFullYear()
        document.querySelector('footer>kbd>span').textContent = year

    }    // Binary Large OBject (blob)

    const getImageData = async () => {
        try {
            const response = await fetch(url)
            console.log(response)
            const imageBlob = await response.blob()
            return imageBlob
        }
        catch (error) {
            console.log("\t|Something went wrong while getting image data!")
        }
    }

    const displayImage = async () => {
        const imageData = await getImageData()
        image = document.querySelector('#random')
        image.src = URL.createObjectURL(imageData)
    }

    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let xy = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
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
        document.querySelector('button[class*="btn btn-lg btn-primary"]').onclick = displayImage

    }

})()