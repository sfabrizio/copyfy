module.exports = {
    getFilesToCopy,
    ensureDirectoryExistence
};

const fs = require('fs');
const path = require('path');

function getFilesToCopy(folder) {
    console.log('getFilesToCopy',folder);
    return new Promise((resolve, reject) => {
        fs.readdir(folder, (err, files) => {
            if (err) {
                reject(err);
            }
            resolve(files);
        });
    });
}

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);

    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}