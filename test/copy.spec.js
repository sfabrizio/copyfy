const Copy = require('../lib/copy.js');
let copy;
const mockConfig = {
    verbose: false,
    showErrors: false,
    copy: [{
        source: './temp',
        target: './temp2'
    }]
};

describe('copy', function () {
    it('should return a function', function () {
        expect(typeof Copy).toBe('function');
    });
    describe('Definitions', () => {
        beforeEach(() => {
            copy = new Copy();
        });
        it('should have defined start', () => {
            expect(copy.start).toBeDefined();
        });
        it('should have defined printSummary', () => {
            expect(copy.printSummary).toBeDefined();
        });
        it('should have defined copy', () => {
            expect(copy.copy).toBeDefined();
        });
    });
    describe('Behaviour', () => {
        beforeEach(() => {
            copy = new Copy(mockConfig);
        });
        it('should copy', () => {
            copy.start();
        });
    });
});