(function() { 
    var indexModule = glob.indexModule;

    /* */

    var ALIVED = 1,
      DEAD = 0;

    function psurvive(aliveSurrounderNumber) {
      var n = aliveSurrounderNumber;
      return n == 3;
    }

    function premain(aliveSurrounderNumber) {
      var n = aliveSurrounderNumber;
      return n == 2;
      }

    function createArray(indices) {
      return indices.map(function(index) {
        return [index, DEAD];
      });
    }

    function getValue(array, index) {
      var retval;
      array.forEach(function(grid) {
        var idx, isAlive;
        [idx, isAlive] = grid;
        if (indexModule.indexEq(index, idx)) {
          retval = isAlive;
        }
      });
      retval = retval || DEAD;
      return retval;
    }

    function setValue(array, index, value) {
      array.forEach(function(grid) {
        var idx, isAlive;
        [idx, isAlive] = grid;
        if (indexModule.indexEq(index, idx)) {
          grid[1] = value;
        }
      });
    }

    function traverse(array, func) {
      return array.forEach(function(grid) {
        return func(...grid);
      });
    }

    /* */

    function delayed(func) {
      return function() {
        setTimeout(func, 0);
      };
    }

    /* */

    function calcChangings(array) {
      var changings = [];
      traverse(array, function(index, isAlive) {
        var indices = indexModule.surroundings(index);
        var aliveSurrounders = 0;
        indices.forEach(function(index) {
          aliveSurrounders += getValue(array, index);
        });
        if (psurvive(aliveSurrounders)) {
          if (!isAlive) {
            changings.push({
              action: 'live',
              index: index
            });
          }
        } else if (premain(aliveSurrounders)) {
          // do nothing
        } else { // dead
          if (isAlive) {
            changings.push({
              action: 'die',
              index: index
            });
          }
        }
      });
      return changings;
    }

    function propagate(array, changings) {
      changings.forEach(function(chg) {
        var index = chg.index;
        if (chg.action === 'live') {
          setValue(array, index, ALIVED)
        } else if (chg.action === 'die') {
          setValue(array, index, DEAD)
        }
      });
    }

    /* */

    var position = glob.ground.indexToPosition;

    function drawArray(ctx, array) {
      traverse(array, function(index, isAlive) {
        var x, y, width, height;
        [x, y] = position(index);
        width = height = glob.ground.sideLength - 1;
        if (isAlive) {
          ctx.fillStyle = 'black';
        } else {
          ctx.fillStyle = 'rgb(200, 200, 200)';
        }
        ctx.fillRect(x, y, width, height);
      })
    }

    function drawChangings(ctx, array, changings) {
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
        }
      });
    }

    (function initCanvas() {
      glob.canvas = document.getElementById("canvas");
      glob.ctx = canvas.getContext("2d");
    })();

    function stepProc() {
      var changings = calcChangings(glob.array);
      propagate(glob.array, changings);
      drawChangings(glob.ctx, glob.array, changings);
    }

    (function initArray() {
      var array;

      glob.array = createArray(indexModule.createIndices(glob.ground.rowCount, glob.ground.colCount));
      array = glob.array;

      // initArray
      plane(array, [3, 3]);
      plane(array, [7, 3]);
      plane(array, [3, 7]);
      plane(array, [7, 7]);

      drawArray(glob.ctx, array);
    })();

    function plane(array, center) {
      setValue(array, up(center), ALIVED);
      setValue(array, right(center), ALIVED);
      setValue(array, downright(center), ALIVED);
      setValue(array, down(center), ALIVED);
      setValue(array, downleft(center), ALIVED);
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

    glob.onOff = glob.loop(stepProc);
    glob.onOff.start();

})();
