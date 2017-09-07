const Snake = require ('./snake');
const Board = require ('./board');
const View = require ('./view');

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
