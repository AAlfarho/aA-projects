let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let grid = [... Array(8).keys()].map(() => [... Array(8).keys()].fill(null));
  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');
  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');
  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)){
    throw `Pos ${pos} is invalid.`;
  }
  return this.grid[pos[0]][pos[1]];
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  for(let row in this.grid){
    for(let col in this.grid[row]) {
      [row, col] = [Number(row), Number(col)];

      let piece = this.grid[row][col];
      if(this.isOccupied([row, col])){
        continue;
      }
      // pass empty positions to pos2flip
      Board.DIRS.forEach(function(offset){
        var positions = _positionsToFlip(this,
                                         [row, col], color, offset, []);

        if (positions && positions.length > 0) return true;

      }.bind(this));

    }
  }

  return false;
};
/**
* Recursively follows a direction away from a starting position, adding each
* piece of the opposite color until hitting another piece of the current color.
* It then returns an array of all pieces between the starting position and
* ending position.
*
* Returns null if it reaches the end of the board before finding another piece
* of the same color.
*
* Returns null if it hits an empty position.
*
* Returns null if no pieces of the opposite color are found.
*/
function _positionsToFlip (board, pos, color, offset, piecesToFlip) {
  [pos[0], pos[1]] = [pos[0] + offset[0], pos[1] + offset[1]];

  if (!board.isValidPos(pos) && piecesToFlip.length === 0) return null;

  if (!board.isOccupied(pos)) return null;

  let piece = board.at(pos);

  if (color === piece.oppColor()){
    piecesToFlip.push(piece);
    return _positionsToFlip(board, pos, color, offset, piecesToFlip);
  }

  if (color === piece.color)
    return piecesToFlip;

}

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let piece = this.grid[pos[0]][pos[1]];
  return this.isOccupied(pos) && piece.color === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return Boolean(this.grid[pos[0]][pos[1]]);
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  if (!pos.every((n) => n >= 0 && n <= 7)){
    return false;
  }
  return true;
};


/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

Board.prototype.at = function (pos) {
  return this.grid[pos[0]][pos[1]]
};

module.exports = Board;
