var I = require('immutable');

var Ship = function (data) {
  var DDV = 0.1; // m/s^21
  var DDW = 0.1; // 1/s^2
  var v = data.get('v');
  var dv = data.get('dv');
  var w = data.get('w');
  var dw = data.get('dw');

  var update = function (t, dt, options) {
    var ddv1 = options.left ? DDV : 0;
    var ddv2 = options.right ? DDV : 0;
    var newDv = dv
      .set('i', dv.get('i') + ddv1 + ddv2)
      .set('j', dv.get('j') + ddv1 + ddv2);
    var newV = v
      .set('i', v.get('i') + dv.get('i'))
      .set('j', v.get('j') + dv.get('j'));

    var ddw1 = options.left ? -DDW : 0;
    var ddw2 = options.right ? DDW : 0;

    var newDw = dw + ddw1 + ddw2;
    var newW = w + dw * dt;

    return new Ship(I.Map({
      v: newV,
      dv: newDv,
      w: newW,
      dw: newDw
    }));
  }

  return {
    update: update,
    data: data
  }
}

module.exports = Ship;
