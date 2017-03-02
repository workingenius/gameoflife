(function() {
  var lastIndex = null;

  glob.canvas.addEventListener('mousemove', function(evt) {
    var {layerX: x, layerY: y} = evt;
    var index = glob.ground.positionToIndex(x, y);
    if (glob.indexModule.indexEq(index, lastIndex)) return;
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
    glob.view.drawChangings(glob.ctx, glob.array, changings);
    lastIndex = index;
  }, false);
})();
