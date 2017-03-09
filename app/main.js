var lifeM = require('life');
var indexM = require('index');
var groundM = require('ground');
var viewM = require('view');
var loop = require('loop');


var array;


(function initArray() {
  array = lifeM.createBeings(indexM.createIndices(groundM.rowCount, groundM.colCount));

  // initArray
  plane(array, [3, 3]);
  plane(array, [7, 3]);
  plane(array, [3, 7]);
  plane(array, [7, 7]);

  viewM.drawArray(array);
})();

function stepProc() {
  var changings = lifeM.calcChangings(array);
  lifeM.propagate(array, changings);
  viewM.drawChangings(array, changings);
}

var onOff = loop(stepProc);


document.addEventListener('DOMContentLoaded', function(event) {
  var switchButton = document.getElementById('switch');
  switchButton.addEventListener('click', function(event) {
    onOff.shift();
    if (onOff.isOn()) {
      switchButton.innerText = 'pause';
    } else {
      switchButton.innerText = 'play';
    }
  });
});


module.exports = {
  array: array
};


// following codes should move elsewhere

function plane(array, center) {
  lifeM.setState(array, up(center), lifeM.ALIVED);
  lifeM.setState(array, right(center), lifeM.ALIVED);
  lifeM.setState(array, downright(center), lifeM.ALIVED);
  lifeM.setState(array, down(center), lifeM.ALIVED);
  lifeM.setState(array, downleft(center), lifeM.ALIVED);
}

function up(point) {
  return [point[0], point[1] - 1];
}

function down(point) {
  return [point[0], point[1] + 1];
}

function left(point) {
  return [point[0] - 1, point[1]];
}

function right(point) {
  return [point[0] + 1, point[1]];
}

function upleft(p) {
  return up(left(p));
}

function upright(p) {
  return up(right(p));
}

function downleft(p) {
  return down(left(p));
}

function downright(p) {
  return down(right(p));
}
