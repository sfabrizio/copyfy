const Copy = (function () {
    const fs = require('fs');
    const path = require('path');
    const {
        getFilesToCopy,
        ensureDirectoryExistenceSync
    } = require('./utils');

    function Copy(config) {
        this.config = config || false;
        this.verbose = this.config && this.config.verbose;
        this.showErrors = this.config && this.config.showErrors;
        this.count = {
            success: 0,
            fail: 0
        };
    }

    Copy.prototype.start = function (config) {
        console.log('Copying'.warn);

        if (config) {
            this.config = config;
        }

        return Promise.all(this.config.copy.map(copyConfig => {
            const files = getFilesToCopy(copyConfig.source);

            if (!files) {
                console.log('Can not read files on:'.error);
                console.log(copyConfig.source.error);
            }

            const copyRequests = files.map((file) => {
                return new Promise((resolve) => {
                    const source = path.join(file);
                    let target = path.join(file.replace(copyConfig.source, copyConfig.target));

                    if (copyConfig.renameTargetFiles) {
                        target = target.replace(copyConfig.renameTargetFiles.from,copyConfig.renameTargetFiles.to);
                    }

                    ensureDirectoryExistenceSync(target.replace(process.cwd(), ''));

                    this.copy(source, target, resolve);
                }).catch((err) => {
                    console.log('Error:'.error, err);
                });
            });

            return Promise.all(copyRequests)
                .then(this.printSummary.bind(this));
        }));
    };

    Copy.prototype.printSummary = function () {
        console.log('All Done: '.info);
        console.log('---------------------------------'.info);
        if (this.count.fail > 0) {
            console.log(`${this.count.fail}    errors.`.error);
        } else {
            console.log(`errors:       ${this.count.fail}`);
        }
        console.log(`files copied: ${this.count.success}`);
        console.log('---------------------------------'.info);
    };

    Copy.prototype.copy = function (source, target, resolve) {
        const _this = this;
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
                _this.count.error++;
                if (_this.showErrors) {
                    console.log(target, ' Fail:'.error);
                    console.log(err.error);
                }
                return;
            }

            _this.count.success++;

            if (_this.verbose) {
                console.log(target, ' Done.'.verbose);
            }
            resolve('done');
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