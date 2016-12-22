/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting



// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  /* RULES:
    1. takes an argument n, which represents the number of rows (and columns) on the chess board AND the number of rooks required in the solution
    2. returns a stringified matrix called "solution"
    3. returns ANY possible solution for 'find n rooks' problem
    4. 
  */
  
  // var solution = undefined; //fixme

  /*========================================================================
    SET BOARD
    make a chess board composed of n rows and n columns filled with 0s
  ========================================================================*/

  var chessBoard = [];
  var row = [];

  // iterates through n rows
  for (var i = 0; i < n; i++) {
    // i = 0, 1, 2, 3
    // iterates through n columns
    for (var j = 0; j < n; j++) {
      // makes a row of n zeroes
      row.push(0);
    }
    // adds complete row of zeroes to empty board
    chessBoard.push(row);
    // prepares row variable to create a new row
    row = [];
  }
  console.log('chessBoard is ', chessBoard);


  /*========================================================================
    SET TRACKERS
    make a row index array and a column index array to track squares available to place rooks
  ========================================================================*/
  
  // stores row indices still available for placing men
  var rows = [];
  for (i = 0; i < n; i++) {
    rows.push(i);
  }
  // stores column indices still available for placing men
  var cols = [];
  for (i = 0; i < n; i++) {
    cols.push(i);
  }

  /*========================================================================
    ADD FIRST ROOK
    find a placement for the first rook
  ========================================================================*/

  var firstRow = chessBoard[0];

  // iterates through column indices in first row
  for (var i = 0; i < n; i++) {
    // resets value at index i to 1 (places 'rook' on board)
    // firstRow[i] = 1;
    // removes index value from rows and columns trackers
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
