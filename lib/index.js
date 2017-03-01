var compiler = require('broccoli-sass-source-maps');
var Plugin = require('broccoli-plugin');

module.exports = SassSimultaneousCompiler;
SassSimultaneousCompiler.prototype = Object.create(Plugin.prototype);
SassSimultaneousCompiler.prototype.constructor = SassSimultaneousCompiler;

function SassSimultaneousCompiler (inputNodes, inputOutputMap, options) {
  if (!(this instanceof SassSimultaneousCompiler)) { return new SassSimultaneousCompiler(inputNodes, inputOutputMap, options); }
  if (!Array.isArray(inputNodes)) { throw new Error('Expected array for first argument - did you mean [tree] instead of tree?'); }

  Plugin.call(this, inputNodes, {
    annotation: options.annotation
  });

  this.inputOutputMap = inputOutputMap;
  this.options = options || {};
}

SassSimultaneousCompiler.prototype.build = function() {
  var plugin = this;
  var promises = [];

  Object.keys(this.inputOutputMap).forEach(function (inputFile) {
    var compilerInstance = compiler(
      plugin._inputNodes,
      inputFile,
      plugin.inputOutputMap[inputFile],
      plugin.options
    );

    compilerInstance.inputPaths = plugin.inputPaths;
    compilerInstance.outputPath = plugin.outputPath;
    compilerInstance.cachePath = plugin.cachePath;

    promises.push(compilerInstance.build());
  });

  return Promise.all(promises);
};