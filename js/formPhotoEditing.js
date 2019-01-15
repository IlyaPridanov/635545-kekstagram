'use strict';

(function () {
  var ESC_KEYCODE = window.preview.ESC_KEYCODE;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PERCENT_GET_CSS_PROPERTY = 100;

  var PhotoCssClasses = {
    CHROME: 'effects__preview--chrome',
    SEPIA: 'effects__preview--sepia',
    MARVIN: 'effects__preview--marvin',
    PHOBOS: 'effects__preview--phobos',
    HEAT: 'effects__preview--heat',
    NONE: 'effects__preview--none'
  };

  var scaleControlValue = document.querySelector('.scale__control--value');
  var uploadPhotoCancel = document.querySelector('.img-upload__cancel');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var pinSlider = document.querySelector('.effect-level__pin');
  var effectsRadio = document.querySelectorAll('.effects__radio');
  var radioCheckedIndex;
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var imgUpload = imgUploadPreview.querySelector('img');

  var inputTextHashtags = document.querySelector('.text__hashtags');
  var inputTextDescription = document.querySelector('.text__description');

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

  inputTextDescription.textContent = '';

  var isInputNameInFocus = function () {
    return (inputTextHashtags === document.activeElement) || (inputTextDescription === document.activeElement);
  };

  var getWhoRadioChecked = function () {
    effectsRadio.forEach(function (item, i) {
      if (item.checked) {
        radioCheckedIndex = i;
      }
    });
    return radioCheckedIndex;
  };

  var getCssProperty = function (elem, property) {
    var result = window.getComputedStyle(elem, null).getPropertyValue(property);
    return (parseFloat(result) / PERCENT_GET_CSS_PROPERTY);
  };

  var getPinSliderResultIntro = function () {
    var pinSliderPageX = getCssProperty(pinSlider, 'left');
    return pinSliderPageX;
  };

  var getWhoAddClasses = function (addClass) {
    imgUpload.classList.remove(PhotoCssClasses.CHROME);
    imgUpload.classList.remove(PhotoCssClasses.SEPIA);
    imgUpload.classList.remove(PhotoCssClasses.MARVIN);
    imgUpload.classList.remove(PhotoCssClasses.PHOBOS);
    imgUpload.classList.remove(PhotoCssClasses.HEAT);
    imgUpload.classList.remove(PhotoCssClasses.NONE);
    switch (addClass) {
      case PhotoCssClasses.CHROME:
        imgUpload.classList.add(PhotoCssClasses.CHROME);
        break;
      case PhotoCssClasses.SEPIA:
        imgUpload.classList.add(PhotoCssClasses.SEPIA);
        break;
      case PhotoCssClasses.MARVIN:
        imgUpload.classList.add(PhotoCssClasses.MARVIN);
        break;
      case PhotoCssClasses.PHOBOS:
        imgUpload.classList.add(PhotoCssClasses.PHOBOS);
        break;
      case PhotoCssClasses.HEAT:
        imgUpload.classList.add(PhotoCssClasses.HEAT);
        break;
      default:
        imgUpload.classList.add(PhotoCssClasses.NONE);
    }
  };

  var getPhotoCssEffect = function (pinSliderResult) {
    var whoRadioChecked = getWhoRadioChecked();
    switch (whoRadioChecked) {
      case 1:
        imgUpload.style.filter = 'grayscale(' + pinSliderResult + ')';
        imgUploadEffectLevel.classList.remove('hidden');
        getWhoAddClasses(PhotoCssClasses.CHROME);
        break;
      case 2:
        imgUpload.style.filter = 'sepia(' + pinSliderResult + ')';
        imgUploadEffectLevel.classList.remove('hidden');
        getWhoAddClasses(PhotoCssClasses.SEPIA);
        break;
      case 3:
        imgUpload.style.filter = 'invert(' + pinSliderResult * 100 + '%)';
        imgUploadEffectLevel.classList.remove('hidden');
        getWhoAddClasses(PhotoCssClasses.MARVIN);
        break;
      case 4:
        imgUpload.style.filter = 'blur(' + pinSliderResult * 3 + 'px)';
        imgUploadEffectLevel.classList.remove('hidden');
        getWhoAddClasses(PhotoCssClasses.PHOBOS);
        break;
      case 5:
        imgUpload.style.filter = 'brightness(' + ((pinSliderResult * 2) + 1) + ')';
        imgUploadEffectLevel.classList.remove('hidden');
        getWhoAddClasses(PhotoCssClasses.HEAT);
        break;
      default:
        imgUpload.style.filter = 'grayscale(' + 0 + ')';
        imgUpload.style.filter = 'sepia(' + 0 + ')';
        imgUpload.style.filter = 'invert(' + 0 * 100 + '%)';
        imgUpload.style.filter = 'blur(' + 0 * 3 + 'px)';
        imgUpload.style.filter = 'brightness(' + ((0 * 2) + 1) + ')';
        imgUploadEffectLevel.classList.add('hidden');
        imgUploadEffectLevel.value = '';
        getWhoAddClasses(PhotoCssClasses.NONE);
    }
  };

  var getStartImgUploadOverlay = function () {
    imgUploadOverlay.classList.remove('hidden');
    pinSlider.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    scaleControlValue.value = '100%';
    imgUpload.style.transform = 'scale(1)';
    getPhotoCssEffect(1);
  };

  var getImgUploadOverlay = function () {
    uploadFile.addEventListener('change', function () {
      var file = uploadFile.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          imgUpload.src = reader.result;
        });
        reader.readAsDataURL(file);
      }

      getStartImgUploadOverlay();
    });
  };


  var getCloseUploadPhoto = function () {
    uploadPhotoCancel.addEventListener('click', function () {
      imgUploadOverlay.classList.add('hidden');
      imgUploadOverlay.value = '';
    }
    );
    document.addEventListener('keydown', function (evt) {
      if ((evt.keyCode === ESC_KEYCODE) && (!isInputNameInFocus())) {
        imgUploadOverlay.classList.add('hidden');
        imgUploadOverlay.value = '';
      }
    });
  };

  var setRadioListener = function (radioArr) {
    radioArr.addEventListener('click', function () {
      pinSlider.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      getPhotoCssEffect(1);
    });
  };

  var setRadioListenerResult = function () {
    effectsRadio.forEach(function (item) {
      setRadioListener(item);
    });
  };

  getImgUploadOverlay();
  getCloseUploadPhoto();
  getPinSliderResultIntro();
  getPhotoCssEffect();

  window.formPhotoEditing = {
    inputTextHashtags: inputTextHashtags,
    imgUpload: imgUpload,
    pinSlider: pinSlider,
    effectLevelLine: effectLevelLine,
    effectLevelDepth: effectLevelDepth,
    getPhotoCssEffect: getPhotoCssEffect,
    setRadioListenerResult: setRadioListenerResult,
    imgUploadOverlay: imgUploadOverlay,
    scaleControlValue: scaleControlValue
  };
})();
