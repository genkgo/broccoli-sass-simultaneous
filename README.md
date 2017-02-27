# broccoli-sass-simultaneous

With [broccoli-sass-source-maps](https://github.com/aexmachina/broccoli-sass-source-maps) you can only transpile one scss file at (by using multiple trees) at
a time. And because every operation runs afters the other has finished, this is can be very slow. This package
transpiles the files simultaneously and therefore has significant performance improvements.

Because [broccoli-sass-source-maps](https://github.com/aexmachina/broccoli-sass-source-maps) is used to compile the
files you can use the same set of options as defined there. 

## Usage

```js
var compileSass = require('broccoli-sass-source-maps');

var outputTree = compileSass(inputTrees, inputToOutputMap, options);
```

* **`inputTrees`**: An array of trees that act as the include paths for
  libsass. If you have a single tree, pass `[tree]`.

* **`inputToOutputMap`**: A hash with the inputFile as key and the outputFile as value. 

* **`options`**: A hash of options, see [broccoli-sass-source-maps](https://github.com/aexmachina/broccoli-sass-source-maps/blob/master/README.md#usage).


## Example

```js
const compile = require('broccoli-sass-simultaneous');

let tree = compile(
  ['include_dir1', 'include_dir2'],
  {
     'scss/file1.scss': 'css/file1.css'
  }
);
```