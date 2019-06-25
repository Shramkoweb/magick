'use strict';

window.backend = (function () {
  return {
    load: function (onLoad, onError) {
      window.request('https://js.dump.academy/code-and-magick/data', 'GET', onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      window.request('https://js.dump.aademy/code-and-magick', 'POST', onLoad, onError, data);
    }
  };
})();
