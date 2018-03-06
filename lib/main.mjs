import Copy from './copy.mjs';

export function main(config) {
    if (config) {
        return new Copy(config);
    }
    return Copy;
}