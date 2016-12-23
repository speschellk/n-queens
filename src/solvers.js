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
    2. returns a matrix called "solution"
    3. returns ANY possible solution for 'find rooks' problem for n = 1-8
    4. 
  */
  
  var solution = [];

  /*========================================================================
    SET BOARD
    make a chess board composed of n rows and n columns filled with 0s
  =========================================================================*/

  var emptyBoard = [];
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
    emptyBoard.push(row);
    // prepares row variable to create a new row
    row = [];
  }

  var newBoard = new Board(emptyBoard);
  var chessBoard = newBoard.attributes;


  /*=========================================================================================
    SET TRACKERS
    make a row index array and a column index array to track squares available to place rooks
  ==========================================================================================*/
  
  // stores row indices still available for placing men
  var rowTracker = [];
  for (i = 0; i < n; i++) {
    rowTracker.push(i);
  }
  // stores column indices still available for placing men
  var colTracker = [];
  for (i = 0; i < n; i++) {
    colTracker.push(i);
  }

  /*=========================================================================================
    ADD ROOKS
    find a placement for the first rook
  ==========================================================================================*/

  // switches origin square from 0 to 1 ('places rook at origin')
  //debugger;
  var rookPlacer = function() {
    // base case:  
    // if row tracker length is zero, arrived at solution
    if (rowTracker.length === 0) {
      // get rid of extra 'n' key in chessBoard object
      delete chessBoard.n;
      // push each array ('board row') into solution array
      for (var key in chessBoard) {
        solution.push(chessBoard[key]); 
      }
      // return solution board;
      return solution;
    }
    // toggles piece ('adds rook') at first available rowIndex and colIndex
    newBoard.togglePiece(rowTracker[0], colTracker[0]);
    // remove rowIndex from row tracker
    rowTracker = rowTracker.slice(1);
    // remove colIndex from column tracker
    colTracker = colTracker.slice(1);

    // call rookPlacer again
    rookPlacer();
  };
  rookPlacer();

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // solution is equivalent to n!, since each rook placed on
  // the board will yield another n-1 options for permutations
  var solutionCount = 1;
  if (n === 1) {
    solutionCount = solutionCount;
  } else {
    solutionCount = n * window.countNRooksSolutions(n - 1);
  }
  
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  /* RULES:
    1. takes an argument n, which represents the number of rows (and columns) on the chess board AND the number of queens required in the solution
    2. returns a matrix called "solution"
    3. returns ANY possible solution for 'find n queens' problem for each of n = 0-7
  */

  // n = 0 has one valid solution, which is "no solutions" or "does not exist"
  if (n === 0) {
    return 1;
  }
  debugger;
  if (n === 2 || n === 3) {
    return 0;
  }

  var solution = [];

  /*========================================================================
    SET BOARD
    make a chess board composed of n rows and n columns filled with 0s
  =========================================================================*/

  var emptyBoard = [];
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
    emptyBoard.push(row);
    // prepares row variable to create a new row
    row = [];
  }

  var newBoard = new Board(emptyBoard);
  var chessBoard = newBoard.attributes;
  console.log('newBoard queens is ', newBoard);
  console.log('chessboard queens is ', chessBoard);

  /*=========================================================================================
    SET TRACKERS
    make a row index array and a column index array to track squares available to place rooks
  ==========================================================================================*/

  // stores first row column indices
  var masterRow = [];
  for (i = 0; i < n; i++) {
    masterRow.push(i);
  }
  // stores row indices still available for placing men
  var rowTracker = {};
  for (i = 0; i < n; i++) {
    rowTracker[i] = i;
  }
  // stores column indices still available for placing men
  var colTracker = {};
  for (i = 0; i < n; i++) {
    colTracker[i] = i;
  }

  // tracks queens left to be 'placed on board'
  var queenTracker = [];
  for (i = 0; i < n; i++) {
    queenTracker.push('queen');
  }

  console.log('initial rowTracker ', rowTracker);
  console.log('initial colTracker ', colTracker);


 /*=========================================================================================
    ADD QUEENS
    find a placement for queens
  ==========================================================================================*/
  // debugger;
  var queenPlacer = function() {
    console.log('running queenPlacer');

    // checks if no more available rows or no more available columns
    if (Object.keys(rowTracker).length === 0 || Object.keys(colTracker).length === 0) {
      // checks if all queens placed on board
      if (queenTracker.length === 0) {
        // get rid of extra 'n' key in chessBoard object
        delete chessBoard.n;
        // push each array ('board row') into solution array
        for (var key in chessBoard) {
          solution.push(chessBoard[key]); 
        }
        // return solution board;
        console.log('solution ' + solution);
        return solution;
      // no more available rows/columns but haven't placed all the queens
      } else {
      // start over.
      // run it again but tell it to start in the next column, not the origin
      }
    }

    // for (var m = 0; m < masterRow; m++) {

    // }
    // iterate through all the rows still available to place a queen
    for (var i in rowTracker) {
      // iterate through all the columns still available to place a queen
      console.log('rowTracker value ', rowTracker[i]);
      for (var j in colTracker) {
        console.log('colTracker value ', colTracker);
        // if major diag conflicts === false && minor diag conlicts === false
        if (!newBoard.hasAnyQueenConflictsOn(rowTracker[i], colTracker[j])) {
          console.log('made it to no conflict zone');
          // toggle position to 1 value
          newBoard.togglePiece(rowTracker[i], colTracker[j]);
          console.log('chessBoard ', chessBoard);
          // check number of queens left to place
          if (queenTracker.length > 1) {
            console.log('queenTracker length > 1');
            queenTracker = queenTracker.slice(1);
          } else {
            console.log('queenTracker = []');
            queenTracker = [];
          }
          // remove rowIndex from rowTracker
          delete rowTracker[i];
          console.log(rowTracker);
          // remove colIndex from colTracker
          delete colTracker[j];
          console.log(colTracker);
          //break;
        }
      }
      //break
      queenPlacer();
    // if more queens to place, call queenPlacer again
    // if (queenTracker.length > 0) {
    //   console.log('in queenTracker length > 0 check, function will run again');
    //   queenPlacer();
    // } else {
    //   delete chessBoard.n;
    //   // push each array ('board row') into solution array
    //   for (var key in chessBoard) {
    //     solution.push(chessBoard[key]); 
    //   }
      // // return solution board;
      // return solution;
    }
    //console.log('solution ', solution);
    //return solution;
  };
  queenPlacer();
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
