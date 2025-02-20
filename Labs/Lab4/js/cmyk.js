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
     * @param {Number[] | string[]} rgb - array of values containing the rgb values of a colour
     * @param {boolean} isInteger - flag that determines whether the values are integers or floating point
     * @returns {string} string-formatted rgb value of colour
     */
    const formatRGB = (rgb, isInteger = true) =>
        `(${(isInteger ? rgb : rgb.map((x) => x.toFixed(2))).join(",")})`;

    const createSwatch = (rgb) => {
        const td = document.createElement("td");
        td.style.backgroundColor = rgb;
        td.style.borderRadius = "30px";
        return td;
    };

    const displayColorInformation = (rgb) => {
        const tbody = document.getElementById("output");
        const tr = document.createElement("tr");
        const hex = computeHexadecimalRGB(rgb);
        const data = [formatRGB(rgb), formatRGB(computeFloatingPointRGB(rgb), false), hex];
        for (let i = 0; i < data.length; ++i) {
            const td = document.createElement("td");
            td.setAttribute("class", "text-center");
            const cell = document.createTextNode(data[i]);
            td.appendChild(cell);
            tr.appendChild(td);
        }
        tr.appendChild(createSwatch(hex));
        if (tbody !== null) tbody.appendChild(tr);
    };

    /**
     * Clears colour table colour information by modifying HTML content
     */
    const clearTable = () => {
        const tbody = document.getElementById("output");
        if (tbody !== null) {
            const rows = tbody.querySelectorAll("tr"); // Get all rows
            for (const row of rows) {
                tbody.removeChild(row);
            }
        }
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
     * @returns {string} hexadecimal representation of the colour as a string
     */
    const computeHexadecimalRGB = (rgb) => {
        const hexValues = rgb.map((x) => {
            const hex = x.toString(16).toUpperCase();
            // add leading 0 if the hex val is only 1 char long
            return hex.length === 1 ? `0${hex}` : hex;
        });
        return `#${hexValues.join("")}`;
    };

    /**
     * Modifies HTML to display the "basic colour set" as described in PDF
     */
    const displayBasicColors = () => {
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
        clearTable();
        for (const colour of basicColours) {
            displayColorInformation(colour);
        }
    };

    /**
     * Modifies HTML to display the "grey colour set" as described in PDF
     */
    const displayGrayColors = () => {
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
        clearTable();
        for (const colour of greyColours) {
            displayColorInformation(colour);
        }
    };

    /**
     * Modifies HTML to displayed the selected colour using values from select elements
     */
    const displaySelectedColors = () => {
        // Need to cast to int first because otherwise the hex conversion wont work
        const redval = Number(document.getElementById("redval").value);
        const greenval = Number(document.getElementById("greenval").value);
        const blueval = Number(document.getElementById("blueval").value);
        displayColorInformation([redval, greenval, blueval]);
    };

    window.onload = () => {
        setCopyRightYear();
        setRGBValues();
        document.querySelector("#basiccol").onclick = displayBasicColors;
        document.querySelector("#greycol").onclick = displayGrayColors;
        document.querySelector("#selectedcol").onclick = displaySelectedColors;
        document.querySelector("#clearcol").onclick = clearTable;
    };
})();
