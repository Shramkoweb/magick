'use strict';

(function () {
  var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(56, 159, 117', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

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
    window.util.isEscEvent(evt, closePopup);
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
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  var getRandomItemFrom = function (array) { // получаем случайный элемент в переданом масиве
    return array[Math.floor(Math.random() * array.length)];
  };

  var createWizzardFromTemplate = function (wizard) { // Создаем темплейт
    var wizardElement = wizardsTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var successLoadData = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(createWizzardFromTemplate(wizards[i]));
    }
    wizardsSimilarList.appendChild(fragment);

    setupSimilar.classList.remove('hidden');
  };

  var errorLoadData = function (errorMessage) {
    var node = document.createElement('p');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successLoadData, errorLoadData);


  var form = setup.querySelector('.setup-wizard-form');
  var formSuccessLoad = function () {
    setup.classList.add('hidden');
  };

  var formErrorLoad = function (errorMessage) {
    var node = document.createElement('p');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), formSuccessLoad, formErrorLoad);
    evt.preventDefault();
  });

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

})();
