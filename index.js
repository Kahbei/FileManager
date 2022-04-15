const express = require("express");
const fm = require("./fileManager");
const app = express();

const PORT = 3000;

let errorMessage = "";
let elementsInDir = [];
let commandReturn = "";

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
    res.render("index", {
        listElements: elementsInDir,
        errorMessage: errorMessage,
        commandReturn: commandReturn,
    })
);

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

app.post("/newFile", async (req, res, next) => {
    try {
        const createFile = await fm.newFile(req.body.newFile, req.body.fileContent);
        errorMessage = createFile.error;
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

app.post("/newFolder", async (req, res, next) => {
    try {
        const createFolder = await fm.newFolder(req.body.newFolder);
        const listElement = await fm.listElement(req.body.areaToList);
        errorMessage = createFolder.error;
        elementsInDir = listElement.result;
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

app.post("/deleteFolder", async (req, res, next) => {
    try {
        const deleteFolder = await fm.deleteFolder(req.body.deleteFolder);
        errorMessage = deleteFolder.error;
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

app.post("/deleteFile", async (req, res, next) => {
    try {
        const deleteFile = await fm.deleteFile(req.body.deleteFile);
        errorMessage = deleteFile.error;
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

app.post("/changeEntity", async (req, res, next) => {
    try {
        const moveEntity = await fm.moveEntity(req.body.oldEntityName, req.body.newEntityName);
        errorMessage = moveEntity.error;
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

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

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
