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



//To use the Board() constructor, you must pass it an argument in one of the following formats:
//An object. To create an empty board of size n:
//  {n: <num>} - Where <num> is the dimension of the (empty) board you wish to instantiate
//EXAMPLE: var board = new Board({n:5})

//An array of arrays (a matrix). To create a populated board of size n:
//[ [<val>,<val>,<val>...], [<val>,<val>,<val>...], [<val>,<val>,<val>...] ] - Where each <val> is whatever value you want at that location on the board    EXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])
// Board is a class we can use to initiate a new board (n will be between 1-8)

//var board = new Board({'n': n});
//we can loop through initial board and toggle pieces(+1) for each rows/columns
//output:

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//if n === 1 -> adjust board the pieces and return toggled solution
//if n === 2 -> etc...

// I:
//   [[0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0]]
// O:
//   [[1, 0, 0],
//   [0, 1, 0],
//   [0, 0, 1]]

//iterate through rows,
  //toggle piece, if no conflict(hasRowConflictAt AND hasColumnConflictAt)

  // helper function that takes in (board, columns)
    // Loop through board and grab rows as i
    // Toggle pieces(i, columns)


window.findNRooksSolution = function(n) {

  var board = new Board({'n': n});
  var solution = undefined;

  var matrix = function (board, row, length) {

    if (row === length) {
      //start a new cycle by calling matrix
      return true;
    }
    //i is column
    for (let i = 0; i < length; ++i) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        if (matrix(board, row + 1, length)) {
          if (solution === undefined) {
            solution = board;
          }
          return true;
        }
      }
      board.togglePiece(row, i);
    }
  }

  matrix(board, 0, n);

  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

/*
Time Complexity findNRooksSolution: O(n^2)
*/


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({'n': n});

  var matrix = function (board, row, length) {

    if (row === length) {
      return true;
    }
    //i is column
    for (let i = 0; i < length; ++i) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        if (matrix(board, row + 1, length)) {
          solutionCount++;
        }
      }
      board.togglePiece(row, i);
    }
  }

  matrix(board, 0, n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// Time Complexity findNRooksSolution: O(n^2)

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});
  var solution = undefined;

  var matrix = function (board, row, length) {

    if (row === length) {
      //start a new cycle by calling matrix
      return true;
    }
    //i is column
    for (let i = 0; i < length; ++i) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        if (matrix(board, row + 1, length)) {
          if (solution === undefined) {
            solution = board;
          }
          return true;
        }
      }
      board.togglePiece(row, i);
    }
  }

  matrix(board, 0, n);

  solution = board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;

};

// Time Complexity findNRooksSolution: O(n^2)

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({'n': n});

  var matrix = function (board, row, length) {

    if (row === length) {
      //start a new cycle by calling matrix
      return true;
    }
    //i is column
    for (let i = 0; i < length; ++i) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        if (matrix(board, row + 1, length)) {

          solutionCount++;
        }
      }
      board.togglePiece(row, i);
    }
  }

  matrix(board, 0, n);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// Time Complexity findNRooksSolution: O(n^2)
