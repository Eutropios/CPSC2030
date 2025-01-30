(function () {
    var setCopyRightYear = function () {
        var copy = document.querySelector("footer>kbd>span");
        if (copy !== null)
            copy.textContent = new Date().getFullYear().toString();
    };
    var changeBackgroundColor = function () {
        var first = document.getElementById("first");
        if (first !== null)
            first.style.background = "AliceBlue";
        var second = document.getElementById("second");
        if (second !== null)
            second.style.background = "Aquamarine";
        var third = document.getElementById("third");
        if (third !== null)
            third.style.background = "DarkSalmon";
    };
    var setValues = function () {
        var dropdown = document.querySelector("select");
        if (dropdown !== null) {
            for (var i = 1; i < 1001; ++i) {
                var option = document.createElement("option");
                option.value = i.toString();
                option.text = i.toString();
                dropdown.add(option);
            }
        }
    };
    var convertNumber = function (value) {
        console.log(value);
        var table = document.getElementById("output");
        var tbody = document.createElement("tbody");
        var tr = document.createElement("tr");
        var data = [];
        data.push(value.toString());
        data.push(value.toString(2));
        data.push(value.toString(16));
        for (var i = 0; i < data.length; ++i) {
            var td = document.createElement("td");
            td.setAttribute("class", "text-center");
            var cell = document.createTextNode(data[i]);
            td.appendChild(cell);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        if (table !== null)
            table.appendChild(tbody);
    };
    window.onload = function () {
        setCopyRightYear();
        // @ts-ignore
        document.querySelector("#change").onclick = changeBackgroundColor;
        setValues();
        var dropdown = document.querySelector("select");
        // @ts-ignore
        dropdown.onchange = function (event) { return convertNumber(Number(event.target.value)); };
    };
})();
