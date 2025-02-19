(() => {
    const setCopyRightYear = () => {
        const copy = document.querySelector("footer>kbd>span");
        if (copy !== null) copy.textContent = new Date().getFullYear().toString();
    };

    const setRGBValues = () => {
        const dropdownList = document.querySelectorAll("select");
        if (dropdownList !== null) {
            for (const dropdownItem of dropdownList) {
                for (let i = 0; i < 256; ++i) {
                    const option = document.createElement("option");
                    option.value = i.toString();
                    option.text = i.toString();
                    dropdownItem.add(option);
                }
            }
        }
    };

    const formatRGB = (rgb, isInteger = true) => {
        // your code goes here
    };

    const displayColorInformation = (rgb) => {
        // your code goes here
    };

    const clearTable = () => {
        // your code goes here
    };

    /**
     *
     * @param {Number[]} rgb - array of integer rgb values for a single colour
     * @returns {Number[]} array of floating point rgb values for single colour
     */
    const computeFloatingPointRGB = (rgb) => {
        //
    };

    const computeHexadecimalRGB = (rgb) => {
        // your code goes here
    };

    const displayBasicColors = () => {
        // your code goes here
    };

    const displayGrayColors = () => {
        // your code goes here
    };

    const displaySelectedColors = () => {
        // your code goes here
    };

    window.onload = () => {
        setCopyRightYear();
        setRGBValues();
    };
})();
