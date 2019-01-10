'use strict';

(function () {
  var setPinSliderHandler = function () {
    window.formPhotoEditing.pinSlayder.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: moveEvt.clientX
        };

        console.log(window.formPhotoEditing.rect.width);

        var rect = window.formPhotoEditing.effectLevelLine.getBoundingClientRect();
        var coord = shift.x - rect.left;
        var coordEnd = rect.width;
        var scaleCoord = Math.round((100 / coordEnd) * coord);

        if ((shift.x > rect.left) && (shift.x < rect.right)) {
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
    window.formPhotoEditing.setRadioListenerResult();
    setPinSliderHandler();
  };

  slayderResult();

})();

console.log(window.formPhotoEditing.rect.width);
