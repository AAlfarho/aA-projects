const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');
const Game = require('./game.js');

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
