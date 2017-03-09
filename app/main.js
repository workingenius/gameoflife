(function() {
  var lifeM = glob.life;
  var indexM = require('index');

  (function initArray() {
    var array;

    glob.array = lifeM.createBeings(indexM.createIndices(glob.ground.rowCount, glob.ground.colCount));
    array = glob.array;

    // initArray
    plane(array, [3, 3]);
    plane(array, [7, 3]);
    plane(array, [3, 7]);
    plane(array, [7, 7]);

    glob.view.drawArray(array);
  })();


  // following codes should move elsewhere
  
  function plane(array, center) {
    lifeM.setState(array, up(center), lifeM.ALIVED);
    lifeM.setState(array, right(center), lifeM.ALIVED);
    lifeM.setState(array, downright(center), lifeM.ALIVED);
    lifeM.setState(array, down(center), lifeM.ALIVED);
    lifeM.setState(array, downleft(center), lifeM.ALIVED);
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

})();
