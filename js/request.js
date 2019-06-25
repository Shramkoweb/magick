'use strict';

(function () {
  window.request = function (url, method, onSuccess, onError, data) {
    var xhrRequest = new XMLHttpRequest();

    xhrRequest.responseType = 'json';

    xhrRequest.addEventListener('load', function () {
      if (xhrRequest.status === 200) {
        onSuccess(xhrRequest.response);
      } else {
        onError('Cтатус ответа: ' + xhrRequest.status + ' ' + xhrRequest.statusText);
      }
    });

    xhrRequest.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhrRequest.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhrRequest.timeout + 'мс');
    });

    xhrRequest.timeout = 10000; // 10s

    xhrRequest.open(method, url);
    if (data) {
      xhrRequest.send(data);
    } else {
      xhrRequest.send();
    }
    return xhrRequest;
  };
})();
