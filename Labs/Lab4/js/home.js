(() => {
    const setCopyRightYear = () => {
        const copy = document.querySelector("footer>kbd>span");
        if (copy !== null) copy.textContent = new Date().getFullYear().toString();
    };

    window.onload = () => {
        setCopyRightYear();
    };
})();
