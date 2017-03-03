(function() {
  var lifeM = glob.life;
  var indexM = glob.indexModule;

  /* */

  var position = glob.ground.indexToPosition;

  function drawArray(ctx, array) {
    lifeM.traverse(array, function(index, isAlive) {
      syncGrid(ctx, array, index, isAlive);
    })
  }

  function drawChangings(ctx, array, changings) {
    ctx.save();
    changings.forEach(function(chg) {
      var {index, action} = chg;
      var x, y, width, height;
      [x, y, width, height] = position(index);
      width = height = glob.ground.sideLength - 1;
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
        syncGrid(ctx, array, index);
      }
    });
    ctx.restore();
  }

  function syncGrid(ctx, array, index, isAlive) {
    if (isAlive == null) isAlive = lifeM.getState(array, index);
    var x, y, width, height;
    [x, y] = position(index);
    width = height = glob.ground.sideLength - 1;
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

  (function initCanvas() {
    glob.canvas = document.getElementById("canvas");
    glob.ctx = canvas.getContext("2d");
  })();

  function stepProc() {
    var changings = lifeM.calcChangings();
    lifeM.propagate(changings);
    drawChangings(glob.ctx, glob.array, changings);
  }

  glob.onOff = glob.loop(stepProc);

  glob.view = {
    drawArray: drawArray,
    drawChangings: drawChangings,
    syncGrid: function(...params) {
      return syncGrid(glob.ctx, glob.array, ...params);
    }
  };

})();
