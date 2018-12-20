'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var SOCIAL_COMMENTS_VISUAL = 3;

  var getBigPicture = function () {

    bigPicture.querySelector('.big-picture__img').setAttribute('src', window.allPictures.photoUsers[0].url);

    bigPicture.querySelector('.likes-count').textContent = window.allPictures.photoUsers[0].likes;

    bigPicture.querySelector('.comments-count').textContent = window.data.commentQuantity;

    var oneSocialComments = function () {
      var oneSocialCommentsString = '<li class="social__comment"><img class="social__picture" src="img/avatar-' + window.data.getRandomInt(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + window.allPictures.photoUsers[0].comments[window.data.getRandomInt(0, window.data.commentQuantity - 1)] + '</p></li>';
      return oneSocialCommentsString;
    };

    var socialComments = function () {
      var socialCommentsAll = '';
      for (var i = 0; i < SOCIAL_COMMENTS_VISUAL; i++) {
        socialCommentsAll = socialCommentsAll + oneSocialComments();
      }
      return socialCommentsAll;
    };

    bigPicture.querySelector('.social__comments').innerHTML = socialComments();

    bigPicture.querySelector('.social__caption').textContent = window.allPictures.photoUsers[window.data.getRandomInt(0, window.allPictures.photoUsers.length - 1)].description;
  };

  window.preview = {
    getBigPicture: getBigPicture,
    bigPicture: bigPicture
  };

  getBigPicture();
})();
