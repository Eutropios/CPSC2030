(() => {
    const fs = require("node:fs");
    const config = {};
    config.PORT = process.env.PORT || 8080;
    config.ROOT = `${__dirname}/../../client`;
    config.LOG_FILE = `${__dirname}/../logs/node.js.log`;
    config.API_URL = "http://universities.hippolabs.com/search?country=?";
    config.logFile = (request, response) => {
        //const logs = []
        const log = {};
        log.date = new Date();
        log.url = request.url;
        log.method = request.method;
        log.statusCode = response.statusCode;
        //logs.push(log)
        fs.appendFile(config.LOG_FILE, JSON.stringify(log), (error) => {
            if (error) {
                console.log(`\t|Error appending to a file\n\t|${error}`);
            } else {
                console.info("\t|File was appended successfully!");
            }
        });
    };
    module.exports = config;
})();
