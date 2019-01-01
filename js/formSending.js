'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var form = document.querySelector('.img-upload__form');
  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var main = document.querySelector('main');

  var successForm = function () {
    window.formPhotoEditing.imgUploadOverlay.classList.add('hidden');
    var success = successTemplate.cloneNode(true);
    main.appendChild(success);
    var successButton = document.querySelector('.success__button');

    successButton.addEventListener(
        'click', function () {
          success.remove();
          success.classList.add('hidden');
          main.removeChild(success);
        }
    );
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        success.remove();
        success.classList.add('hidden');
        main.removeChild(success);
      }
    });

  };

  var errorForm = function () {
    var error = errorTemplate.cloneNode(true);
    main.appendChild(error);
    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener(
        'click', function () {
          error.remove();
          error.classList.add('hidden');
          main.removeChild(error);
        }
    );
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        error.remove();
        error.classList.add('hidden');
        main.removeChild(error);
      }
    });
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.windowUpload(
        new FormData(form),
        successForm,
        errorForm
    );
  });
})();
