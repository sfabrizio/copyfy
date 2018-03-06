#!/usr/bin/env node
if ('function' !== typeof Map) throw new Error("ES6 is required; add --harmony");
process.stdout.isTTY = true;

import { main } from './lib/main.mjs';
import colors from 'colors';

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

main();