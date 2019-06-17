'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(56, 159, 117', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardSetup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var wizardsSimilarList = document.querySelector('.setup-similar-list');
var wizardsTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var userNameInput = setup.querySelector('.setup-user-name');

// Валидация формы

userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var getRandomItemFrom = function (array) { // получаем случайный элемент в переданом масиве
  return array[Math.floor(Math.random() * array.length)];
};

var generateWizards = function (count) { // генерация переданого кол-ва волшебников
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards.push({
      name: getRandomItemFrom(WIZARDS_NAMES) + ' ' + getRandomItemFrom(WIZARDS_SURNAMES),
      coatColor: getRandomItemFrom(WIZARDS_COAT_COLOR),
      eyesColor: getRandomItemFrom(WIZARDS_EYES_COLOR)
    });
  }

  return wizards;
};

var createWizzardFromTemplate = function (wizard) { // Создаем темплейт
  var wizardElement = wizardsTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) { // Вставка темплейтов в разметку
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizzardFromTemplate(wizards[i]));
  }

  wizardsSimilarList.appendChild(fragment);
};

var showSetup = function (items) {
  wizardSetup.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');
  renderWizards(generateWizards(items));
};

showSetup(4);
