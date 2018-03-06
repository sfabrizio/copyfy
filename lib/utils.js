module.exports = {
    getFilesToCopy,
    ensureDirectoryExistence
};

const fs = require('fs');
const path = require('path');

function getFilesToCopy(dir, filelist) {
    var files = fs.readdirSync(dir);

    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = getFilesToCopy(path.join(dir, file), filelist);
        } else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
}

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    const root = path.dirname(dirname);
    const fullPath = process.cwd() + dirname;

    if (dirname !== root) {
        ensureDirectoryExistence(dirname);
    }
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
    }
}