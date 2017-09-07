const Game = require('./game.js');


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
