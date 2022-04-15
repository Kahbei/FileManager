const fs = require("fs");
const util = require("util");
const cp = require("child_process");

class FileManager {
    constructor() {}

    /**
     * Liste les fichiers et dossiers contenant dans dossier spécifié dans path
     * @param {string} path Si non remplis, alors celui-ci va afficher le contenu du dossier FileManager
     * @returns
     */
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

    /**
     * Créer un dossier suivant le nom newFolderName donné
     * @param {string} newFolderName Le chemin doit être spécifié dans le nom, sinon le dossier va être créer dans FileManager
     * @returns
     */
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

    /**
     * Création d'un fichier suivant son nom et son contenu
     * @param {string} fileName Le chemin doit être spécifié dans le nom, sinon le dossier va être créer dans FileManager
     * @param {string} fileContent Peut ne pas être remplis.
     * @returns
     */
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

    /**
     * Suppression d'un dossier
     * @param {string} folderName
     * @returns
     */
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

    /**
     * Suppression d'un fichier
     * @param {string} fileName
     * @returns
     */
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

    /**
     * Renommage ou déplacement d'un fichier ou dossier
     * @param {string} oldEntityName
     * @param {string} newEntityName
     * @returns
     */
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

    /**
     * Exécution d'une commande donné selon commandName
     * @param {string} commandName
     * @returns
     */
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
