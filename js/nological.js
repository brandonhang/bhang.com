(function($) {
    var noLogical = new Audio('/media/logical.wav');

    $('#no-logical').on('click', function() {
        noLogical.currentTime = 0;
        noLogical.play();
    });
})(jQuery);
