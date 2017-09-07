const Board = require('./board.js');

class Snake {
  constructor(board, startPos = Board.CENTER, startDirection = Snake.DIRECTIONS[0]){
    // snakeMap array of poses [row, col]
    // snakeMap[0] is tail; snakeMap[-1] is head
    this.snakeMap = [[8, 10], [9, 10], startPos];
    this.direction = startDirection;
  }

  get head() {
    return this.snakeMap[this.snakeMap.length - 1];
  }

  setDirection(direction) {
    this.direction = direction;
  }

  eat() {

    // return true if food on board
    // board.
    // this.head
  }

  move() {
    this.moveHead();

    if (!this.eat()) {
      this.moveTail();
    }
  }

  occupies(pos) {
    const row = pos[0];
    const col = pos[1];

    return this.snakeMap.some(function(snakePos) {
      const snakeRow = snakePos[0];
      const snakeCol = snakePos[1];

      return row === snakeRow && col === snakeCol;
    });
  }

  moveHead() {
    const prevHead = this.head;
    const nextHead = this.mask(prevHead, Snake.DELTAS[this.direction]);
    this.snakeMap.push(nextHead);
  }

  moveTail() {
    this.snakeMap.shift();
  }

  mask(arr1, arr2) {
    return arr1.map(function(num, idx) {
      return num + arr2[idx];
    });
  }
}

Snake.DIRECTIONS = ["N", "E", "S", "W"];
Snake.DELTAS = {
  "N": [0, -1],
  "E": [1, 0],
  "S": [0, 1],
  "W": [-1, 0]
};

module.exports = Snake;
