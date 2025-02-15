(() => {
    const setCopyRightYear = () => {
        const copy = document.querySelector("footer>kbd>span");
        if (copy !== null) copy.textContent = new Date().getFullYear().toString();
    };

    const changeBackgroundColor = () => {
        const first = document.getElementById("first");
        if (first !== null) first.style.background = "AliceBlue";
        const second = document.getElementById("second");
        if (second !== null) second.style.background = "Aquamarine";
        const third = document.getElementById("third");
        if (third !== null) third.style.background = "DarkSalmon";
    };

    const setValues = () => {
        const dropdown = document.querySelector("select");
        if (dropdown !== null) {
            for (let i = 1; i < 1001; ++i) {
                const option = document.createElement("option");
                option.value = i.toString();
                option.text = i.toString();
                dropdown.add(option);
            }
        }
    };

    const convertNumber = (value) => {
        console.log(value);
        const table = document.getElementById("output");
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        const data = [];
        data.push(value.toString());
        data.push(value.toString(2));
        data.push(value.toString(16));
        for (let i = 0; i < data.length; ++i) {
            const td = document.createElement("td");
            td.setAttribute("class", "text-center");
            const cell = document.createTextNode(data[i]);
            td.appendChild(cell);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        if (table !== null) table.appendChild(tbody);
    };

    window.onload = () => {
        setCopyRightYear();
        document.querySelector("#change").onclick = changeBackgroundColor;
        setValues();
        const dropdown = document.querySelector("select");
        dropdown.onchange = (event) => convertNumber(Number(event.target.value));
    };
})();
