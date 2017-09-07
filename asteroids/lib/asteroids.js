const GameView = require('./game_view.js');
const Game = require('./game.js');

document.addEventListener("DOMContentLoaded", function() {
const canvasEl = document.getElementById('game-canvas');
canvasEl.width = Game.DIM_X;
canvasEl.height = Game.DIM_Y;
let c = canvasEl.getContext('2d');


new GameView(c).start();
});
