'use strict';

(function () {
  var addEventListenerPinSlayder = function () {
    window.formPhotoEditing.pinSlayder.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: moveEvt.clientX
        };

        var coord = shift.x - window.formPhotoEditing.effectLevelLine.getBoundingClientRect().left;
        var coordEnd = window.formPhotoEditing.effectLevelLine.getBoundingClientRect().width;
        var scaleCoord = Math.round((100 / coordEnd) * coord);

        if ((shift.x > window.formPhotoEditing.effectLevelLine.getBoundingClientRect().left) && (shift.x < window.formPhotoEditing.effectLevelLine.getBoundingClientRect().right)) {
          window.formPhotoEditing.pinSlayder.style.left = scaleCoord + '%';

          window.formPhotoEditing.effectLevelDepth.style.width = scaleCoord + '%';
        }

        window.formPhotoEditing.getPhotoCssEffect(scaleCoord / 100);
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
    window.formPhotoEditing.addEventListenerRadioResult();
    addEventListenerPinSlayder();
  };

  slayderResult();

})();
