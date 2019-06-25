'use strict';

window.backend = (function () {
  return {
    load: function (onLoad, onError) {
      window.request('https://js.dump.academy/code-and-magick/data', 'GET', onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      window.request('https://js.dump.academy/code-and-magick', 'POST', onLoad, onError, data);
    },
    error: function (errorMessage) {
      var node = document.createElement('p');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
