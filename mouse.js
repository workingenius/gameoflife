(function() {
  glob.canvas.addEventListener('mousedown', function(evt) {
    var {layerX: x, layerY: y} = evt;
    console.log(evt);
    console.log(
      glob.ground.positionToIndex(x, y)
    );
  }, false);
})();
