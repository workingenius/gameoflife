var lifeM = require('life');
var groundM = require('ground');

var canvas, ctx;

(function initCanvas() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
})();

var position = groundM.indexToPosition;

function drawArray(array) {
  lifeM.traverse(array, function(index, isAlive) {
    syncGrid(array, index, isAlive);
  })
}

function drawChangings(array, changings) {
  ctx.save();
  changings.forEach(function(chg) {
    var {index, action} = chg;
    var x, y, width, height;
    [x, y, width, height] = position(index);
    width = height = groundM.sideLength - 1;
    if (action === 'live') {
      ctx.fillStyle = 'black';
      ctx.fillRect(x, y, width, height);
    } else if (action === 'die') {
      ctx.fillStyle = 'rgb(200, 200, 200)';
      ctx.fillRect(x, y, width, height);
    } else if (action === 'focus') {
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'blue';
      ctx.strokeRect(x, y, width, height);
    } else if (action === 'unfocus') {
      ctx.clearRect(x - 1, y - 1, width + 2, height + 2);
      syncGrid(array, index);
    }
  });
  ctx.restore();
}

function syncGrid(array, index, isAlive) {
  if (isAlive == null) isAlive = lifeM.getState(array, index);
  var x, y, width, height;
  [x, y] = position(index);
  width = height = groundM.sideLength - 1;
  ctx.save();
  if (isAlive) {
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, width, height);
  } else if (isAlive === 0) {
    ctx.fillStyle = 'rgb(200, 200, 200)';
    ctx.fillRect(x, y, width, height);
  }
  ctx.restore();
}

module.exports = {
  drawArray: drawArray,
  drawChangings: drawChangings,
  syncGrid: function(...params) {
    return syncGrid(glob.array, ...params);
  },

  canvas: canvas,
};
