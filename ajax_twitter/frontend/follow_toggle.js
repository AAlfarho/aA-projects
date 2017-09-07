const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor($el, options){
    this.userId = $el.data('user-id') || options.userId;
    this.followState = $el.data('initial-follow-state') || options.followState;
    this.$el = $el;

    this.render();
    this.handleClick();
  }

  render(){
    if (this.followState === 'unfollowed'){
      this.$el.text('Follow!');
    }
    else {
      this.$el.text('Unfollow!');
    }
    this.$el.prop('disabled', false);
  }

  handleClick(){
    this.$el.on('click', e => {
      this.$el.prop('disabled', true);
      e.preventDefault();
      const ajaxRequest =
        this.followState === 'unfollowed' ?
        APIUtil.followUser(this.userId) :
        APIUtil.unfollowUser(this.userId);

      ajaxRequest.then(this.toggleState.bind(this)).
        done(this.render.bind(this));
    });
  }

  toggleState(){
    // debugger
    if (this.followState === 'unfollowed'){
      this.$el.data('initial-follow-state', 'followed');
      this.followState = 'followed';
    }
    else {
      this.$el.data('initial-follow-state', 'unfollowed');
      this.followState = 'unfollowed';
    }
  }
}

module.exports = FollowToggle;
