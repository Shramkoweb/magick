'use strict';

(function () {
  var artifact = document.querySelector('.setup-artifacts-cell').firstElementChild;

  artifact.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    artifact.style.position = 'absolute';
    artifact.style.zIndex = '1';

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      artifact.style.top = (artifact.offsetTop - shift.y) + 'px';
      artifact.style.left = (artifact.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
