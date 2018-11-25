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

var PhotoUsers = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomComment = function () {
  var CommentQuantity = getRandomInt(1, 2);
  return (CommentQuantity === 1) ? COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length)] : (COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length)] + COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length)]);
};

for (var i = 0;i < 25;i++) {
  var foto = {
    url: 'photos/' + i + '.jpg',
    likes: getRandomInt(15, 20),
    comments: [getRandomComment(), getRandomComment(), getRandomComment()],
    description: DESCRIPTION_STRINGS[getRandomInt(0, 5)]
  };
  PhotoUsers[i] = foto;
}

var UserPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var UserPhotoContainer= document.querySelector('.pictures');

for (var i = 0; i < 25; i++) {
  var UserPhoto = UserPhotoTemplate.cloneNode(true);

  UserPhoto.querySelector('.picture__img').setAttribute('src',PhotoUsers[i + 1].url);

  UserPhoto.querySelector('.picture__likes').textContent = PhotoUsers[i].likes;

  UserPhoto.querySelector('.picture__comments').textContent = PhotoUsers[i].comments.length;

  var fragment = document.createDocumentFragment();

  fragment.appendChild(UserPhoto);

  UserPhotoContainer.appendChild(fragment);
}

var BigPicture = document.querySelector('.big-picture');
BigPicture.classList.remove('hidden');

for (var i = 0; i < 25; i++) {
  BigPicture.querySelector('.big-picture__img').setAttribute('src',PhotoUsers[i + 1].url);

  UserPhoto.querySelector('.likes-count').textContent = PhotoUsers[i].likes;

  UserPhoto.querySelector('.comments-count').textContent = PhotoUsers[i].comments.length;

  var SocialComments = '<li class="social__comment"><img class="social__picture" src="img/avatar-getRandomInt(1,6).svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">PhotoUsers[i].comments</p></li>';

  UserPhoto.querySelector('.social__comments').innerHTML = SocialComments;

  UserPhoto.querySelector('.social__caption').textContent = PhotoUsers[i].description;

};

document.querySelector('.ocial__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');






