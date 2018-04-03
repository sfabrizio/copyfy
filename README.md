[![Build Status](https://travis-ci.org/sfabrizio/copyfy.svg?)](https://travis-ci.org/sfabrizio/copyfy)
[![codecov](https://codecov.io/gh/sfabrizio/copyfy/branch/master/graph/badge.svg)](https://codecov.io/gh/sfabrizio/copyfy)
[![npm](https://img.shields.io/npm/v/copyfy.svg?style=flat)](https://www.npmjs.com/package/copyfy)
[![bitHound](https://www.bithound.io/github/sfabrizio/copyfy/badges/score.svg)](https://www.bithound.io/github/sfabrizio/copyfy)
[![Code Climate](https://codeclimate.com/github/sfabrizio/copyfy/badges/gpa.svg)](https://codeclimate.com/github/sfabrizio/copyfy)

# copyfy

Copy folders & files recursively on nodejs using a json as config.

## Install
```
npm install --save-dev copyfy
```


## How to use it:

```javascript
const Copyfy = require('copyfy');
const config = {
    verbose: false,
    showErrors: false,
    copy: [{
            source: "path1",
            target: "path2",
        },
        {
            source: "path1/file1.txt",
            target: "path1/anotherPath/NewFile.txt",
        },
        {
            source: "path2",
            target: "path3",
            renameTargetFiles: {
                from: new RegExp('fileName', 'g'),
                to: 'newFileName'
            }
        }
    ]
};
const copy = new Copyfy(config);

copy().start().then(
    console.log('Done');
);

```

<p align="center">
  <a href="https://github.com/labs-js/turbo-git/blob/develop/README.md"><img src="https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg" alt="Turbo Commit: On"/></a>
</p>
