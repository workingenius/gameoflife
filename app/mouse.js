var indexModule = require('index');
var groundModule = require('ground');
var lifeModule = require('life');
var viewModule = require('view');


var lastIndex = null;


function getMousePoint(mouseEvent) {
  var {layerX: x, layerY: y} = mouseEvent;
  return [x, y];
}

function getMouseIndex(mouseEvent) {
  return groundModule.positionToIndex(...getMousePoint(mouseEvent));
}

document.addEventListener('DOMContentLoaded', function(event) {
  viewModule.canvas.addEventListener('mousemove', function(evt) {
    var array = require('main').array;
    var index = getMouseIndex(evt);
    if (indexModule.indexEq(index, lastIndex)) return;
    var changings = [{
      action: 'focus',
      index: index,
    }];
    if (lastIndex) {
      changings.unshift({
        action: 'unfocus',
        index: lastIndex,
      });
    }
    viewModule.drawChangings(array, changings);
    lastIndex = index;
  }, false);

  viewModule.canvas.addEventListener('click', function(evt) {
    var array = require('main').array;
    var index = getMouseIndex(evt);
    lifeModule.flip(array, index);
    viewModule.syncGrid(array, index);
  });
});
