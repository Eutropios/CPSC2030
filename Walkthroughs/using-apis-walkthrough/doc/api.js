const url = 'https://jsonplaceholder.typicode.com/users'
    //const url = 'https://jsonplaceholder.typicode.com/posts'
    const urlImage = 'https://picsum.photos/400/500?random=1'
    const getJsonData = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    const getImageData = async (url) => {
        const response = await fetch(url)
        const imageBlob = await response.blob()
        return imageBlob
    }