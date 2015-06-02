var World = function (initial) {
  var coords = initial;
  return {
    update: function (t, dt) { return new World([t, dt]); },
    toUnitCoordinates: function () { return coords; }
  };
};

module.exports = World;
