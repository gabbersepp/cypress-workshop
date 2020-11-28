const fs = require("fs");

module.exports = (on, config) => {
    on("task", {
        doesFileExist({ path }) {
            return fs.existsSync(path);
         }
    })
}
