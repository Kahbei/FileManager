const express = require("express");
const fm = require("./fileManager");
const app = express();

const PORT = 3000;

let errorMessage = "";
let elementsInDir = [];

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
    res.render("index", { listElements: elementsInDir, errorMessage: errorMessage })
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
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

app.post("/newFolder", async (req, res, next) => {
    try {
        const createFolder = await fm.newFolder(req.body.newFolder);
        const listElement = await fm.listElement(req.body.areaToList);
        errorMessage = listElement.error;
        elementsInDir = listElement.result;
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

app.post("");

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
