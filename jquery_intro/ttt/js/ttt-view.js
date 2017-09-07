
class View {
  constructor(game, $world) {
    this.game = game;
    this.$world = $world;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.bindClick();
  }

  bindClick() {
    // is square 'played'

    let $unplayedCells = $('.cell.unplayed');
    $unplayedCells.on('click', this.makeMove.bind(this));
  }

  makeMove(event) {
    let $clickedCell = $(event.currentTarget);

    try {
      this.game.playMove($clickedCell.data('pos'));
      $clickedCell.text(this.game.currentPlayer);
      $clickedCell.removeClass('unplayed');
      $clickedCell.addClass('played');
    }
    catch(err) {
      alert(err.msg);
    }

    if (this.game.isOver())
      handleWin();
  }

  handleWin() {
    this.winner()
  }

  setupBoard() {
    for(let i = 0; i < View.DIM; i++){
      let $ul = $('<ul class=\'row\'></ul>');
        for(let j = 0; j < View.DIM; j++){
          let $li = $('<li class=\'cell unplayed\'></li>');
          $li.data('pos',[i, j]);
          $ul.append($li);
        }
        this.$world.append($ul);
    }
  }
}
View.DIM = 3;

module.exports = View;
