'use strict';

(function () {
  var userPhotoContainer = document.querySelector('.pictures');

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  window.data = {
    userPhotoContainer: userPhotoContainer
  };

})();
