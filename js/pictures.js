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

var photoUsers = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomComment = function () {
  var commentQuantity = getRandomInt(1, 2);
  return (commentQuantity === 1) ? COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length)] : (COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length)] + COMMENT_STRINGS[getRandomInt(0, COMMENT_STRINGS.length)]);
};

for (var i = 0;i < 25;i++) {
  var foto = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInt(15, 20),
    comments: [getRandomComment(), getRandomComment(), getRandomComment()],
    description: DESCRIPTION_STRINGS[getRandomInt(0, 5)]
  };
  photoUsers[i] = foto;
}

var userPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var userPhotoContainer= document.querySelector('.pictures');

for (var i = 0; i < 25; i++) {
  var userPhoto = userPhotoTemplate.cloneNode(true);

  userPhoto.querySelector('.picture__img').setAttribute('src',photoUsers[i].url);

  userPhoto.querySelector('.picture__likes').textContent = photoUsers[i].likes;

  userPhoto.querySelector('.picture__comments').textContent = photoUsers[i].comments.length;

  var fragment = document.createDocumentFragment();

  fragment.appendChild(userPhoto);

  userPhotoContainer.appendChild(fragment);
}

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');


bigPicture.querySelector('.big-picture__img').setAttribute('src',photoUsers[0].url);

bigPicture.querySelector('.likes-count').textContent = photoUsers[0].likes;

bigPicture.querySelector('.comments-count').textContent = photoUsers[0].comments.length;

var socialComments = '<li class="social__comment"><img class="social__picture" src="img/avatar-getRandomInt(1,6).svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + photoUsers[i].comments + '</p></li>';

bigPicture.querySelector('.social__comments').innerHTML = socialComments;

bigPicture.querySelector('.social__caption').textContent = photoUsers[0].description;



document.querySelector('.ocial__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');






