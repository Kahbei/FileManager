const fs = require("fs");
const cp = require("child_process");

class FileManager {
    constructor() {}

    listElement = (path) => {
        if (!path || path === undefined) {
            path = "";
        }

        console.log(path);

        cp.exec(`dir ${path} /b`, (err, data) => {
            if (err) {
                throw err;
            }

            const test = data.split("\r\n").slice(0, -1);
            console.log(test);
        });
    };

    newFolder = (newFolderName) => {
        if (fs.existsSync(newFolderName)) {
            console.log("The directory already exist");
        } else {
            fs.mkdir(newFolderName, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
    };

    newFile = (fileName, fileContent) => {
        fs.writeFile(fileName, fileContent.trim(), (err) => {
            if (err) {
                throw err;
            }

            console.log(`${fileName} saved !`);
        });
    };
}

module.exports = new FileManager();
