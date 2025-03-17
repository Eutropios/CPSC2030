(() => {
    const config = require(`${__dirname}/config/config.js`);
    const express = require("express");
    const app = express();
    /**
     * Middleware declaration
     */
    app.use(express.json());
    app.use((request, response, next) => {
        config.logFile(request, response);
        next();
    });

    app.use(express.static(config.ROOT));
    app.get("/", (request, response) => {
        response.reader(`${config.ROOT}/index`, { page: "index", title: "Home page" });
    });

    // Start node.js http webserver
    app.listen(config.PORT, "localhost", () => {
        console.log(`\t|Server listening on ${config.PORT}`);
    });
})();
