// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      //if we don't have params, get ready for error messages
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count = 0;
      //find the row
      var row = this.attributes[rowIndex];
      //iterate through the row
      for (var i = 0; i < row.length; i++) {
        //sum the values at each position
        count += row[i];
      }
      //if conflicts, count should be 2 or greater
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var chessBoard = this.attributes;

      // iterate through each rowIndex
      for (var i = 0; i < Object.keys(chessBoard).length - 1; i++) {
        // hasRowConflictAt uses each key of chessBoard as rowIndex
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      // defaults to false value;
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // counts the men in the column at the index passed in
      var chessBoard = this.attributes;

      var count = 0;

      // for each row in the chessBoard:
      for (var i = 0; i < Object.keys(chessBoard).length - 1; i++) {
        // add value at colIndex to count
        count += chessBoard[i][colIndex];
      }
      if (count > 1) {
        return true;
      }

      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var chessBoard = this.attributes;

      // see if any of the colIndices in the chessBoard result in 'true' when passed into hasColConflictAt()
      // iterate through the array of chessBoard keys
      for (var i = 0; i < chessBoard['n']; i++) {
        // run the hasColConflictAt test at each index
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(
      majorDiagonalColumnIndexAtFirstRow) {
      // majorDiagonalColumnIndexAtFirstRow = colIndex - rowIndex

      var count = 0;
      var chessBoard = this.attributes;

      //counts sum of values in major diagonals
      if (majorDiagonalColumnIndexAtFirstRow === -2) {
        count = chessBoard[2][0] + chessBoard[3][1];
      } else if (majorDiagonalColumnIndexAtFirstRow === -1) {
        count = chessBoard[1][0] + chessBoard[2][1] + chessBoard[3][2];
      } else if (majorDiagonalColumnIndexAtFirstRow === 0) {
        count = chessBoard[0][0] + chessBoard[1][1] + chessBoard[2][2] + chessBoard[3][3];
      } else if (majorDiagonalColumnIndexAtFirstRow === 1) {
        count = chessBoard[0][1] + chessBoard[1][2] + chessBoard[2][3];
      } else if (majorDiagonalColumnIndexAtFirstRow === 2) {
        count = chessBoard[0][2] + chessBoard[1][3];
      }

      // return true if counted more than one man on the diagonal
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var chessBoard = this.attributes;

      // check if hasMajorDiagonalConflictAt (index) is true
      // i = rowIndex
      for (var i = 0; i < Object.keys(chessBoard).length - 1; i++) {
        // j = colIndex
        for (var j = 0; j < chessBoard[i].length; j++) {
          // if get 'true' result in helper function, there is a majDiag conflict
          if (this.hasMajorDiagonalConflictAt(j - i) === true) {
            return true;
          }
        }
      } 

      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // minorDiagonalColumnIndexAtFirstRow = colIndex + rowIndex

      var count = 0;
      var chessBoard = this.attributes;

      //counts sum of values in major diagonals
      if (minorDiagonalColumnIndexAtFirstRow === 1) {
        count = chessBoard[0][1] + chessBoard[1][0];
      } else if (minorDiagonalColumnIndexAtFirstRow === 2) {
        count = chessBoard[0][2] + chessBoard[1][1] + chessBoard[2][0];
      } else if (minorDiagonalColumnIndexAtFirstRow === 3) {
        count = chessBoard[0][3] + chessBoard[1][2] + chessBoard[2][1] + chessBoard[3][0];
      } else if (minorDiagonalColumnIndexAtFirstRow === 4) {
        count = chessBoard[1][3] + chessBoard[2][2] + chessBoard[3][1];
      } else if (minorDiagonalColumnIndexAtFirstRow === 5) {
        count = chessBoard[2][3] + chessBoard[3][2];
      }

      // return true if counted more than one man on the diagonal
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var chessBoard = this.attributes;

      // check if hasMinorDiagonalConflictAt (index) is true
      // i = rowIndex
      for (var i = 0; i < Object.keys(chessBoard).length - 1; i++) {
        // j = colIndex
        for (var j = 0; j < chessBoard[i].length; j++) {
          // if get 'true' result in helper function, there is a majDiag conflict
          if (this.hasMinorDiagonalConflictAt(j + i) === true) {
            return true;
          }
        }
      } 
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
