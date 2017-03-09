var indexModule = require('index');
var groundModule = require('ground');

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

function createArray(indices) {
  var array = {};
  indices.forEach(function(index) {
    array[indexModule.indexToStr(index)] = DEAD;
  });
  return array;
}

function getValue(array, index) {
  return array[indexModule.indexToStr(index)];
}

function setValue(array, index, value) {
  array[indexModule.indexToStr(index)] = value;
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
    func(indexModule.strToIndex(key), array[key])
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
      livings[indexModule.indexToStr(index)] = isAlive;
    }
  });

  var surrounders = {};
  traverse(livings, function(index, isAlive) {
    var surs = indexModule.surroundings(index);
    surs.forEach(function(surIndex) {
      if (!groundModule.pInGround(surIndex)) return;
      var idxStr = indexModule.indexToStr(surIndex);
      if (surrounders[idxStr] == null) {
        surrounders[idxStr] = 0;
      }
      surrounders[idxStr]++;
    });
  });

  traverse(livings, function(index, isAlive) {
    var idxStr = indexModule.indexToStr(index);
    if (pdistinct(surrounders[idxStr])) {
      changings.push({
        action: 'die',
        index: index,
      });
    }
  });

  traverse(surrounders, function(index, amount) {
    var idxStr = indexModule.indexToStr(index);
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

module.exports = {
  createBeings: createArray,
  traverse: traverse,
  getState: getValue,
  setState: setValue,
  flip: flip,

  ALIVED: ALIVED,
  DEAD: DEAD,

  // export only for benchmark
  calcChangings: function(...params) {
    return calcChangings(glob.array);
  },
  propagate: function(...params) {
    return propagate(glob.array, ...params);
  },
};
