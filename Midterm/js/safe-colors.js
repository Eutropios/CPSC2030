(() => {
    const setCopyRightYear = () => {
        const year = new Date().getFullYear();
        document.querySelector("kbd>span").innerHTML = year;
    };

    const fullHexCode = (rgb) => {
        let finalString = "#";
        for (const i of rgb) {
            finalString = `${finalString}${i}${i}`;
        }
        return finalString;
    };

    const createSwatch = (rgb) => {
        const td = document.createElement("td");
        td.style.backgroundColor = rgb;
        td.style.borderRadius = "30px";
        return td;
    };

    const createButtonNode = (num) => {
        const button = document.createElement("button");
        button.setAttribute(
            "class",
            "btn btn-sm text-center btn-outline-warning text-warning rounded-1",
        );
        button.textContent = num;
        const td = document.createElement("td");
        td.setAttribute("class", "text-center");
        td.appendChild(button);
        return td;
    };

    const display = () => {
        /*
            display that is invoked when the user clicks the Display Web Safe Colors button
            to generate, and display all the web safe colors
        */
        // Compute each web safe colour via a loop
        // Yikes! O(n^3) time! This is the only feasible way I could do this without hard-coding
        let counter = 0;
        for (let r = 0; r < 16; r += 3) {
            for (let g = 0; g < 16; g += 3) {
                for (let b = 0; b < 16; b += 3) {
                    counter++;
                    const hexVal = (r.toString(16) + g.toString(16) + b.toString(16)).toUpperCase();
                    const fullHexVal = fullHexCode(hexVal);
                    const tbody = document.getElementById("output");
                    const tr = document.createElement("tr");
                    tr.appendChild(createButtonNode(counter));
                    const data = [fullHexVal, `#${hexVal}`];
                    for (const i of data) {
                        const td = document.createElement("td");
                        td.setAttribute("class", "text-center");
                        const cell = document.createTextNode(i);
                        td.appendChild(cell);
                        tr.appendChild(td);
                    }
                    tr.appendChild(createSwatch(fullHexVal));
                    tbody.appendChild(tr);
                }
            }
        }
    };

    window.onload = () => {
        setCopyRightYear();
        document.querySelector("div.card-body>button.btn").onclick = display;
    };
})();
