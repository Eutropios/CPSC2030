(() => {
    const setCopyRightYear = () => {
        const copy = document.querySelector("footer>kbd>span");
        if (copy !== null) {
            copy.textContent = new Date().getFullYear().toString();
        }
    };

    const getGeoLocation = () => {
        // your code goes here
    };

    const getJsonData = async (url) => {
        // your code goes here
    };

    const displayPlots = async () => {
        // your code goes here
    };

    window.onload = () => {
        setCopyRightYear();
    };
})();
