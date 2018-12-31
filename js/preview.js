'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var ESC_KEYCODE = 27;

  var bigPictureDiv = document.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureDiv.querySelector('img');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var SOCIAL_COMMENTS_VISUAL = 3;

  var getBigPicture = function (response) {

    bigPicture.querySelector('.big-picture__img').setAttribute('src', response.url);

    bigPicture.querySelector('.likes-count').textContent = response.likes;

    bigPicture.querySelector('.comments-count').textContent = response.comments.length;

    var oneSocialComments = function () {
      var oneSocialCommentsString = '';
      for (var i = 0; (i < response.comments.length) && (i < SOCIAL_COMMENTS_VISUAL); i++) {
        oneSocialCommentsString += '<li class="social__comment"><img class="social__picture" src="' + response.comments[i].avatar + '" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + response.comments[i].message + '</p></li>';
      }

      return oneSocialCommentsString;
    };

    var socialComments = function () {
      var socialCommentsAll = '';
      socialCommentsAll = oneSocialComments();
      return socialCommentsAll;
    };

    bigPicture.querySelector('.social__comments').innerHTML = socialComments();

    bigPicture.querySelector('.social__caption').textContent = response.description;

  };

  var closeBigPictures = function () {
    bigPictureCancel.addEventListener(
        'click', function () {
          bigPicture.classList.add('hidden');
        }
    );
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        bigPicture.classList.add('hidden');
      }
    });
  };

  var getClickMinPictures = function (responseIndex) {
    return function () {
      getBigPicture(responseIndex);
      bigPicture.classList.remove('hidden');
      bigPictureImg.src = responseIndex.url;
    };
  };

  var openBigPictures = function (response) {
    window.allPictures.getAllPhotoBuild(response);
    var allPhotos = window.allPictures.getAllPhoto(response);
    for (var k = 0; k < allPhotos.length; k++) {
      allPhotos[k].addEventListener('click', getClickMinPictures(response[k]));
    }
  };

  window.backend.windowLoad(openBigPictures);

  window.preview = {
    getBigPicture: getBigPicture,
    bigPicture: bigPicture
  };

  closeBigPictures();
})();
