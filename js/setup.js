'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(56, 159, 117', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupSimilar = document.querySelector('.setup-similar');
var wizardsSimilarList = document.querySelector('.setup-similar-list');
var wizardsTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupTop;
var setupLeft;

// Работа с окном диалога

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupTop = setup.offsetTop;
  setupLeft = setup.offsetLeft;
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setup.style.top = setupTop + 'px';
  setup.style.left = setupLeft + 'px';
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
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
  renderWizards(generateWizards(items));
  setupSimilar.classList.remove('hidden');
};

showSetup(4);

var setupWizard = document.querySelector('.setup-wizard');
var inputWizardCoat = setup.querySelector('input[name="coat-color"]');
var inputWizardEyes = setup.querySelector('input[name="eyes-color"]');
var inputWizardFireball = setup.querySelector('input[name="fireball-color"]');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

var getRandomFillForWizardPart = function (elem, color, input) {
  elem.style.fill = color;
  input.value = color;
};

var getRandomBackgroundForWizardPart = function (elem, color, input) {
  elem.style.backgroundColor = color;
  input.value = color;
};

wizardCoat.addEventListener('click', function () {
  getRandomFillForWizardPart(wizardCoat, getRandomItemFrom(WIZARDS_COAT_COLOR), inputWizardCoat);
});

wizardEyes.addEventListener('click', function () {
  getRandomFillForWizardPart(wizardEyes, getRandomItemFrom(WIZARDS_EYES_COLOR), inputWizardEyes);
});

wizardFireball.addEventListener('click', function () {
  getRandomBackgroundForWizardPart(wizardFireball, getRandomItemFrom(WIZARDS_FIREBALL_COLOR), inputWizardFireball);
});
