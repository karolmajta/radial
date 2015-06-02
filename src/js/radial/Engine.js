var Engine = function (world, stage) {

  var handleFrame = function (t, dt) {
    var previousWorld = world;
    world = previousWorld.update(t, dt);
    stage.update(previousWorld.toUnitCoordinates(), world.toUnitCoordinates());
    stage.render();
  }

  return {
    handleFrame: handleFrame
  }
};


module.exports = Engine;
