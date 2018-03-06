const Copy = require('./copy.js');

module.exports = function (config) {
    if (config) {
        return new Copy(config);
    }
    return Copy;
};