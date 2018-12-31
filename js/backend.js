'use strict';

/* ОТПРАВКА ФОРМЫ*/

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    windowUpload: window.upload
  };


  /* ЗАГРУЗКА ДАННЫХ*/


  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.send();
  };

  window.backend = {
    windowLoad: window.load,
    windowUpload: window.upload
  };

})();
