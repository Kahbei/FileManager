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

                console.log(`${newFolderName} created !`);
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

    deleteFolder = (folderName) => {
        try {
            fs.readdirSync(folderName).map((file) => fs.unlinkSync(`${folderName}/${file}`));
            fs.rmdir(folderName, (err) => {
                if (err) {
                    throw err;
                }

                console.log("Delete done");
            });

            return { error: "" };
        } catch (error) {
            return { error: "Something went wrong with the delete" };
        }
    };

    deleteFile = (fileName) => {
        setTimeout(() => {
            fs.unlinkSync(fileName);
        }, 1000);
    };

    moveEntity = (oldEntityName, newEntityName) => {
        fs.rename(oldEntityName, newEntityName, (err) => {
            if (err) {
                throw err;
            }
        });
    };

    useCommand = (commandName) => {
        try {
            const commandResult = cp.execSync(commandName).toString("utf-8");
            return { commandResult: commandResult, error: "" };
        } catch (error) {
            return { commandResult: "", error: error };
        }
    };
}

module.exports = new FileManager();
