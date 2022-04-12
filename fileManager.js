const fs = require("fs");
const util = require("util");
const cp = require("child_process");
const { throws } = require("assert");

class FileManager {
    constructor() {}

    listElement = (path) => {
        if (!path || path === undefined) {
            path = ".";
        }

        try {
            return { error: "", result: fs.readdirSync(path) };
        } catch (error) {
            return { error: "No such directory found.", result: [] };
        }
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
        // if(!fileContent)
        fs.writeFile(fileName, fileContent.trim(), (err) => {
            if (err) {
                throw err;
            }

            console.log(`${fileName} saved !`);
        });
    };
}

module.exports = new FileManager();
