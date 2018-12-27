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

  var ESC_KEYCODE = 27;

  var userPhotoBuilding = window.data.userPhotoContainer;
  /*var userPhotoBuilding = document.querySelectorAll('.picture');*/
  /*var userPhotoBuilding = window.backend.windowLoad(window.allPictures.getAllPhotoBuild());*/
  var bigPictureDiv = document.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureDiv.querySelector('img');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var SOCIAL_COMMENTS_VISUAL = 3;

  var getBigPicture = function (response) {

    bigPicture.querySelector('.big-picture__img').setAttribute('src', response.url);

    bigPicture.querySelector('.likes-count').textContent = response.likes;

    bigPicture.querySelector('.comments-count').textContent = response.comments.length;

    var oneSocialComments = function () {
      console.log(response.comments[0]);
      for (var i = 0; i < response.comments.length; i++) {
        var oneSocialCommentsString = '<li class="social__comment"><img class="social__picture" src="' + response.comments[i].avatar + '" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + response.comments[i].message + '</p></li>';
      }

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

  var getClickMinPictures = function (iii) {
    return function () {
      getBigPicture(iii);
      bigPicture.classList.remove('hidden');
      bigPictureImg.src = iii.url;
      console.log(iii.url);
    };
  };

  console.log(window.allPictures.getAllPhoto);

  var openBigPictures = function (uuu) {
    for (var k = 0; k < uuu.length; k++) {
      console.log(window.allPictures.getAllPhoto(uuu)[k]);
      window.allPictures.getAllPhoto(uuu)[k].addEventListener('click', getClickMinPictures(uuu[k]));
    }
  };

  window.backend.windowLoad(openBigPictures);

  window.preview = {
    getBigPicture: getBigPicture,
    bigPicture: bigPicture
  };

  closeBigPictures();
})();
