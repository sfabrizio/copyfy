module.exports = {
    getFilesToCopy,
    ensureDirectoryExistenceSync
};

const fs = require('fs');
const path = require('path');

function getFilesToCopy(dir, filelist) {
    const files = fs.readdirSync(dir);

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

function ensureDirectoryExistenceSync(filePath) {
    const dirname = path.dirname(filePath);
    const root = path.dirname(dirname);

    if (dirname !== root) {
        ensureDirectoryExistenceSync(dirname);
    }
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname);
    }
}