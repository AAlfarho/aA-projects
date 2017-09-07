Function.prototype.inherits = function (Parent) {
  // function Surrogate() {}
  // Surrogate.prototype = Parent.prototype;
  // this.prototype = new Surrogate();
  // this.prototype.constructor = this;

  this.prototype = Object.create(Parent.prototype);
  this.prototype.constructor = this;
};


function MovingObject (name) {
  this.name = name;
}
MovingObject.prototype.collide = function () {
  console.log(`${this.name} will collide.`);
};
function Ship (name) {
  MovingObject.call(this,name);
}

Ship.inherits(MovingObject);
Ship.prototype.sail = function () {
  console.log(`${this.name} is sailing!`);
};

function Asteroid (name, size) {
  MovingObject.call(this,name);
  this.size = size;
}
Asteroid.inherits(MovingObject);
Asteroid.prototype.asteroiding = function () {
  console.log(`${this.name} is flying through space whatever dude.`);
};

let ship = new Ship('SS Amdres');
let asteroid = new Asteroid('Aster', 50);
ship.collide();
asteroid.collide();
ship.sail();
asteroid.asteroiding();

//errors
ship.asteroiding();
asteroid.sail();
