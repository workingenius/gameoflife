var indexModule = require('index');

var ground = {
  rowCount: 60,
  colCount: 60,
  sideLength: 10,

  indexToPosition: function(index) {
    var r = indexModule.indexRow(index),
      c = indexModule.indexCol(index);
    return [
      r * ground.sideLength,
      c * ground.sideLength
    ];
  },

  positionToIndex: function(x, y) {
    return indexModule.createIndex(
      Math.floor(x / ground.sideLength),
      Math.floor(y / ground.sideLength));
  },

  pInGround: function(index) {
    var row, col;
    [row, col] = [
      indexModule.indexRow(index), 
      indexModule.indexCol(index)
    ];
    if (row < 0) return false;
    if (col < 0) return false;
    if (row >= ground.rowCount) return false;
    if (col >= ground.colCount) return false;
    return true;
  },
};

module.exports = ground;
