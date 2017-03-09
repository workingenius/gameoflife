(function() {
  var lifeM = require('life');
  var groundM = require('ground');

  groundM.rowCount = 400;
  groundM.colCount = 400;

  var array = require('main').array;

  function avgRuntime(syncedFunc, times=100) {
    /* @param syncedFunc, must be syncronized */
    var i;
    var startTime, endTime, timeConsuming;
    startTime = Date.now();
    for (i=0; i<times; i++) {
      syncedFunc();
    }
    endTime = Date.now();
    timeConsuming = endTime - startTime;
    return timeConsuming / times;
  }

  function benchmarkPropagate() {
    lifeM.propagate(array, lifeM.calcChangings(array));
  }

  console.log(
    avgRuntime(benchmarkPropagate, 10)
  );
})();
