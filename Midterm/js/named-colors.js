(() => {
    const url = "./data/named-colors.json";
    const setCopyrightYear = () => {
        const year = new Date().getFullYear();
        document.querySelector("kbd>span").innerHTML = year;
    };

    const getJSONData = async (url) => {
        try {
            const response = await fetch(url);
            const data = response.json();
            return data;
        } catch (_) {
            console.log("\t|Something went wrong while fetching JSON data!");
        }
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

    const display = async () => {
        /*
            display that is invoked when the user clicks the Display Named Colors button
            to retrieve all the name colors from the data folder by using RESTful API
            and displays them in a table
        */
        const jsonData = await getJSONData(url);
        const colours = Object.entries(jsonData);
        let counter = 0;
        for (const colour of colours) {
            counter++;
            const tbody = document.getElementById("output");
            const tr = document.createElement("tr");
            tr.appendChild(createButtonNode(counter));
            const data = [colour[0].toUpperCase(), colour[1].toUpperCase()];
            for (const i of data) {
                const td = document.createElement("td");
                td.setAttribute("class", "text-center");
                const cell = document.createTextNode(i);
                td.appendChild(cell);
                tr.appendChild(td);
            }
            tr.appendChild(createSwatch(colour[1]));
            tbody.appendChild(tr);
        }
    };

    window.onload = () => {
        setCopyrightYear();
        document.querySelector("div.card-body>button.btn").onclick = display;
    };
})();
