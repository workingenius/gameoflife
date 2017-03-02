(function() {
  var indexModule = glob.indexModule;

  var ground = {
    rowCount: 40,
    colCount: 40,
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
  };

  glob.ground = ground;
})();
