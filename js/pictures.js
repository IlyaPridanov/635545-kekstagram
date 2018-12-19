'use strict';

var COMMENT_STRINGS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTION_STRINGS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var SOCIAL_COMMENTS_VISUAL = 3;

var SUMM_USER_PHOTO = 25;

var userPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var userPhotoContainer = document.querySelector('.pictures');

var bigPicture = document.querySelector('.big-picture');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomComment = function () {
  var commentSpeachQuantity = getRandomInt(1, 2);
  return (commentSpeachQuantity === 1) ? COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length - 1)] : (COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length - 1)] + COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length - 1)]);
};

var getCommentsArray = function () {
  var ArrayComments = [];
  for (var i = 0; i < commentQuantity; i++) {
    ArrayComments[i] = getRandomComment();
  }
  return ArrayComments;
};

var commentQuantity = getRandomInt(1, 40);

var getRandomArrIndex = function () {
  var indexArrNumbers = [];
  for (var i = 0; i < SUMM_USER_PHOTO; i++) {
    indexArrNumbers[i] = i;
  }
  var randomIndexNumbers = [];
  for (var j = 0; j < SUMM_USER_PHOTO; j++) {
    var randomIndex = getRandomInt(0, SUMM_USER_PHOTO - j - 1);
    randomIndexNumbers[j] = indexArrNumbers[randomIndex];
    indexArrNumbers.splice(randomIndex, 1);
  }

  return randomIndexNumbers;
};

var randomIndexArrNumbers = getRandomArrIndex();

var getPhoto = function (i) {
  var photo = {
    url: 'photos/' + (randomIndexArrNumbers[i] + 1) + '.jpg',
    likes: getRandomInt(15, 20),
    comments: getCommentsArray(),
    description: DESCRIPTION_STRINGS[getRandomInt(0, 5)]
  };
  return photo;
};

var generatePhotoUsers = function () {
  var newPhotoUsers = [];
  for (var i = 0; i < SUMM_USER_PHOTO; i++) {
    newPhotoUsers.push(getPhoto(i));
  }
  return newPhotoUsers;
};

var photoUsers = generatePhotoUsers();

var getAllPhoto = function () {
  var allPhotos = [];
  for (var i = 0; i < SUMM_USER_PHOTO; i++) {
    var userPhoto = userPhotoTemplate.cloneNode(true);

    userPhoto.querySelector('.picture__img').setAttribute('src', photoUsers[i].url);

    userPhoto.querySelector('.picture__likes').textContent = photoUsers[i].likes;

    userPhoto.querySelector('.picture__comments').textContent = commentQuantity;

    var fragment = document.createDocumentFragment();

    fragment.appendChild(userPhoto);

    allPhotos[i] = fragment;
  }
  return allPhotos;
};

var getAllPhotoBuild = function () {
  var arrAllBuildPhotos = getAllPhoto();
  for (var i = 0; i < SUMM_USER_PHOTO; i++) {
    userPhotoContainer.appendChild(arrAllBuildPhotos[i]);
  }
};

