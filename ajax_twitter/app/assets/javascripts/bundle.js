/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(0);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const APIUtil = __webpack_require__(0);
const UsersSearch = __webpack_require__(3);
const TweetCompose = __webpack_require__(4);
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(0);
const FollowToggle = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(0);

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

        const $removeAnchor = $('.remove-mentioned-user');
        $removeAnchor.on('click', e2 => {
        // debugger;
        $(e2.currentTarget).parent().remove();
        return false;
        });

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map