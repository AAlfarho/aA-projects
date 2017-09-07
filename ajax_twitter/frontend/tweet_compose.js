const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.find('input[type=submit]');
    this.submitHandler();
    this.inputHandler();
    this.mentionedUserHandler();
  }

  mentionedUserHandler() {
      const $anchor = $('.add-mentioned-user');
      $anchor.on('click', e => {
        this.addMentionedUser();

        // const $removeAnchor = $('.remove-mentioned-user');
        // $removeAnchor.on('click', e2 => {
        // // debugger;
        // $(e2.currentTarget).parent().remove();
        // return false;
        // });

        return false;
      });


      const $removeAnchor = $('.mentioned-users');
      $removeAnchor.on('click', '.remove-mentioned-user', e2 => {
        // debugger;
        $(e2.currentTarget).parent().remove();
        return false;
      });

  }

  addMentionedUser() {
    const $template = $('#mention-template');
    const $divTemplate = $('.mentioned-users');
    $divTemplate.append($template.html());


  }

  inputHandler(){
    $('textarea').on('input', e => {
      const $currentTarget = $(e.currentTarget);
      const remainingChars = $currentTarget.val().length;
      $('.chars-left').text(140 - remainingChars);
    });
  }

  submitHandler() {
    this.$input.on('click', e => {
      e.preventDefault();
      this.submit();
      this.toggleDisable($('textarea'), $('select'), $('input'));
    });
  }

  submit(){
    APIUtil.createTweet(this.$el).then(this.handleSuccess.bind(this)).fail();
  }

  handleSuccess(response) {
    this.clearInput($('textarea'), $('select'));
    this.render(response);
    this.toggleDisable($('textarea'), $('select'), $('input'));
  }

  render(data) {
    const $feed = $('#feed');
    const $li = $('<li>');
    $li.text(JSON.stringify(data));
    $feed.prepend($li);
    $('.chars-left').text(140);
    $('.mentioned-users').find('select').remove();
  }

  toggleDisable(...$el) {
    $el.forEach(el => {
      el.prop('disabled', !el.prop('disabled'));
    });
  }

  clearInput(...$el) {
    $el.forEach(el => {
      el.val('');
    });
  }
}

module.exports = TweetCompose;
