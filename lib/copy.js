var Copy = (function () {
    const fs = require('fs');
    const path = require('path');
    const getFilesToCopy = require('./utils').getFilesToCopy;
    const ensureDirectoryExistence = require('./utils').ensureDirectoryExistence;

    function Copy(config) {
        this.config = config || null;
    }

    Copy.prototype.start = function (config) {
        console.log('Copying..'.warn);
        console.log(config +''.warn);
        if (config) {
            this.config = config;
        }
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
    };

    Copy.prototype.copy = function (source, target) {
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
    };
    return Copy;
})();


module.exports = Copy ;