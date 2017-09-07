const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');

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
