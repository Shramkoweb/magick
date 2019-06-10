'use strict';

var WIZZARD_SETUP = document.querySelector('.setup');
var SETUP_SUMILAR = document.querySelector('.setup-similar');
var WIZZARDS_SIMILAR_LIST = document.querySelector('.setup-similar-list');
var WIZZARDS_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var WIZZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(56, 159, 117', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var removeHiddenClass = function (element) {
  element.classList.remove('hidden');
};

removeHiddenClass(WIZZARD_SETUP);

var getRandomItemFrom = function (array) { // получаем случайный элемент в переданом масиве
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

var createWizzardFromTemplate = function (wizard) { // Создаем темплейт
  var wizardElement = WIZZARDS_TEMPLATE.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizardsFromTemplate = function (count) { // Вставка темплейтов в разметку
  var fragment = document.createDocumentFragment();
  var arrayOfWizards = generateWizards(count);

  for (var i = 0; i < count; i++) {
    fragment.appendChild(createWizzardFromTemplate(arrayOfWizards[i]));
  }

  WIZZARDS_SIMILAR_LIST.appendChild(fragment);
};

renderWizardsFromTemplate(4);
removeHiddenClass(SETUP_SUMILAR);
