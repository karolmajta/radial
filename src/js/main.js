var radial = require('./radial');

var runGame = function (window, frameHandler, previousTime) {
  var currentTime = (new Date()).getTime() / 1000;
  previousTime = previousTime || currentTime;
  var dt = currentTime - previousTime;
  frameHandler(currentTime, dt);
  window.requestAnimationFrame(function () {
    runGame(window, frameHandler, currentTime)
  });
};

void function () {
  'use strict';

  var screenRect = window.document.body.getBoundingClientRect();
  var world = new radial.World();
  var stage = new radial.Stage(world, screenRect.width, screenRect.height,{backgroundColor : 0x000000});
  var engine = new radial.Engine(world, stage);

  document.body.appendChild(stage.view());

  runGame(window, engine.handleFrame);
}(window);
