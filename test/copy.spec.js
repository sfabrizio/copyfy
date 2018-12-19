const Copy = require('../lib/copy.js');
let copy;
let mockConfig = {
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
        describe('start method', () => {
            describe('should fail', () => {
                beforeEach(() => {
                    mockConfig = {
                        verbose: false,
                        showErrors: false,
                        copy: [{
                            source: './temp23213213213213',
                            target: './temp2'
                        }]
                    };
                    copy = new Copy(mockConfig);
                });
                it('should trow error when the source does not exist', () => {
                    expect(() => copy.start()).toThrowError('');
                });
                it('should trow error when the source does not exist with the error', () => {
                    expect(() => copy.start()).toThrow(`Source path does not exist: ${mockConfig.copy[0].source}`);
                });
            });
        });
    });
});