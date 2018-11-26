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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomComment = function () {
  var commentSpeachQuantity = getRandomInt(1, 2);
  return (commentSpeachQuantity === 1) ? COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length -1)] : (COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length -1)] + COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length - 1)]);
};

var commentQuantity =getRandomInt(1, 40);

var getCommentsArray = function () {
  var ArrayComments = [];
  for (var i = 0;i < commentQuantity;i++) {
    ArrayComments[i] = getRandomComment();
  };
  return ArrayComments;
};

var getPhoto = function(i) {
  var photo = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInt(15, 20),
    comments: getCommentsArray(),
    description: DESCRIPTION_STRINGS[getRandomInt(0, 5)]
  };
  return photo;
};

var generatePhotoUsers = function () {
  var newPhotoUsers = [];
  for (var i = 0;i < 25;i++) {
  newPhotoUsers.push(getPhoto(i))
  }
  return newPhotoUsers;
  }

var photoUsers = generatePhotoUsers();

var userPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var userPhotoContainer= document.querySelector('.pictures');

var getAllPhoto = function() {
  var AllPhotos = [];
  for (var i = 0; i < 25; i++) {
    var userPhoto = userPhotoTemplate.cloneNode(true);

    userPhoto.querySelector('.picture__img').setAttribute('src',photoUsers[i].url);

    userPhoto.querySelector('.picture__likes').textContent = photoUsers[i].likes;

    userPhoto.querySelector('.picture__comments').textContent = commentQuantity;

    var fragment = document.createDocumentFragment();

    fragment.appendChild(userPhoto);

    AllPhotos[i] = fragment;
  };

  return AllPhotos;
};

var getAllPhotoBuild = function() {
  for (var i = 0; i < 25; i++) {
    userPhotoContainer.appendChild(getAllPhoto()[i]);
  };
};

var bigPicture = document.querySelector('.big-picture');

var getBigPicture = function () {

  bigPicture.querySelector('.big-picture__img').setAttribute('src',photoUsers[0].url);

  bigPicture.querySelector('.likes-count').textContent = photoUsers[0].likes;

  bigPicture.querySelector('.comments-count').textContent = commentQuantity;

  var oneSocialComments = function () {
    var oneSocialCommentsString = '<li class="social__comment"><img class="social__picture" src="img/avatar-' + getRandomInt(1,6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + photoUsers[0].comments[getRandomInt(0,commentQuantity - 1)] + '</p></li>';
    return oneSocialCommentsString;
  };

  var socialComments = function () {
    var socialCommentsAll = 0;
    for (var i = 0;i < SOCIAL_COMMENTS_VISUAL;i++) {
      socialCommentsAll = socialCommentsAll + oneSocialComments();
    };
    return socialCommentsAll;
  };

  bigPicture.querySelector('.social__comments').innerHTML = socialComments();

  bigPicture.querySelector('.social__caption').textContent = photoUsers[0].description;
};

getAllPhotoBuild();
getBigPicture();

bigPicture.classList.remove('hidden');
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');






