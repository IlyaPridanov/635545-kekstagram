'use strict';

/* ОТПРАВКА ФОРМЫ*/

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

var form = document.querySelector('.img-upload__form');

form.addEventListener('submit', function (evt) {
  window.upload(new FormData(form), function () {
    window.formPhotoEditing.imgUploadOverlay.classList.add('hidden');
  });
  evt.preventDefault();
});

/* ЗАГРУЗКА ДАННЫХ*/

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.load = function (onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.send();
  };

  window.backend = {windowLoad: window.load};
})();
