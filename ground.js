(function() {
  var indexModule = glob.indexModule;
  var sideLength = 20;

  glob.ground = {
    rowCount: 20,
    colCount: 20,
    sideLength: sideLength,

    indexToPosition: function(index) {
      var r = indexModule.indexRow(index),
        c = indexModule.indexCol(index);
      return [
        r * sideLength,
        c * sideLength
      ];
    },

    positionToIndex: function(x, y) {
      return indexModule.createIndex(
        Math.floor(x / sideLength),
        Math.floor(y / sideLength));
    },
  };
})();