var getBigPicture = function () {

  bigPicture.querySelector('.big-picture__img').setAttribute('src', photoUsers[0].url);

  bigPicture.querySelector('.likes-count').textContent = photoUsers[0].likes;

  bigPicture.querySelector('.comments-count').textContent = commentQuantity;

  var oneSocialComments = function () {
    var oneSocialCommentsString = '<li class="social__comment"><img class="social__picture" src="img/avatar-' + getRandomInt(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + photoUsers[0].comments[getRandomInt(0, commentQuantity - 1)] + '</p></li>';
    return oneSocialCommentsString;
  };

  var socialComments = function () {
    var socialCommentsAll = '';
    for (var i = 0; i < SOCIAL_COMMENTS_VISUAL; i++) {
      socialCommentsAll = socialCommentsAll + oneSocialComments();
    }
    return socialCommentsAll;
  };

  bigPicture.querySelector('.social__comments').innerHTML = socialComments();

  bigPicture.querySelector('.social__caption').textContent = photoUsers[getRandomInt(0, photoUsers.length - 1)].description;
};

getAllPhotoBuild();
getBigPicture();

/* bigPicture.classList.remove('hidden');*/
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

/* module4-task1*/
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

var scaleControlValue = document.querySelector('.scale__control--value');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var inputTextHashtags = document.querySelector('.text__hashtags');
var inputTextDescription = document.querySelector('.text__description');

var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelDepth = document.querySelector('.effect-level__depth');

var isInputNameInFocus = function () {
  return (inputTextHashtags === document.activeElement) || (inputTextDescription === document.activeElement);
};

var closeBigPictures = function () {
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

var getClickMinPictures = function (photoOpen, o) {
  photoOpen.addEventListener('click', function () {
    getBigPicture();
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = photoUsers[o].url;
  });
};

var openBigPictures = function () {
  for (var k = 0; k < userPhotoBuilding.length; k++) {
    getClickMinPictures(userPhotoBuilding[k], k);
  }
};

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
  }
  if (WhoRadioChecked === 2) {
    imgUpload.style.filter = 'sepia(' + pinSlayderResult + ')';
  }
  if (WhoRadioChecked === 3) {
    imgUpload.style.filter = 'invert(' + pinSlayderResult * 100 + '%)';
  }
  if (WhoRadioChecked === 4) {
    imgUpload.style.filter = 'blur(' + pinSlayderResult * 3 + 'px)';
  }
  if (WhoRadioChecked === 5) {
    imgUpload.style.filter = 'brightness(' + ((pinSlayderResult * 2) + 1) + ')';
  }
  if (WhoRadioChecked === 0) {
    imgUpload.style.filter = 'grayscale(' + 0 + ')';
    imgUpload.style.filter = 'sepia(' + 0 + ')';
    imgUpload.style.filter = 'invert(' + 0 * 100 + '%)';
    imgUpload.style.filter = 'blur(' + 0 * 3 + 'px)';
    imgUpload.style.filter = 'brightness(' + ((0 * 2) + 1) + ')';
    imgUploadOverlay.classList.add('hidden');
    imgUploadOverlay.value = '';
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
    /* getPhotoCssEffect(getPinSlayderResultIntro()); */
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

/* Кусок module5-task1 */

var addEventListenerPinSlayder = function () {
  pinSlayder.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    /* Запомним координаты точки, с которой мы начали перемещать диалог. */

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX
      };

      var coord = shift.x - effectLevelLine.getBoundingClientRect().left;
      var coordEnd = effectLevelLine.getBoundingClientRect().width;
      var scaleCoord = Math.round((100 / coordEnd) * coord);

      if ((shift.x > effectLevelLine.getBoundingClientRect().left) && (shift.x < effectLevelLine.getBoundingClientRect().right)) {
        pinSlayder.style.left = scaleCoord + '%';

        effectLevelDepth.style.width = scaleCoord + '%';
      }

      getPhotoCssEffect(scaleCoord / 100);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

};


var slayderResult = function () {
  addEventListenerRadioResult();
  addEventListenerPinSlayder();
};

closeBigPictures();
openBigPictures();
getImgUploadOverlay();
getCloseUploadPhoto();
getPinSlayderResultIntro();
getPhotoCssEffect();
slayderResult();

/* module4-task2 */

/* Нажатие на кнопки масштаба */
var addEventListenerScaleControl = function () {
  scaleControlValue.value = '100%';
  scaleControlSmaller.addEventListener('click', function () {
    if (parseFloat(scaleControlValue.value) > 0) {
      scaleControlValue.value = String(parseFloat(scaleControlValue.value) - 25) + '%';
      imgUpload.style.transform = 'scale(' + (parseFloat(scaleControlValue.value) / 100) + ')';
    }
  });
  scaleControlBigger.addEventListener('click', function () {
    if (parseFloat(scaleControlValue.value) < 100) {
      scaleControlValue.value = String(parseFloat(scaleControlValue.value) + 25) + '%';
      imgUpload.style.transform = 'scale(' + (parseFloat(scaleControlValue.value) / 100) + ')';
    }
  });
};

/* Валидация форм */

var hashtagsErrorText = {
  fiveHashtags: 'Не более пяти хештегов',
  aloneLattice: 'Хеш-тег не может состоять только из одной решётки',
  space: 'Хэш-теги разделяются пробелами',
  newHashtagsLattice: 'Хэш-тег начинается с символа # (решётка)',
  maxLengthHashtags: 'Максимальная длина одного хэш-тега 20 символов',
  sameHashtags: 'Один и тот же хэш-тег не может быть использован дважды'
};

var checkLengthFiveHashtags = function (arr) {
  if (arr.length > 5) {
    return hashtagsErrorText.fiveHashtags;
  } else {
    return '';
  }
};

var checkAloneLattice = function (arr) {
  var checkAloneLatticeResult = '';
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === '#') {
      checkAloneLatticeResult = hashtagsErrorText.aloneLattice;
      break;
    }
  }
  return checkAloneLatticeResult;
};

var checkNewHashtagsLattice = function (arr) {
  var checkNewHashtagsLatticeResult = '';
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0] !== '#') {
      checkNewHashtagsLatticeResult = hashtagsErrorText.newHashtagsLattice;
      break;
    }
  }
  return checkNewHashtagsLatticeResult;
};

var checkMaxLengthHashtags = function (arr) {
  var checkMaxLengthHashtagsResult = '';
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].length > 20) {
      checkMaxLengthHashtagsResult = hashtagsErrorText.maxLengthHashtags;
      break;
    }
  }
  return checkMaxLengthHashtagsResult;
};

var checkSameHashtags = function (arr) {
  var checkSameHashtagsResult = '';
  var flag = false;
  for (var i = 0; i < arr.length; i++) {
    if (flag) {
      break;
    }
    for (var j = 0; j < arr.length; j++) {
      if ((arr[i].toUpperCase() === arr[j].toUpperCase()) && (i !== j)) {
        checkSameHashtagsResult = hashtagsErrorText.sameHashtags;
        flag = true;
        break;
      }
      checkSameHashtagsResult = '';
    }
  }
  return checkSameHashtagsResult;
};

var gethashtagsArrMistakes = function (arrHashtags) {
  var hashtagsArrMistakes = [
    checkLengthFiveHashtags(arrHashtags),
    checkAloneLattice(arrHashtags),
    checkNewHashtagsLattice(arrHashtags),
    checkMaxLengthHashtags(arrHashtags),
    checkSameHashtags(arrHashtags)
  ];
  return hashtagsArrMistakes;
};

var onHashtagInput = function () {
  var arr = inputTextHashtags.value.trim().split(' ');
  inputTextHashtags.setCustomValidity(gethashtagsArrMistakes(arr).join(''));
};

inputTextHashtags.addEventListener('change', onHashtagInput);
addEventListenerScaleControl();

