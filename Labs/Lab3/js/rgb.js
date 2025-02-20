(() => {
    /**
     * Sets copyright year based on client's local date
     */
    const setCopyRightYear = () => {
        const copy = document.querySelector("footer>kbd>span");
        if (copy !== null) copy.textContent = new Date().getFullYear().toString();
    };

    /**
     * Populates select elements on page with values 0-255 inclusive
     */
    const setRGBValues = () => {
        const dropdownList = document.querySelectorAll("select");
        // Guard against bad query by checking for null
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

    /**
     *
     * @param {Numberp[]} rgb - array of values containing the rgb values of a colour
     * @param {boolean} isInteger - flag that determines whether the values are integers or floating point
     * @returns string-formatted rgb value of colour
     */
    const formatRGB = (rgb, isInteger = true) => {
        // Round the floating point rgb to two decimal places, and make sure that
        // all values have two decimal places even if it's like 0.1
        // your code goes here
    };

    const displayColorInformation = (rgb) => {
        // your code goes here
    };

    /**
     * Clears colour table colour information by modifying HTML content
     */
    const clearTable = () => {
        // your code goes here
    };

    /**
     * Computes the floating point representation of a colour given its integer values
     * @param {Number[]} rgb - array of integer rgb values for a single colour
     * @returns {Number[]} array of floating point rgb values for single colour
     */
    const computeFloatingPointRGB = (rgb) => rgb.map((x) => x / 255);

    /**
     * Computes the hexadecimal representation of a colour given its integer values
     * @param {Number[]} rgb - array of integer rgb values for a single colour
     * @returns {Number} hexadecimal representation of the colour
     */
    const computeHexadecimalRGB = (rgb) => rgb.map((x) => x.toString(16).toUpperCase());

    /**
     * Modifies HTML to display the "basic colour set" as described in PDF
     */
    const displayBasicColors = () => {
        // for each of the items in the basic colour array,
        // convert the items to floating point rgb and store it.
        // Convert the items to hexadecimal.
        const basicColours = [
            [0, 0, 0],
            [255, 0, 0],
            [0, 255, 0],
            [0, 0, 255],
            [0, 255, 255],
            [255, 0, 255],
            [255, 255, 0],
            [255, 255, 255],
        ];
    };

    /**
     * Modifies HTML to display the "grey colour set" as described in PDF
     */
    const displayGrayColors = () => {
        // for each of the items in the grey colour array,
        // convert the items to floating point rgb and store it.
        // Convert the items to hexadecimal.
        const greyColours = [
            [0, 0, 0],
            [33, 33, 33],
            [66, 66, 66],
            [99, 99, 99],
            [132, 132, 132],
            [165, 165, 165],
            [198, 198, 198],
            [231, 231, 231],
        ];
    };

    /**
     * Modifies HTML to displayed the selected colour using values from select elements
     */
    const displaySelectedColors = () => {
        // Fetch the values in the select boxes.
        // in the grey colour array,
        // convert the items to floating point rgb and store it.
        // Convert the items to hexadecimal.
    };

    window.onload = () => {
        setCopyRightYear();
        setRGBValues();
        console.log(computeFloatingPointRGB([42, 161, 152]));
        console.log(computeHexadecimalRGB([42, 161, 152]));
    };
})();
