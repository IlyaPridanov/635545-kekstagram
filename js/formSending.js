'use strict';

(function () {

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

    successButton.addEventListener('click', function () {
      success.classList.add('hidden');
      if (main === success.parentNode) {
        main.removeChild(success);
      }
      form.reset();
    }
    );

    var setSuccessEscListener = function () {
      document.addEventListener('keydown', onSuccessEscPress);
    };

    var onSuccessEscPress = function (evt) {
      if (evt.keyCode === window.preview.ESC_KEYCODE) {
        success.classList.add('hidden');
        if (main === success.parentNode) {
          main.removeChild(success);
        }
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
        if (main === success.parentNode) {
          main.removeChild(success);
        }
        form.reset();
        document.removeEventListener('click', successArbitraryAreaListener);
      }
    };
    onSuccessArbitraryAreaListener();
  };

  var errorForm = function () {
    window.formPhotoEditing.imgUploadOverlay.classList.add('hidden');
    var error = errorTemplate.cloneNode(true);
    main.appendChild(error);
    var errorButton = error.querySelectorAll('.error__button');

    var setErrorButtonListenerResult = function () {
      errorButton.forEach(function (item) {
        setErrorButtonListener(item);
      });
    };

    var setErrorButtonListener = function (radioArr) {
      radioArr.addEventListener('click', function () {
        error.classList.add('hidden');
        if (main === error.parentNode) {
          main.removeChild(error);
        }
      });
    };

    setErrorButtonListenerResult();

    var setErrorEscListener = function () {
      document.addEventListener('keydown', onErrorEscPress);
    };

    var onErrorEscPress = function (evt) {
      if (evt.keyCode === window.preview.ESC_KEYCODE) {
        error.remove();
        error.classList.add('hidden');
        if (main === error.parentNode) {
          main.removeChild(error);
        }
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
