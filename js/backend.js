'use strict';

/* ОТПРАВКА ФОРМЫ*/

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  var NORMAL_STATUS = 200;

  var TIMEOUT = 10000;

  var ErrorText = {
    responseStatus: 'Cтатус ответа: ',
    connectionError: 'Произошла ошибка соединения',
    didNotHaveTime: 'Запрос не успел выполниться за '
  };

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === NORMAL_STATUS) {
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

  /* ЗАГРУЗКА ДАННЫХ*/

  var send = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', function () {
      if (xhr.status === NORMAL_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(ErrorText.responseStatus + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ErrorText.connectionError);
    });

    xhr.addEventListener('timeout', function () {
      onError(ErrorText.didNotHaveTime + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.send();
  };

  window.backend = {
    send: send,
    upload: upload
  };

})();
