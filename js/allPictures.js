'use strict';

/*(function () {
  var photoUsers = window.data.generatePhotoUsers();

  window.allPictures = {
    photoUsers: photoUsers
  };

  var getAllPhoto = function () {
    var allPhotos = [];
    console.log(window.backend.windowLoad);
    for (var i = 0; i < window.data.SUMM_USER_PHOTO; i++) {
      var userPhoto = window.data.userPhotoTemplate.cloneNode(true);

      userPhoto.querySelector('.picture__img').setAttribute('src', photoUsers[i].url);

      userPhoto.querySelector('.picture__likes').textContent = photoUsers[i].likes;

      userPhoto.querySelector('.picture__comments').textContent = window.data.commentQuantity;

      var fragment = document.createDocumentFragment();

      fragment.appendChild(userPhoto);

      allPhotos[i] = fragment;
    }
    return allPhotos;
  };

  var getAllPhotoBuild = function () {
    var arrAllBuildPhotos = getAllPhoto();
    for (var i = 0; i < window.data.SUMM_USER_PHOTO; i++) {
      window.data.userPhotoContainer.appendChild(arrAllBuildPhotos[i]);
    }
  };

  getAllPhotoBuild();

})();*/

(function () {
  var photoUsers = window.data.generatePhotoUsers();

  var getAllPhoto = function (response) {
    var allPhotos = [];
    for (var i = 0; i < response.length; i++) {
      var userPhoto = window.data.userPhotoTemplate.cloneNode(true);

      userPhoto.querySelector('.picture__img').setAttribute('src', response[i].url);

      userPhoto.querySelector('.picture__likes').textContent = response[i].likes;

      userPhoto.querySelector('.picture__comments').textContent = response[i].comments.length;

      var fragment = document.createDocumentFragment();

      fragment.appendChild(userPhoto);

      allPhotos[i] = fragment;
    }
    return allPhotos;
  };


  var getAllPhotoBuild = function (response) {
    var arrAllBuildPhotos = getAllPhoto(response);
    for (var i = 0; i < response.length; i++) {
      window.data.userPhotoContainer.appendChild(arrAllBuildPhotos[i]);
    }
  };

  window.backend.windowLoad(getAllPhotoBuild);

  window.allPictures = {
    photoUsers: photoUsers
  };
})();
