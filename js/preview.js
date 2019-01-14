'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var socialCommentsVisual = 5;

  var bigPicture = document.querySelector('.big-picture');

  var bigPictureDiv = document.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureDiv.querySelector('img');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var commentsLoader = document.querySelector('.comments-loader');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsNow = document.querySelector('.comments-now');

  commentsLoader.classList.remove('visually-hidden');
  socialCommentCount.classList.remove('visually-hidden');

  var getOneSocialComments = function (response) {
    var oneSocialCommentsString = '';
    response.comments.forEach(function (item, i) {
      if (i < socialCommentsVisual) {
        if (socialCommentsVisual >= response.comments.length) {
          commentsLoader.classList.add('hidden');
        }
        oneSocialCommentsString += '<li class="social__comment"><img class="social__picture" src="' + item.avatar + '" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + item.message + '</p></li>';
      }
    });
    return oneSocialCommentsString;
  };
  var getSocialComments = function (response) {
    var socialCommentsAll = '';
    socialCommentsAll = getOneSocialComments(response);
    return socialCommentsAll;
  };

  var getBigPicture = function (response) {
    bigPicture.querySelector('.big-picture__img').setAttribute('src', response.url);
    bigPicture.querySelector('.likes-count').textContent = response.likes;
    bigPicture.querySelector('.comments-count').textContent = response.comments.length;

    bigPicture.querySelector('.social__comments').innerHTML = getSocialComments(response);
    if (socialCommentsVisual < response.comments.length) {
      commentsNow.textContent = socialCommentsVisual;
    } else {
      commentsNow.textContent = response.comments.length;
    }
    commentsLoader.addEventListener('click', function () {
      socialCommentsVisual += 5;
      bigPicture.querySelector('.social__comments').innerHTML = getSocialComments(response);
      if (socialCommentsVisual < response.comments.length) {
        commentsNow.textContent = socialCommentsVisual;
      } else {
        commentsNow.textContent = response.comments.length;
      }
    });
    bigPicture.querySelector('.social__caption').textContent = response.description;
    window.preview.closeBigPictures();
  };

  var closeBigPictures = function () {
    bigPictureCancel.addEventListener(
        'click', function () {
          socialCommentsVisual = 5;
          bigPicture.classList.add('hidden');
        }
    );
    var setBigPictureEscListener = function () {
      document.addEventListener('keydown', onBigPictureEscListener);
    };
    var onBigPictureEscListener = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        socialCommentsVisual = 5;
        bigPicture.classList.add('hidden');
      }
      document.removeEventListener('keydown', onBigPictureEscListener);
    };
    setBigPictureEscListener();
  };

  var getClickMinPictures = function (responseIndex) {
    return function () {
      socialCommentsVisual = 5;
      commentsLoader.classList.remove('hidden');
      getBigPicture(responseIndex);
      bigPicture.classList.remove('hidden');
      bigPictureImg.src = responseIndex.url;
    };
  };

  var flagNew = window.allPictures.flagNew;

  var openBigPictures = function (response) {
    window.allPictures.getAllPhotoBuild(response);
    var allPhotos = window.data.userPhotoContainer.querySelectorAll('a');
    if (flagNew) {
      allPhotos.forEach(function (item, i) {
        item.addEventListener('click', getClickMinPictures(response[window.allPictures.randomArrIndexes[i]]));
      });
    }
    if (!flagNew) {
      allPhotos.forEach(function (item, i) {
        item.addEventListener('click', getClickMinPictures(response[i]));
      });
    }
  };

  window.backend.send(openBigPictures);

  window.allPictures.filterPopular.addEventListener('click', function () {
    flagNew = false;
    window.backend.send(openBigPictures);
  });
  window.allPictures.filterNew.addEventListener('click', function () {
    flagNew = true;
    window.backend.send(openBigPictures);
  });
  window.allPictures.filterDiscussed.addEventListener('click', function () {
    flagNew = false;
    window.backend.send(openBigPictures);
  });

  closeBigPictures();

  window.preview = {
    getBigPicture: getBigPicture,
    bigPicture: bigPicture,
    closeBigPictures: closeBigPictures,
    openBigPictures: openBigPictures
  };
})();
