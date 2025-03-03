(() => {
    const setCopyRightYear = () => {
        const copy = document.querySelector("footer>kbd>span");
        if (copy !== null) copy.textContent = new Date().getFullYear().toString();
    };

    const getGeoLocation = () => {
        // your code goes here
    };

    const getJSONData = async (url) => {
        // your code goes here
    };

    const setWeatherIcon = (description) => {
        // your code goes here
    };

    const displayWeatherData = async () => {
        // your code goes here
    };

    const populateCities = async () => {
        // your code goes here
    };

    const populateCountries = async () => {
        // your code goes here
    };

    const displayMap = () => {
        // your code goes here
    };

    window.onload = () => {
        setCopyRightYear();
    };
})();
