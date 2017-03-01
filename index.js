(function() {
  /*
   * Index is how we find a grid.
   * It can be seen as a id of a grid. So equality check method should exist.
   *
   * We also check if two grid is adjacent to each other using index -- surrounder infos
   *
   * As grids are created as a whole, and we assume that no further creation,
   * deletion and modification, so only createIndices function is exposed.
   */

  function createIndex(...params) {
    return params;
  }

  function indexEq(idx1, idx2) {
    if (idx1.length !== idx2.length) return false;
    var i, len=idx1.length;
    for (i=0; i<len; i++) {
      if (idx1[i] !== idx2[i]) return false;
    }
    return true;
  }

  // 2D index array, constructed by row and column

  function createIndex2D(row, col) {
    return createIndex(row, col);
  }

  function index2DRow(index) {
    return index[0];
  }

  function index2DCol(index) {
    return index[1];
  }

  function createSqureIndices(rows, cols) {
    var indices = [];
    var i = 0, j = 0;
    for (i=0; i<rows; i++) {
      for (j=0; j<cols; j++) {
        indices.push(
          createIndex(i, j)
        );
      }
    }
    return indices;
  }

  function surroundings(idx) {
    var r = index2DRow(idx),
      c = index2DCol(idx);
    return [
      createIndex2D( r - 1, c - 1 ),
      createIndex2D( r - 1, c ),
      createIndex2D( r - 1, c + 1 ),
      createIndex2D( r, c - 1 ),
      createIndex2D( r, c + 1 ),
      createIndex2D( r + 1, c - 1 ),
      createIndex2D( r + 1, c ),
      createIndex2D( r + 1, c + 1 ),
    ];
  }

  glob.indexModule = {
    indexEq: indexEq,
    createIndices: createSqureIndices,
    surroundings: surroundings,
    
    indexRow: index2DRow,
    indexCol: index2DCol,
  };
})();
