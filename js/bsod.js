(function($) {
    var percent = 0;


    function add() {
        percent++;
        if (percent > 100) {
            percent = 0;
        }
        $('#percent').text(percent);
        increment();
    }

    function increment() {
        setTimeout(add, 1000);
    }
    increment();

    $(document).on('click', '#button-nt', function() {
        $('#classic-blue').fadeIn("fast");
        $('.bkgrd:not(#classic-blue)').delay("fast").fadeOut("fast");
        $(this).addClass('button-active').siblings().removeClass('button-active');
        $('.screen:not(.bsod-nt)').fadeOut("fast");
        $('.bsod-nt').delay("fast").fadeIn("fast");
    });

    $(document).on('click', '#button-9x', function() {
        $('#classic-blue').fadeIn("fast");
        $('.bkgrd:not(#classic-blue)').delay("fast").fadeOut("fast");
        $(this).addClass('button-active').siblings().removeClass('button-active');
        $('.screen:not(.bsod-9x)').fadeOut("fast");
        $('.bsod-9x').delay("fast").fadeIn("fast");
    });

    $(document).on('click', '#button-2k', function() {
        $('#classic-blue').fadeIn("fast");
        $('.bkgrd:not(#classic-blue)').delay("fast").fadeOut("fast");
        $(this).addClass('button-active').siblings().removeClass('button-active');
        $('.screen:not(.bsod-2k)').fadeOut("fast");
        $('.bsod-2k').delay("fast").fadeIn("fast");
    });

    $(document).on('click', '#button-vβ', function() {
        $('#crimson-chin-red').fadeIn("fast");
        $('.bkgrd:not(#crimson-chin-red)').delay("fast").fadeOut("fast");
        $(this).addClass('button-active').siblings().removeClass('button-active');
        $('.screen:not(.longhorn)').fadeOut("fast");
        $('.longhorn').delay("fast").fadeIn("fast");
    });

    $(document).on('click', '#button-w7', function() {
        $('#classic-blue').fadeIn("fast");
        $('.bkgrd:not(#classic-blue)').delay("fast").fadeOut("fast");
        $(this).addClass('button-active').siblings().removeClass('button-active');
        $('.screen:not(.bsod-w7)').fadeOut("fast");
        $('.bsod-w7').delay("fast").fadeIn("fast");
    });

    $(document).on('click', '#button-w8', function() {
        $('#modern-blue').fadeIn("fast");
        $('.bkgrd:not(#modern-blue)').delay("fast").fadeOut("fast");
        $(this).addClass('button-active').siblings().removeClass('button-active');
        $('.screen:not(.bsod-w8)').fadeOut("fast");
        $('.bsod-w8').delay("fast").fadeIn("fast");
    });

    $(document).on('click', '#button-lin', function() {
        $('#black-on-black').fadeIn("fast");
        $('.bkgrd:not(#black-on-black)').delay("fast").fadeOut("fast");
        $(this).addClass('button-active').siblings().removeClass('button-active');
        $('.screen:not(.linux)').fadeOut("fast");
        $('.linux').delay("fast").fadeIn("fast");
    });

    $(document).on('click', '#button-osx', function() {
        $('#whiteout').fadeIn("fast");
        $('.bkgrd:not(#whiteout)').delay("fast").fadeOut("fast");
        $(this).addClass('button-active').siblings().removeClass('button-active');
        $('#timestamp').text(getTimestamp());
        $('#uptime').text(new Date().getTime());
        $('.screen:not(.mac)').fadeOut("fast");
        $('.mac').delay("fast").fadeIn("fast");
    });

    $(document).on('click', '#button-tv', function() {
        $(this).addClass('button-active').siblings().removeClass('button-active');
        $('.screen:not(.tv)').fadeOut("fast");
        $('.tv').delay("fast").fadeIn("fast");
    });

    $(document).on('click', '#button-halo', function() {
        $('#classic-blue').fadeIn("fast");
        $('.bkgrd:not(#classic-blue)').delay("fast").fadeOut("fast");
        $(this).addClass('button-active').siblings().removeClass('button-active');
        $('.screen:not(.seven-rings-erneh)').fadeOut("fast");
        $('.seven-rings-erneh').delay("fast").fadeIn("fast");
    });

    $(document).keypress(function() {
        $('.hidden').addClass('show');
    });
})(jQuery);

/*$(document).keypress(function() {
    $('.hidden').fadeIn('slow');
    console.log("yo");
    $(this).off();
});*/

function getTimestamp() {
    var dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = new Date();
    var weekday = dayArr[date.getUTCDay()];
    var month = monthArr[date.getUTCMonth()];
    var day = date.getUTCDate();
    var hour = date.getUTCHours();
    var min = date.getUTCMinutes();
    var sec = date.getUTCSeconds();
    var year = date.getUTCFullYear();

    if (day < 10) {
        day = String(0) + day;
    }
    if (hour < 10) {
        hour = String(0) + hour;
    }
    if (min < 10) {
        min = String(0) + min;
    }
    if (sec < 10) {
        sec = String(0) + sec;
    }

    return weekday + " " + month + " " + day + " " + hour + ":" + min + ":" + sec + " UTC " + year;
}
