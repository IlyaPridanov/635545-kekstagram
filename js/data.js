'use strict';

(function () {
  /*var COMMENT_STRINGS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];*/

  /*var DESCRIPTION_STRINGS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];*/

  /*var SUMM_USER_PHOTO = 25;*/

  var userPhotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var userPhotoContainer = document.querySelector('.pictures');

  /*var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };*/

  /*var getRandomComment = function () {
    var commentSpeachQuantity = getRandomInt(1, 2);
    return (commentSpeachQuantity === 1) ? COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length - 1)] : (COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length - 1)] + COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length - 1)]);
  };*/

  /*var commentQuantity = getRandomInt(1, 40);*/

  /*var getCommentsArray = function () {
    var ArrayComments = [];
    for (var i = 0; i < commentQuantity; i++) {
      ArrayComments[i] = getRandomComment();
    }
    return ArrayComments;
  };*/

  /*var getRandomArrIndex = function () {
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

  var randomIndexArrNumbers = getRandomArrIndex();*/

  /*var getPhoto = function (i) {
    var photo = {
      url: 'photos/' + (randomIndexArrNumbers[i] + 1) + '.jpg',
      likes: getRandomInt(15, 20),
      comments: getCommentsArray(),
      description: DESCRIPTION_STRINGS[getRandomInt(0, 5)]
    };
    return photo;
  };*/

  /*var generatePhotoUsers = function () {
    var newPhotoUsers = [];
    for (var i = 0; i < SUMM_USER_PHOTO; i++) {
      newPhotoUsers.push(getPhoto(i));
    }
    return newPhotoUsers;
  };*/

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  window.data = {
    /*commentQuantity: commentQuantity,*/
    /*getRandomInt: getRandomInt,*/
    /*generatePhotoUsers: generatePhotoUsers,*/
    /*SUMM_USER_PHOTO: SUMM_USER_PHOTO,*/
    userPhotoTemplate: userPhotoTemplate,
    userPhotoContainer: userPhotoContainer
  };

})();
