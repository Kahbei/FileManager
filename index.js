const express = require("express");
const fm = require("./fileManager");
const app = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => res.render("index", { listElements: [] }));

app.post("/listElements", async (req, res, next) => {
    try {
        console.log(req.body);
        // await cp.exec(`dir /b`, (err, data) => {
        //     if (err) {
        //         throw err;
        //     }

        //     const arrFilesNFolder = data.split("\r\n").slice(0, -1);
        //     // arrFilesNFolder.splice(-1);

        //     res.render("index", { listElements: arrFilesNFolder });
        // });
        const test = await fm.listElement(req.body.areaToList);
        console.log(test);
        res.render("index", { listElements: test });
    } catch (error) {
        next(error);
    }
});

app.post("/newFileOrFolder", async (req, res, next) => {
    //
});

app.post("");

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
