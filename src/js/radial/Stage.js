var PIXI = require('pixi.js');

var Stage = function (initialWorld, stageWidth, stageHeight, options) {
  var renderer = new PIXI.autoDetectRenderer(stageWidth, stageHeight, options);
  var representation = initialWorld;
  var root = new PIXI.Container();

  return {
    view: function () { return renderer.view; },
    update: function (previousWorld, currentWorld) {
      representation = currentWorld;
    },
    render: function () { renderer.render(root); }
  }
};

module.exports = Stage;
