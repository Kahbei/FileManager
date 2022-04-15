const fs = require("fs");
const util = require("util");
const cp = require("child_process");

class FileManager {
    constructor() {}

    listElement = (path) => {
        if (!path || path === undefined) {
            path = ".";
        }

        try {
            return { error: "", result: fs.readdirSync(path) };
        } catch (err) {
            return { error: "No such directory found.", result: [] };
        }
    };

    newFolder = (newFolderName) => {
        if (fs.existsSync(newFolderName)) {
            return { error: "The directory already exist" };
        } else {
            try {
                fs.mkdirSync(newFolderName);
                return { error: "" };
            } catch (err) {
                return { error: "Something went wrong with the folder creations" };
            }
        }
    };

    newFile = (fileName, fileContent) => {
        if (fs.existsSync(fileName)) {
            return { error: "The file already exist" };
        } else {
            try {
                fs.writeFileSync(fileName, fileContent.trim());
                return { error: "" };
            } catch (err) {
                return { error: "Something went wrong with the file creations" };
            }
        }
    };

    deleteFolder = (folderName) => {
        if (fs.existsSync(folderName)) {
            try {
                fs.readdirSync(folderName).map((file) => fs.unlinkSync(`${folderName}/${file}`));
                fs.rmdirSync(folderName);

                return { error: "" };
            } catch (err) {
                return { error: "Something went wrong with the folder delete" };
            }
        } else {
            return { error: "The folder doesn't exist" };
        }
    };

    deleteFile = (fileName) => {
        if (fs.existsSync(fileName)) {
            try {
                fs.unlinkSync(fileName);

                return { error: "" };
            } catch (err) {
                return { error: "Something went wrong with the file delete" };
            }
        } else {
            return { error: "The file doesn't exist" };
        }
    };

    moveEntity = (oldEntityName, newEntityName) => {
        if (fs.existsSync(oldEntityName)) {
            try {
                fs.renameSync(oldEntityName, newEntityName);
                return { error: "" };
            } catch (err) {
                return { error: "Something went wrong" };
            }
        } else {
            return { error: "The file doesn't exist" };
        }
    };

    useCommand = (commandName) => {
        try {
            const commandResult = cp.execSync(commandName).toString("utf-8");
            return { commandResult: commandResult, error: "" };
        } catch (err) {
            return { commandResult: "", error: "The command went wrong" };
        }
    };
}

module.exports = new FileManager();
