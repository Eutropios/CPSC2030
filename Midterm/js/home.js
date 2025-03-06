(() => {
    const setCopyrightYear = () => {
        const year = new Date().getFullYear();
        document.querySelector("kbd>span").innerHTML = year;
    };
    /* Binary Large OBject (blob)*/

    const getJSONData = async (url) => {
        try {
            const response = await fetch(url);
            const data = response.json();
            return data;
        } catch (_) {
            console.log("\t|Something went wrong while fetching JSON data!");
        }
    };

    const setActivePage = () => {
        const currentPage = location.href.split("/").slice(-1)[0];
        const menuItems = document.querySelectorAll("nav ul li a");

        for (const menuItem of menuItems) {
            if (currentPage === menuItem.getAttribute("href")) {
                menuItem.classList.add("active");
            } else {
                menuItem.classList.remove("active");
            }
        }
    };

    window.onload = () => {
        setActivePage();
        setCopyrightYear();
        document.querySelector('button[class*="btn btn-lg btn-primary"]').onclick = displayImage;
    };
})();
