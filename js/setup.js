'use strict';

var WIZZARD_SETUP = document.querySelector('.setup');
var WIZZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(56, 159, 117', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var removeHiddenClass = function (element) {
  element.classList.remove('hidden');
};

removeHiddenClass(WIZZARD_SETUP);

var getRandomItemFrom = function (array) { // получаем случайный элемент в переданом масиве
  var arrayLength = array.length;
  var randomItem = array[Math.floor(Math.random() * array.length)];
  return randomItem;
};

var generateWizards = function name(count) { // генерация переданого кол-ва волшебников
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards.push({
      name: getRandomItemFrom(WIZZARDS_NAMES) + ' ' + getRandomItemFrom(WIZARDS_SURNAMES),
      coatColor: getRandomItemFrom(WIZZARDS_COAT_COLOR),
      eyesColor: getRandomItemFrom(WIZARDS_EYES_COLORS)
    });
  }

  return wizards;
};
