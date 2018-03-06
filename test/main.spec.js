var indexFile = require('../lib/main');

describe('main', function() {
    it('should return a function', function() {
        expect(typeof indexFile).toBe('function');
    });
});
