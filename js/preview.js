'use strict';
/*
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
})();*/

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var SOCIAL_COMMENTS_VISUAL = 3;

  var getBigPicture = function (response) {

    for (var j = 0; j < response.length; j++) {
      bigPicture.querySelector('.big-picture__img').setAttribute('src', response[j].url);

      bigPicture.querySelector('.likes-count').textContent = response[j].likes;

      bigPicture.querySelector('.comments-count').textContent = response[j].comments.length;

      var oneSocialComments = function () {
        var oneSocialCommentsString = '<li class="social__comment"><img class="social__picture" src="' + response[j].comments[0].avatar + '" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + response[j].comments[0].message + '</p></li>';
        return oneSocialCommentsString;
      };

      var socialComments = function () {
        var socialCommentsAll = '';
        for (var i = 0; i < /*SOCIAL_COMMENTS_VISUAL*/ 1; i++) {
          socialCommentsAll = socialCommentsAll + oneSocialComments();
        }
        return socialCommentsAll;
      };

      bigPicture.querySelector('.social__comments').innerHTML = socialComments();

      bigPicture.querySelector('.social__caption').textContent = response[j].description;

    }

  };

  var userPhotoBuilding = document.querySelectorAll('.picture');
  var bigPictureDiv = document.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureDiv.querySelector('img');
  var ESC_KEYCODE = 27;
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

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

  var getClickMinPictures = function (photoOpen, o, uuu) {
    photoOpen.addEventListener('click', function () {
      getBigPicture(uuu);
      console.log(1);
      bigPicture.classList.remove('hidden');
      bigPictureImg.src = uuu[o].url;
    });
  };

  var openBigPictures = function (uuu) {
    for (var k = 0; k < userPhotoBuilding.length; k++) {
      getClickMinPictures(userPhotoBuilding[k], k, uuu);
    }
  };

  window.backend.windowLoad(openBigPictures);

  window.preview = {
    getBigPicture: getBigPicture,
    bigPicture: bigPicture
  };

  closeBigPictures();
})();
