(() => {
  const url = 'https://picsum.photos/400/500?random=1'
  


  const setCopyrightYear = () => {
    let year = new Date().getFullYear();
    document.querySelector("kbd>span").innerHTML = year;
  }
  /* Binary Large OBject (blob)*/
  const getImageData = async (url) => {
    try {
      const response = await fetch(url)
      const ImageBlob = await response.blob()
      return ImageBlob
    }
    catch (error) {
      console.log("\t|Something went wrong while fetching image data!")
    }

  }
  const getJSONData = async (url) => {
    try {
      const response = await fetch(url)
      const data = response.json()
      return data
    }
    catch (error) {
      console.log("\t|Something went wrong while fetching JSON data!")
    }
  }
  const displayImage = async () => {
    const imageData = await getImageData(url)
    image = document.querySelector('#random')
    image.src = URL.createObjectURL(imageData)
  }
  window.onload = () => {
    setCopyrightYear()
    document.querySelector('button[class*="btn btn-lg btn-primary"]').onclick = displayImage

  }

})()