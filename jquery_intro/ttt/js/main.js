const View = require('./ttt-view'); // require appropriate file
const Game = require('../lib/game.js');// require appropriate file

$( () => {
  let game = new Game();
  let $el = $('#ttt');

  let view = new View(game, $el);


});
