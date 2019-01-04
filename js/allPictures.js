'use strict';

(function () {
  var allPhotos = [];
  var imgFilters = document.querySelector('.img-filters');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrIndex = function () {
    var indexArrNumbers = [];
    for (var i = 0; i < 10; i++) {
      indexArrNumbers[i] = i;
    }
    var randomIndexNumbers = [];
    for (var j = 0; j < 10; j++) {
      var randomIndex = getRandomInt(0, 10 - j - 1);
      randomIndexNumbers[j] = indexArrNumbers[randomIndex];
      indexArrNumbers.splice(randomIndex, 1);
    }

    return randomIndexNumbers;
  };

  var getAllPhoto = function (response) {
    if (filterNew.classList.contains('img-filters__button--active')) {
      allPhotos = [];
      var randomArrIndex = getRandomArrIndex();
      console.log(randomArrIndex);
      for (var j = 0; j < 10; j++) {
        userPhoto = window.data.userPhotoTemplate.cloneNode(true);
        userPhoto.querySelector('.picture__img').src = response[randomArrIndex[j]].url;
        userPhoto.querySelector('.picture__likes').textContent = response[randomArrIndex[j]].likes;
        userPhoto.querySelector('.picture__comments').textContent = response[randomArrIndex[j]].comments.length;
        allPhotos.push(userPhoto);
      }
      console.log(filterNew.classList.contains('img-filters__button--active'));
    }
    if (filterDiscussed.classList.contains('img-filters__button--active')) {
      allPhotos = [];
      response.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      console.log(response);
      for (var k = 0; k < response.length; k++) {
        var userPhoto = window.data.userPhotoTemplate.cloneNode(true);
        userPhoto.querySelector('.picture__img').src = response[k].url;
        userPhoto.querySelector('.picture__likes').textContent = response[k].likes;
        userPhoto.querySelector('.picture__comments').textContent = response[k].comments.length;
        allPhotos.push(userPhoto);
      }
    }
    if (filterPopular.classList.contains('img-filters__button--active')) {
      allPhotos = [];
      for (var i = 0; i < response.length; i++) {
        userPhoto = window.data.userPhotoTemplate.cloneNode(true);
        userPhoto.querySelector('.picture__img').src = response[i].url;
        userPhoto.querySelector('.picture__likes').textContent = response[i].likes;
        userPhoto.querySelector('.picture__comments').textContent = response[i].comments.length;
        allPhotos.push(userPhoto);
      }
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
    imgFilters.classList.remove('img-filters--inactive');
  };

  window.backend.send(getAllPhotoBuild);

  var getRebootTimeout = function (functionTimeout) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      functionTimeout();
    }, 300);
  };

  filterPopular.addEventListener('click', function () {
    filterPopular.classList.add('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    getRebootTimeout(window.backend.send(getAllPhotoBuild));
  });
  filterNew.addEventListener('click', function () {
    filterNew.classList.add('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    getRebootTimeout(window.backend.send(getAllPhotoBuild));
  });
  filterDiscussed.addEventListener('click', function () {
    filterDiscussed.classList.add('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    getRebootTimeout(window.backend.send(getAllPhotoBuild));
  });

  window.allPictures = {
    getAllPhotoBuild: getAllPhotoBuild,
    getAllPhoto: getAllPhoto,
    getPhotos: getPhotos
  };
})();
