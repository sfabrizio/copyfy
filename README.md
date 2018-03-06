# copyfy

Copy files/folders recursively on nodejs using a json as config.

## Install
```
npm install --save-dev copyfy
```


## How to use it:

```javascript
const copyfy = require('copyfy');

const config = {
    copy: [{
            source: "path1",
            target: "path2",
        },
        {
            source: "path/file.txt",
            target: "path/new-file.txt",
        }
        ...
    ]
};

copyfy(cofing).start();

```

<p align="center">
  <a href="https://github.com/labs-js/turbo-git/blob/develop/README.md"><img src="https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg" alt="Turbo Commit: On"/></a>
</p>
