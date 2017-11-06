const MovingObject = require('./moving_object.js');
const Util = require('./util.js');
const Game = require('./game.js');
const Bullet = require('./bullet.js');

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
