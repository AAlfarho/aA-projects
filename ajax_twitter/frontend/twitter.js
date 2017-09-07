const FollowToggle = require('./follow_toggle.js');
const APIUtil = require('./api_util.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');
//
$(() => {
  $('.users-search').each((index, el) => {
    new UsersSearch($(el));
  });
  $('.follow-toggle').each((index, el) => {
    new FollowToggle($(el));
  });
  $('.tweet-compose').each((index, el) => {
    new TweetCompose($(el));
  });
});
