'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var COLUMN_WIDTH = 40;
  var HISTOGRAM_HEIGHT = 150;
  var COLUMN_GAP = 50;
  var TEXT_HEIGHT = 16;
  var CLOUD_BOTTOM = CLOUD_HEIGHT - GAP;
  var TITLE_HORIZONTAL_OFFSET = CLOUD_X + GAP * 3;
  var TITLE_VERTICAL_OFFSET = CLOUD_Y + GAP;
  var DEFAULT_TEXT_COLOR = '#000';

  var renderRect = function (ctx, x, y, width, height, color) {
    if (color) {
      ctx.fillStyle = color;
    }
    ctx.fillRect(x, y, width, height);
  };

  var getMaxElement = function (array) {
    var maxElement = array[0];

    for (var i = 0; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }

    return maxElement;
  };

  var renderText = function (ctx, text, x, y, color) {
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    if (color) {
      ctx.fillStyle = color;
    } else {
      ctx.fillStyle = DEFAULT_TEXT_COLOR;
    }
    ctx.fillText(text, x, y);
  };

  var getRandomBlueColor = function () {
    var result = 'hsla(240, 100%, ' + Math.ceil(Math.random() * 100) + '%, 50%)';
    return result;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderRect(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
    renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');
    renderText(ctx, 'Ура, вы победили!', TITLE_HORIZONTAL_OFFSET, TITLE_VERTICAL_OFFSET * 2);
    renderText(ctx, 'Список результатов:', TITLE_HORIZONTAL_OFFSET, TITLE_VERTICAL_OFFSET * 2 + TEXT_HEIGHT);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      var rectColor = function () {
        if (names[i] === 'Вы') {
          ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        } else {
          ctx.fillStyle = getRandomBlueColor();
        }
      };

      var columnHeight = HISTOGRAM_HEIGHT * Math.floor(times[i]) / maxTime;
      var horizontalOffset = CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i;

      renderText(ctx, Math.round(times[i]), horizontalOffset, CLOUD_BOTTOM - TEXT_HEIGHT - columnHeight - TEXT_HEIGHT);
      renderRect(ctx, horizontalOffset, CLOUD_BOTTOM - TEXT_HEIGHT - columnHeight, COLUMN_WIDTH, columnHeight, rectColor());
      ctx.fillStyle = '#000';
      renderText(ctx, names[i], horizontalOffset, CLOUD_BOTTOM);
    }
  };
})();
