const indexFile = require('../index.js');

describe('index', function() {
    it('should return a function', function() {
        expect(typeof indexFile).toBe('function');
    });
});
