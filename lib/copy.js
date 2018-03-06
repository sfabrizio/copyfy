var Copy = (function () {
    const fs = require('fs');
    const path = require('path');
    const {getFilesToCopy, ensureDirectoryExistence} = require('./utils');

    function Copy(config) {
        this.config = config || null;
    }

    Copy.prototype.start = function (config) {
        console.log('Copying..'.warn);
        if (config) {
            this.config = config;
        }
        this.config.copy.forEach(folder => {
            const files = getFilesToCopy(folder.source);

            if (!files) {
                console.log('Can not read files on:'.error);
                console.log(folder.source.error);
            }
            files.forEach(file => {
                const source = path.join(file);
                const target = path.join(file.replace(folder.source, folder.target));

                ensureDirectoryExistence(target.replace(process.cwd(), ''));
                this.copy(source, target);
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
                return;
            }
        }
    };
    return Copy;
})();


module.exports = Copy;