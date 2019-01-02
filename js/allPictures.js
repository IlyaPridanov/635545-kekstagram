'use strict';

(function () {
  var allPhotos = [];

  var getAllPhoto = function (response) {
    for (var i = 0; i < response.length; i++) {
      var userPhoto = window.data.userPhotoTemplate.cloneNode(true);
      userPhoto.querySelector('.picture__img').src = response[i].url;
      userPhoto.querySelector('.picture__likes').textContent = response[i].likes;
      userPhoto.querySelector('.picture__comments').textContent = response[i].comments.length;
      allPhotos.push(userPhoto);
    }
    return allPhotos;
  };

  var getFragment = function (response) {
    var fragment = document.createDocumentFragment();
    getAllPhoto(response);
    for (var i = 0; i < allPhotos.length; i++) {
      fragment.appendChild(allPhotos[i]);
    }
    return fragment;
  };

  var getPhotos = function () {
    return allPhotos;
  };


  var getAllPhotoBuild = function (response) {
    window.data.userPhotoContainer.appendChild(getFragment(response));
  };

  window.allPictures = {
    getAllPhotoBuild: getAllPhotoBuild,
    getAllPhoto: getAllPhoto,
    getPhotos: getPhotos
  };
})();
