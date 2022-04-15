const express = require("express");
const fm = require("./fileManager");
const app = express();

const PORT = 3000;

let errorMessage = "";
let elementsInDir = [];
let commandReturn = "";

// Configuration d'express
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Index
app.get("/", (req, res) =>
    res.render("index", {
        listElements: elementsInDir,
        errorMessage: errorMessage,
        commandReturn: commandReturn,
    })
);

//// ROUTES
// Lister le contenu du dossier
app.post("/listElements", async (req, res, next) => {
    try {
        const listElement = await fm.listElement(req.body.areaToList);
        errorMessage = listElement.error;
        elementsInDir = listElement.result;
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

// Création d'un fichier
app.post("/newFile", async (req, res, next) => {
    try {
        const path = req.body.pathToUse ? req.body.pathToUse : ".";
        const createFile = await fm.newFile(`${path}/${req.body.newFile}`, req.body.fileContent);
        const listElement = await fm.listElement(path);

        elementsInDir = listElement.result;
        errorMessage = createFile.error;

        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

// Création d'un dossier
app.post("/newFolder", async (req, res, next) => {
    try {
        const path = req.body.pathToUse ? req.body.pathToUse : ".";
        const createFolder = await fm.newFolder(`${path}/${req.body.newFolder}`);
        const listElement = await fm.listElement(path);

        elementsInDir = listElement.result;
        errorMessage = createFolder.error;

        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

// Suppression d'un dossier
app.post("/deleteFolder", async (req, res, next) => {
    try {
        const path = req.body.pathToUse ? req.body.pathToUse : ".";
        const deleteFolder = await fm.deleteFolder(`${path}/${req.body.deleteFolder}`);
        const listElement = await fm.listElement(path);

        elementsInDir = listElement.result;
        errorMessage = deleteFolder.error;

        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

// Suppression d'un fichier
app.post("/deleteFile", async (req, res, next) => {
    try {
        const path = req.body.pathToUse ? req.body.pathToUse : ".";
        const deleteFile = await fm.deleteFile(`${path}/${req.body.deleteFile}`);
        const listElement = await fm.listElement(path);

        elementsInDir = listElement.result;
        errorMessage = deleteFile.error;

        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

// Renommage ou déplacement du dossier / fichier
app.post("/changeEntity", async (req, res, next) => {
    try {
        const oldPath = req.body.pathToUse1 ? req.body.pathToUse1 : ".";
        const newPath = req.body.pathToUse2 ? req.body.pathToUse2 : ".";
        const moveEntity = await fm.moveEntity(
            `${oldPath}/${req.body.oldEntityName}`,
            `${newPath}/${req.body.newEntityName}`
        );
        const listElement = await fm.listElement(newPath);

        elementsInDir = listElement.result;
        errorMessage = moveEntity.error;

        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

// Utilisation d'une commande
app.post("/useCommand", async (req, res, next) => {
    try {
        const commandResult = await fm.useCommand(req.body.commandName);
        commandReturn = commandResult.commandResult;
        errorMessage = commandResult.error;
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});
//// ----

// Ecoute du serveur
app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
