"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimFile = exports.readFile = exports.writeFile = void 0;
const fs_1 = require("fs");
const writeFile = async (filePath, content) => {
    (0, fs_1.open)(filePath, 'utf-8', (err, fd) => {
        if (err)
            throw err;
        try {
            (0, fs_1.appendFile)(fd, content, 'utf-8', err => {
                if (err)
                    throw err;
                (0, fs_1.close)(fd);
            });
        }
        catch (err) {
            console.log(err.message);
        }
    });
};
exports.writeFile = writeFile;
const readFile = async () => { };
exports.readFile = readFile;
const trimFile = async () => { };
exports.trimFile = trimFile;
