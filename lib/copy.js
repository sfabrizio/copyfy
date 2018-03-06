const fs = require('fs');
const path = require('path');
const getFilesToCopy = require('./utils').getFilesToCopy;
const ensureDirectoryExistence = require('./utils').ensureDirectoryExistence;



class Copy {
    constructor(config) {
        this.config = config;
    }

    start() {
        console.log('Copying..'.warn);
        this.config.copy.forEach(folder => {
            getFilesToCopy(folder.source)
                .then(files => {
                    files.forEach(file => {
                        const source = path.join(folder.source, file);
                        const target = path.join(folder.target, file);

                        ensureDirectoryExistence(target);
                        this.copy(source, target);
                    });
                });
        });
    }

    copy(source, target) {
        const readStream = fs.createReadStream(source);

        readStream.on('error', error => {
            afterRead(error);
        });

        const writeStream = fs.createWriteStream(target);

        writeStream.on('error', error => {
            afterCopy(error);
        });

        writeStream.on('close', close => {
            afterCopy();
        });

        readStream.pipe(writeStream);

        function afterCopy(err) {
            if (err) {
                console.log(target, ' Fail:'.error);
                console.log(err.error);
                return;
            }
            console.log(target, ' Done.'.info);
        }

        function afterRead(err) {
            if (err) {
                console.log(err.error);
                return;
            }
        }
    }
}

module.exports = Copy;