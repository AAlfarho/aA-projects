const Board = require('./board.js');

class View {
  constructor(board, snake) {
    this.board = board;
    this.snake = snake;
    this.$world = $('#world');
    this.initializeView();
    this.dropFood();
  }

  dropFood() {
    // put food on random cell
    while (true) {
      const row = Math.floor(Math.random() * Board.ROWS)
      const col = Math.floor(Math.random() * Board.COLS)
      const pos = [row, col]

      if (!this.snake.occupies(pos)) {
        const $row = $('.row').eq(row);
        const $col = $($row.children()[col])

        $col.addClass('food');
        $col.removeClass('empty');
        break;
      }
    }
  }

  initializeView(){
    for(let i = 0; i < Board.ROWS; i++){
      let $ul = $('<ul class=\'row\'></ul>');
      for(let j = 0; j < Board.COLS; j++){
        let $li = $('<li class=\'cell\'>x</li>');
        $li.data('pos',[i, j]);
        $ul.append($li);
      }
      this.$world.append($ul);
    }
  }

  render() {
    const $positions = $('.cell');
    $positions.each((idx, el) => {
      const $el = $(el);
      if (this.snake.occupies($el.data('pos'))) {
        $el.removeClass('empty');
        $el.removeClass('food');
        $el.addClass('snake');
      } else if ($el.hasClass('food')) {
      } else {
        $el.removeClass('snake');
        $el.addClass('empty');
      }
    });
  }
}

module.exports = View;
