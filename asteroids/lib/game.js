const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

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
