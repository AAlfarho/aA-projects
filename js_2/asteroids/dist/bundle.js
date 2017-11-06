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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  inherits(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
  },
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  dist(pos1, pos2) {
    return Math.sqrt(Math.pow((pos1[0] - pos2[0]),2) + Math.pow((pos1[1] - pos2[1]),2));
  },
  randomPos(x,y) {
    return [Math.ceil(Math.random() * x), Math.ceil(Math.random() * y)];
  }
};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(2);
const Asteroid = __webpack_require__(6);
const Ship = __webpack_require__(3);
const Bullet = __webpack_require__(7);

function Game(){
  this.asteroids = [];
  this.ship = new Ship(this.randomPosition(), this);
  this.bullets  = [];
  this.addAsteroids();
}
Game.DIM_X = 1080;
Game.DIM_Y = 720;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.randomPosition = function() {
  let posX = Math.ceil(Math.random() * Game.DIM_X);
  let posY = Math.ceil(Math.random() * Game.DIM_Y);
  return [posX, posY];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach((asteroid) => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach((asteroid) => {
    asteroid.move();
  });
};

Game.prototype.wrap = function (pos) {
  let wrap = [];
  wrap.push((pos[0] <= 0) ? (pos[0] = Game.DIM_X) : (pos[0] % Game.DIM_X));
  wrap.push((pos[1] <= 0) ? (pos[1] = Game.DIM_Y) : (pos[1] % Game.DIM_Y));
  return wrap;
};

Game.prototype.checkCollisions = function () {
  let collidedArr = [];
  let allObjects = this.allObjects();
  for (let i = 0; i < allObjects.length - 1; i++) {
    for (let j = i + 1; j < allObjects.length; j++) {
      if(allObjects[i].isCollidedWith(allObjects[j])) {
        collidedArr.push(allObjects[j]);
      }
    }
  }
  collidedArr.forEach(el => {
    this.remove(el);
  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (object) {
  // let index = this.asteroids.indexOf(object);
  if (object instanceof Ship) {
    object.relocate();
    object.vel = [0,0];
  } else {

  }
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ship).concat(this.bullets);
};
module.exports = Game;

window.Game = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  // let dist = Util.dist(this.pos, otherObject.pos);
  // return (this.radius + otherObject.radius) >= dist;
};


module.exports = MovingObject;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(2);
const Util = __webpack_require__(0);
const Game = __webpack_require__(1);
const Bullet = __webpack_require__(7);

function Ship(pos, game) {
  MovingObject.call(this, {
    pos,
    vel: [0,0],
    color: Ship.COLOR,
    radius: Ship.RADIUS,
    game
  });
  this.fired = false;
}
Util.inherits(Ship, MovingObject);
Ship.RADIUS = 8;
Ship.COLOR = "red";

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
};

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function () {
  if (!this.fired) {
    this.game.bullets.push(new Bullet(this.pos, this.vel, this.game));
    this.fired = true;
    setTimeout(() => {this.fired = false;}, 200);
  }
};
module.exports = Ship;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(5);
const Game = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function() {
const canvasEl = document.getElementById('game-canvas');
canvasEl.width = Game.DIM_X;
canvasEl.height = Game.DIM_Y;
let c = canvasEl.getContext('2d');


new GameView(c).start();
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);


function GameView(ctx){
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
    this.bindKeyHandlers();
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  if (key.isPressed('w')) this.game.ship.power([0,-0.1]);
  if (key.isPressed('a')) this.game.ship.power([-0.1,0]);
  if (key.isPressed('s')) this.game.ship.power([0,0.1]);
  if (key.isPressed('d')) this.game.ship.power([0.1,0]);
  if (key.isPressed('space')) this.game.ship.fireBullet();
};

module.exports = GameView;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(2);
const Ship = __webpack_require__(3);

function Asteroid(pos, game) {
  MovingObject.call(this, {
    pos,
    vel: Util.randomVec(Asteroid.LENGTH),
    color: Asteroid.COLOR,
    radius: Asteroid.RADIUS,
    game
  });
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.isCollidedWith = function (otherObject) {
  if(otherObject instanceof Ship) {
    let dist = Util.dist(this.pos, otherObject.pos);
    return (this.radius + otherObject.radius) >= dist;
  }
};
Asteroid.COLOR = 'gray';
Asteroid.RADIUS = 25;
Asteroid.LENGTH = 5;

module.exports = Asteroid;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(2);
const Asteroid = __webpack_require__(6);
const Game = __webpack_require__(1);

function Bullet(pos, vel, game) {
  MovingObject.call(this, {
    pos,
    vel: Util.scale(vel, Bullet.VEL),
    color: Bullet.COLOR,
    radius: Bullet.RADIUS,
    game
  });
}
Bullet.COLOR = 'white';
Bullet.RADIUS = 3;
Bullet.VEL = 5;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isCollidedWith = function (otherObject) {
  if(otherObject instanceof Asteroid){
    let dist = Util.dist(this.pos, otherObject.pos);
    return (this.radius + otherObject.radius) >= dist;
  }
};

module.exports = Bullet;


/***/ })
/******/ ]);