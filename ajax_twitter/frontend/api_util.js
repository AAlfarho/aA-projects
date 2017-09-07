const APIUtil = {
  followUser: id => {
    return $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'JSON',
      // success: this.toggleState.bind(this)
    });
 },

  unfollowUser: id => {
    return $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'JSON',
      // success: this.toggleState.bind(this)
    });
  },

  searchUsers: input => {

    return $.ajax({
      method: 'GET',
      url: '/users/search',
      dataType: 'JSON',
      data: input.serialize()
    });
  },

  createTweet: data => {
    return $.ajax({
      method: 'POST',
      url: '/tweets',
      dataType: 'JSON',
      data: data.serializeJSON()
    });
  }
};

module.exports = APIUtil;
