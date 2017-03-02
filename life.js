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

    function pdistinct(aliveSurrounderNumber) {
      return !aliveSurrounderNumber
        || aliveSurrounderNumber > 3
        || aliveSurrounderNumber < 2;
    }

    function _indexStr(index) {
      return index.toString();
    }

    function _strIndex(str) {
      var retval = str.split(',').map(s => parseInt(s));
      return retval;
    }

    function createArray(indices) {
      var array = {};
      indices.forEach(function(index) {
        array[_indexStr(index)] = DEAD;
      });
      return array;
    }

    function getValue(array, index) {
      return array[_indexStr(index)];
    }

    function setValue(array, index, value) {
      array[_indexStr(index)] = value;
    }

    function flip(array, index) {
      var isAlive = getValue(array, index);
      if (isAlive === ALIVED) {
        setValue(array, index, DEAD);
      } else if (isAlive === DEAD) {
        setValue(array, index, ALIVED);
      }
    }

    function traverse(array, func) {
      for (key in array) {
        func(_strIndex(key), array[key])
      }
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

      var livings = {};
      traverse(array, function(index, isAlive) {
        if (isAlive) {
          livings[_indexStr(index)] = isAlive;
        }
      });

      var surrounders = {};
      traverse(livings, function(index, isAlive) {
        var surs = indexModule.surroundings(index);
        surs.forEach(function(surIndex) {
          var idxStr = _indexStr(surIndex);
          if (surrounders[idxStr] == null) {
            surrounders[idxStr] = 0;
          }
          surrounders[idxStr]++;
        });
      });

      traverse(livings, function(index, isAlive) {
        var idxStr = _indexStr(index);
        if (pdistinct(surrounders[idxStr])) {
          changings.push({
            action: 'die',
            index: index,
          });
        }
      });

      traverse(surrounders, function(index, amount) {
        var idxStr = _indexStr(index);
        if (psurvive(amount) && livings[idxStr] == null) {
          changings.push({
            action: 'live',
            index: index,
          });
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
      if (isAlive == null) isAlive = getValue(array, index);
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

    glob.life = {
      flip: function(...params) {
        return flip(glob.array, ...params);
      },
      calcChangings: function(...params) {
        return calcChangings(glob.array);
      },
      propagate: function(...params) {
        return propagate(glob.array, ...params);
      },
    };

    glob.view = {
      drawChangings: drawChangings,
      syncGrid: function(...params) {
        return syncGrid(glob.ctx, glob.array, ...params);
      }
    };

})();
