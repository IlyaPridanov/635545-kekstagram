'use strict';

(function () {
  var bigPicture = window.preview.bigPicture;

  var ESC_KEYCODE = 27;
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var uploadPhotoCancel = document.querySelector('.img-upload__cancel');
  var userPhotoBuilding = document.querySelectorAll('.picture');
  var bigPictureDiv = document.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureDiv.querySelector('img');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var pinSlayder = document.querySelector('.effect-level__pin');
  var effectsRadio = document.querySelectorAll('.effects__radio');
  var radioCheckedIndex;
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var imgUpload = imgUploadPreview.querySelector('img');

  var inputTextHashtags = document.querySelector('.text__hashtags');
  var inputTextDescription = document.querySelector('.text__description');

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

  var isInputNameInFocus = function () {
    return (inputTextHashtags === document.activeElement) || (inputTextDescription === document.activeElement);
  };

  /*var closeBigPictures = function () {
    bigPictureCancel.addEventListener(
        'click', function () {
          bigPicture.classList.add('hidden');
        }
    );
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        bigPicture.classList.add('hidden');
      }
    });
  };

  console.log(window.backend.windowLoad(window.preview.getBigPicture()));

  var getClickMinPictures = function (photoOpen, o, uuu) {
    photoOpen.addEventListener('click', function () {
      /*window.preview.getBigPicture();
      window.preview.getBigPicture(uuu);
      console.log(1);
      /*bigPictureImg.src = window.allPictures.photoUsers[o].url;
      bigPicture.classList.remove('hidden');
      bigPictureImg.src = uuu[o].url;
    });
  };

  var openBigPictures = function (uuu) {
    for (var k = 0; k < userPhotoBuilding.length; k++) {
      getClickMinPictures(userPhotoBuilding[k], k, uuu);
    }
  };

  window.backend.windowLoad(openBigPictures);*/

  var getWhoRadioChecked = function () {
    for (var i = 0; i < effectsRadio.length; i++) {
      if (effectsRadio[i].checked) {
        radioCheckedIndex = i;
      }
    }
    return radioCheckedIndex;
  };

  var getCssProperty = function (elem, property) {
    var result = window.getComputedStyle(elem, null).getPropertyValue(property);
    return (parseFloat(result) / 100);
  };

  var getPinSlayderResultIntro = function () {
    var pinSlayderPageX = getCssProperty(pinSlayder, 'left');
    return pinSlayderPageX;
  };

  var getPhotoCssEffect = function (pinSlayderResult) {
    var WhoRadioChecked = getWhoRadioChecked();
    if (WhoRadioChecked === 1) {
      imgUpload.style.filter = 'grayscale(' + pinSlayderResult + ')';
      imgUploadEffectLevel.classList.remove('hidden');
    }
    if (WhoRadioChecked === 2) {
      imgUpload.style.filter = 'sepia(' + pinSlayderResult + ')';
      imgUploadEffectLevel.classList.remove('hidden');
    }
    if (WhoRadioChecked === 3) {
      imgUpload.style.filter = 'invert(' + pinSlayderResult * 100 + '%)';
      imgUploadEffectLevel.classList.remove('hidden');
    }
    if (WhoRadioChecked === 4) {
      imgUpload.style.filter = 'blur(' + pinSlayderResult * 3 + 'px)';
      imgUploadEffectLevel.classList.remove('hidden');
    }
    if (WhoRadioChecked === 5) {
      imgUpload.style.filter = 'brightness(' + ((pinSlayderResult * 2) + 1) + ')';
      imgUploadEffectLevel.classList.remove('hidden');
    }
    if (WhoRadioChecked === 0) {
      imgUpload.style.filter = 'grayscale(' + 0 + ')';
      imgUpload.style.filter = 'sepia(' + 0 + ')';
      imgUpload.style.filter = 'invert(' + 0 * 100 + '%)';
      imgUpload.style.filter = 'blur(' + 0 * 3 + 'px)';
      imgUpload.style.filter = 'brightness(' + ((0 * 2) + 1) + ')';
      imgUploadEffectLevel.classList.add('hidden');
      imgUploadEffectLevel.value = '';
    }
  };

  var getImgUploadOverlay = function () {
    uploadFile.addEventListener('change', function () {
      imgUploadOverlay.classList.remove('hidden');
      var coordEnd = effectLevelLine.getBoundingClientRect().width;
      var scaleCoord = Math.round((100 / coordEnd) * coordEnd);
      pinSlayder.style.left = scaleCoord + '%';
      effectLevelDepth.style.width = scaleCoord + '%';
      getPhotoCssEffect(1);
    });
  };


  var getCloseUploadPhoto = function () {
    uploadPhotoCancel.addEventListener(
        'click', function () {
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

  var addEventListenerRadio = function (radioArr) {
    radioArr.addEventListener('click', function () {
      var coordEnd = effectLevelLine.getBoundingClientRect().width;
      var scaleCoord = Math.round((100 / coordEnd) * coordEnd);
      pinSlayder.style.left = scaleCoord + '%';
      effectLevelDepth.style.width = scaleCoord + '%';
      getPhotoCssEffect(1);
    });
  };

  var addEventListenerRadioResult = function () {
    for (var k = 0; k < effectsRadio.length; k++) {
      addEventListenerRadio(effectsRadio[k]);
    }
  };

  window.formPhotoEditing = {
    inputTextHashtags: inputTextHashtags,
    imgUpload: imgUpload,
    pinSlayder: pinSlayder,
    effectLevelLine: effectLevelLine,
    effectLevelDepth: effectLevelDepth,
    getPhotoCssEffect: getPhotoCssEffect,
    addEventListenerRadioResult: addEventListenerRadioResult,
    imgUploadOverlay: imgUploadOverlay
  };

  /*closeBigPictures();
  openBigPictures();*/
  getImgUploadOverlay();
  getCloseUploadPhoto();
  getPinSlayderResultIntro();
  getPhotoCssEffect();
})();
