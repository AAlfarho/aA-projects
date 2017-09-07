/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Board {
  constructor() {

  }
}
Board.ROWS = 20;
Board.COLS = 20;
Board.CENTER = [Math.floor(Board.ROWS / 2), Math.floor(Board.COLS / 2)];

module.exports = Board;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__ (2);
const Board = __webpack_require__ (0);
const View = __webpack_require__ (3);

const LISTEN_RATE = 20;
const RENDER_RATE = 250;

class Game{
  constructor(){
    this.board = new Board();
    this.snake = new Snake(this.board);
    this.view = new View(this.board, this.snake);
  }

  listenForKeyEvents() {
    if(key.isPressed("w")) this.snake.setDirection('N');
    if(key.isPressed("s")) this.snake.setDirection('S');
    if(key.isPressed("a")) this.snake.setDirection('W');
    if(key.isPressed("d")) this.snake.setDirection('E');
  }
}

$(() => {
  let game = new Game();
  window.setInterval(() => {
    game.listenForKeyEvents();
  }, LISTEN_RATE)

  window.setInterval(()=> {
    game.snake.move();
    game.view.render();
  }, RENDER_RATE)
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);

class View {
  constructor(board, snake) {
    this.board = board;
    this.snake = snake;
    this.$world = $('#world');
    this.initializeView();
    this.dropFood();
  }

  dropFood() {
    // put food on random cell
    while (true) {
      const row = Math.floor(Math.random() * Board.ROWS)
      const col = Math.floor(Math.random() * Board.COLS)
      const pos = [row, col]

      if (!this.snake.occupies(pos)) {
        const $row = $('.row').eq(row);
        const $col = $($row.children()[col])

        $col.addClass('food');
        $col.removeClass('empty');
        break;
      }
    }
  }

  initializeView(){
    for(let i = 0; i < Board.ROWS; i++){
      let $ul = $('<ul class=\'row\'></ul>');
      for(let j = 0; j < Board.COLS; j++){
        let $li = $('<li class=\'cell\'>x</li>');
        $li.data('pos',[i, j]);
        $ul.append($li);
      }
      this.$world.append($ul);
    }
  }

  render() {
    const $positions = $('.cell');
    $positions.each((idx, el) => {
      const $el = $(el);
      if (this.snake.occupies($el.data('pos'))) {
        $el.removeClass('empty');
        $el.removeClass('food');
        $el.addClass('snake');
      } else if ($el.hasClass('food')) {
      } else {
        $el.removeClass('snake');
        $el.addClass('empty');
      }
    });
  }
}

module.exports = View;


/***/ })
/******/ ]);