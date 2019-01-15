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
    var successButton = success.querySelector('.success__button');

    successButton.addEventListener(
        'click', function () {
          success.classList.add('hidden');
          main.removeChild(success);
          form.reset();
        }
    );

    var setSuccessEscListener = function () {
      document.addEventListener('keydown', onSuccessEscPress);
    };

    var onSuccessEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        success.classList.add('hidden');
        main.remove(success);
        form.reset();
      }
      document.removeEventListener('keydown', onSuccessEscPress);
    };
    setSuccessEscListener();

    var onSuccessArbitraryAreaListener = function () {
      document.addEventListener('click', successArbitraryAreaListener);
    };

    var successArbitraryAreaListener = function (event) {
      if (event.target === success) {
        success.classList.add('hidden');
        main.removeChild(success);
        form.reset();
        document.removeEventListener('click', successArbitraryAreaListener);
      }
    };
    onSuccessArbitraryAreaListener();
  };

  var errorForm = function () {
    var error = errorTemplate.cloneNode(true);
    main.appendChild(error);
    var errorButton = error.querySelector('.error__button');

    errorButton.addEventListener(
        'click', function () {
          error.remove();
          error.classList.add('hidden');
          main.removeChild(error);
        }
    );

    var setErrorEscListener = function () {
      document.addEventListener('keydown', onErrorEscPress);
    };

    var onErrorEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        error.remove();
        error.classList.add('hidden');
        main.removeChild(error);
      }
      document.removeEventListener('keydown', onErrorEscPress);
    };
    setErrorEscListener();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(
        new FormData(form),
        successForm,
        errorForm
    );
  });
})();
