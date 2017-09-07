const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor($el){
    this.$el = $el;
    this.$input = $el.find('input');
    this.$ul = $el.find('ul');
    this.handleClick();
  }

  handleClick(){
    this.$el.find('button').on('click', e => {
      // $(e.currentTarget).prop('disabled', true);
      e.preventDefault();
      APIUtil.searchUsers(this.$input)
      .then(this.renderResults.bind(this)).fail((err) =>{console.log(err);});
    });
  }

  renderResults(response){
    this.$ul.find('li').remove();

    response.forEach(el => {
      const li = $('<li>');
      li.text(el.username);
      this.$ul.append(li);
      const button = $('<button>');
      button.addClass('follow-toggle');
      new FollowToggle(button, {
        userId: el.id,
        followState: el.followed === false ? 'unfollowed' : 'followed'
      });
      li.append(button);

    });

  }
}

module.exports = UsersSearch;
