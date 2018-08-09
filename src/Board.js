// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
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
    // set a counter that tracks the number of pieces on the board

    // Update the stae of the board (browser) with this.get(rowIndex)
    // Loop through the board from left to right
      // If we find a piece
      // Increment the total counter
    // If counter is more than 1
      // Return true if there is conflict
      // else false
    hasRowConflictAt: function(rowIndex) {
      let currentRow = this.get(rowIndex);
      let counter = 0;

      for (let i = 0; i < currentRow.length; i++) {
        if (currentRow[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false;
    },

    //I: ~ invoke get(n) and store it in a variable
    //iterate over n
      //if hasRowConflictAt is true (conflict exists) -> return true
      //otherwise return false
    //O: if hasRowConflictAt returns true at any time
      //return true


    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let allRows = this.get('n');

      for (let i = 0; i < allRows; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    // Get current state of game board for columns
    // Loop through columns

    hasColConflictAt: function(colIndex) {
      let currentColumns = this.get('n');

      //when does counter increment?? when there's a conflict in first index of each row.
      let counter = 0;

      for (let i = 0; i < currentColumns; i++) {
        let rowCol = this.get(i);
        if (rowCol[colIndex] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false;
    },


    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let allColumns = this.get('n');

      for (let i = 0; i < allColumns; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        };
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    // Return a boolean value if there is a conflict on the diagonal axis's.

    // Input is starting at top left corner of board.
    // Have a counter that keeps track of the numnber of peices we find across the board
      // If the piece exists at the row, col, major, minor axis
        // add one to the counter
        // If counter > 1 return true

    // _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
    //   return colIndex - rowIndex;
    // },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let counter = 0;
      let majorD = majorDiagonalColumnIndexAtFirstRow;

      for (let i = 0; i < this.rows().length; ++i) {
        if (this._isInBounds(i, majorD)) {
          if (this.rows()[i][majorD] === 1) {
            counter++;
            if (counter > 1) {
              return true;
            }
          }
        }
        majorD++;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (let i = -this.rows().length; i < this.rows().length; ++i) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
    let counter = 0;
    let minorD = minorDiagonalColumnIndexAtFirstRow;

    for (let i = 0; i < this.rows().length; i++) {
       if (this._isInBounds(i, minorD)) {
          if (this.rows()[i][minorD] === 1) {
            counter++;
            if (counter > 1) {
              return true;
            }
          }
        }
        minorD--;
    }
    return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (let i = 0; i < this.rows().length * 2; ++i) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false; // fixme
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
