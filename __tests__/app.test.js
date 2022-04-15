const fm = require("../fileManager");

const pathTest = "./__tests__/dossierPourTest";
const fileName = "theTest.html";
const newFileName = "test.html";
const folderName = "thetest";

describe("List files & folder", () => {
    const arrEntity = fm.listElement();
    const arrEntityWithPath = fm.listElement("./views");
    const arrEntityWithError = fm.listElement("./fgsfds");

    it("If nothing specified, result should not be empty", () => {
        expect(arrEntity.result.length).toBeGreaterThan(0);
    });

    it("If nothing specified, error should be empty", () => {
        expect(arrEntity.error.length).toBe(0);
    });

    it("If path specified, result should not be empty", () => {
        expect(arrEntityWithPath.result.length).toBeGreaterThan(0);
    });

    it("If path specified, error should be empty", () => {
        expect(arrEntityWithPath.error.length).toBe(0);
    });

    it("If path wrong, result should not be empty", () => {
        expect(arrEntityWithError.error.length).toBeGreaterThan(0);
    });

    it("If path wrong, error should be empty", () => {
        expect(arrEntityWithError.result.length).toBe(0);
    });
});

describe("File creation", () => {
    ///////// FILE VARIABLE
    const fileCreatedSuccess = fm.newFile(`${pathTest}/${fileName}`, "");
    const fileAlreadyExist = fm.newFile(`${pathTest}/${fileName}`, "");
    const fileWrongPath = fm.newFile(`${pathTest}/fdsddf/no.html`, "");

    ///////// LIST
    const listResult = fm.listElement(pathTest).result;

    ///////// FILE
    it("It should found the file created", () => {
        expect(listResult.includes(fileName)).toBe(true);
    });

    it("It should return a message error because the file already exist", () => {
        expect(fileAlreadyExist.error.includes("The file already exist")).toBe(true);
    });

    it("It should return a message error because the path is wrong", () => {
        expect(fileWrongPath.error.includes("Something went wrong with the file creations")).toBe(
            true
        );
    });
});

describe("Folder creation", () => {
    ///////// FOLDER VARIABLE
    const folderCreatedSuccess = fm.newFolder(`${pathTest}/${folderName}`);
    const folderAlreadyExist = fm.newFolder(pathTest);
    const folderWrongPath = fm.newFolder(`${pathTest}/fdsddf/no`);

    ///////// LIST
    const listResult = fm.listElement(pathTest).result;

    ///////// FOLDER
    it("It should found the folder created", () => {
        expect(listResult.includes(folderName)).toBe(true);
    });

    it("It should return a message error because the folder already exist", () => {
        expect(folderAlreadyExist.error.includes("The directory already exist")).toBe(true);
    });

    it("It should return a message error because the path is wrong", () => {
        expect(
            folderWrongPath.error.includes("Something went wrong with the folder creations")
        ).toBe(true);
    });
});

describe("Rename Entity", () => {
    const renameFileSuccess = fm.moveEntity(
        `${pathTest}/${fileName}`,
        `${pathTest}/${newFileName}`
    );
    const renameFileError = fm.moveEntity(
        `${pathTest}/${newFileName}`,
        `${pathTest}/fdsfsd/${newFileName}`
    );
    const renameFileWrongPath = fm.moveEntity(
        `${pathTest}/fdsfsdf.html`,
        `${pathTest}/${newFileName}`
    );
    const listResult = fm.listElement(pathTest).result;

    it("It should found the file renamed created", () => {
        expect(listResult.includes(newFileName)).toBe(true);
    });

    it("It should return a message error because the final path is wrong", () => {
        expect(renameFileError.error.includes("Something went wrong")).toBe(true);
    });

    it("It should return a message error because the file doesn't exist or wrong path", () => {
        expect(renameFileWrongPath.error.includes("The file doesn't exist")).toBe(true);
    });
});

describe("Delete File", () => {
    const fileDeletedSuccess = fm.deleteFile(`${pathTest}/${newFileName}`, "");
    const fileDontExist = fm.deleteFile(`${pathTest}/gfsdggvbcx.html`);
    const listResult = fm.listElement(pathTest).result;

    it("It should not found the file anymore", () => {
        expect(listResult.includes(newFileName)).toBe(false);
    });

    it("It should return a message error because the folder doesn't exist or wrong path", () => {
        expect(fileDontExist.error.includes("The file doesn't exist")).toBe(true);
    });
});

describe("Delete Folder", () => {
    const folderDeletedSuccess = fm.deleteFolder(`${pathTest}/${folderName}`);
    const folderDontExist = fm.deleteFolder(`${pathTest}/gfsdggvbcx`);
    const listResult = fm.listElement(pathTest).result;

    it("It should not found the folder anymore", () => {
        expect(listResult.includes(folderName)).toBe(false);
    });

    it("It should return a message error because the folder doesn't exist or wrong path", () => {
        expect(folderDontExist.error.includes("The folder doesn't exist")).toBe(true);
    });
});

describe("Typing a command", () => {
    const commandSuccess = fm.useCommand("dir");
    const commandFail = fm.useCommand("fdgsd");

    it("It should have command result", () => {
        expect(commandSuccess.commandResult.length).toBeGreaterThan(0);
    });

    it("It shouldn't have error message", () => {
        expect(commandSuccess.error.length).toBe(0);
    });

    it("It shouldn't have command result", () => {
        expect(commandFail.commandResult.length).toBe(0);
    });

    it("It should have display error message", () => {
        expect(commandFail.error.includes("The command went wrong")).toBe(true);
    });
});
