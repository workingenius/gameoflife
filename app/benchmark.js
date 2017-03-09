(function() {
  var lifeM = require('life');

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

  (function initEnv() {
    var ground = glob.ground;
    ground.rowCount = 40;
    ground.rowCount = 40;
    ground.sideLength = 10;
    glob.onOff.pause();
  })();

  function benchmarkPropagate() {
    lifeM.propagate(lifeM.calcChangings());
  }

  console.log(
    avgRuntime(benchmarkPropagate, 10)
  );
})();
