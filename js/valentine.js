(function($) {
    var wWidth = $(window).width();
    var wHeight = $(window).height() - 44;

    $('#crose').attr('width', wWidth);
    $('#crose').attr('height', wHeight);

    var counter = 1;
    var lineColor = [
        '#4ef132', '#50ef36', '#52ee3a', '#54ed3f', '#57eb43',
        '#59ea48', '#5be94c', '#5de751', '#60e655', '#62e55a',
        '#64e35e', '#66e263', '#69e167', '#6bdf6c', '#6dde70',
        '#6fdd75', '#72db79', '#74da7e', '#76d982', '#78d787',
        '#7bd68b', '#7dd590', '#7fd494', '#81d298', '#84d19d',
        '#86d0a1', '#88cea6', '#8acdaa', '#8dccaf', '#8fcab3',
        '#91c9b8', '#93c8bc', '#96c6c1', '#98c5c5', '#9ac4ca',
        '#9cc2ce', '#9fc1d3', '#a1c0d7', '#a3bedc', '#a5bde0',
        '#a8bce5', '#aabae9', '#acb9ee', '#aeb8f2', '#b1b7f7'
    ];
    var fillColor = [
        '#4ef132', '#4deb34', '#4de637', '#4ce13a', '#4cdc3d',
        '#4cd63f', '#4bd142', '#4bcc45', '#4bc748', '#4ac24a',
        '#4abc4d', '#4ab750', '#49b253', '#49ad55', '#49a858',
        '#48a25b', '#489d5e', '#489860', '#479363', '#478e66',
        '#478869', '#46836b', '#467e6e', '#467971', '#457474',
        '#456e76', '#456979', '#44647c', '#445f7f', '#445a81',
        '#435484', '#434f87', '#434a8a', '#42458c', '#42408f',
        '#423a92', '#413595', '#413097', '#412b9a', '#40269d',
        '#4020a0', '#401ba2', '#3f16a5', '#3f11a8', '#3f0cab'
    ];

    function bloom() {
        var canvas = document.getElementById('crose');
        var cx = canvas.getContext('2d');
        cx.clearRect(0, 0, canvas.width, canvas.height);
        var x0 = canvas.width / 2,
            y0 = canvas.height / 2;
        var n = $('input#in').val();
        var d = $('input#id').val();
        var x = 0,
            y = 0;
        var x1 = 0,
            y1 = 0;
        var a = Math.min(x0, y0) * (0.01 + (counter * 0.01533)) - 10;

        cx.lineWidth = 8;
        cx.lineCap = 'round';
        cx.strokeStyle = '#21c615';
        cx.beginPath();
        cx.moveTo(canvas.width / 2, canvas.height / 2);
        cx.bezierCurveTo(
            canvas.width * .667, canvas.height * .625,
            canvas.width * .333, canvas.height * .875,
            canvas.width * .25, canvas.height
        );
        cx.stroke();
        cx.closePath();

        cx.lineWidth = 1;
        cx.strokeStyle = fillColor[counter - 1];
        for (var j = 0; j <= 3600; j++) {
            fi = (d * j) * Math.PI / 180;
            r = Math.sin(n * fi) * a;
            x = r * Math.cos(fi);
            y = r * Math.sin(fi);
            cx.beginPath();
            cx.moveTo(x1 + x0, y1 + y0);
            cx.lineTo(x + x0, y + y0);
            cx.lineCap = 'round';
            cx.stroke();
            cx.closePath();
            x1 = x;
            y1 = y;
        }

        cx.strokeStyle = lineColor[counter - 1];
        cx.lineWidth = 2;
        x1 = (a * Math.sin(n * Math.PI / 180)) * Math.cos(Math.PI / 180);
        y1 = (a * Math.sin(n * Math.PI / 180)) * Math.sin(Math.PI / 180);
        cx.beginPath();
        cx.moveTo(x1 + x0, y1 + y0);
        for (var i = 1; i <= 7200; i++) {
            fi = i * Math.PI / 180;
            ro = a * Math.sin(n * fi);
            x1 = ro * Math.cos(fi);
            y1 = ro * Math.sin(fi);
            cx.lineTo(x1 + x0, y1 + y0);
        }
        cx.stroke();
        cx.closePath();
    }

    function blossom(speed) {
        bloom();

        var petals = document.getElementById('in');
        petals.value = 0.1;

        var pv = parseFloat(petals.value);
        $('span#sn').text(pv);

        var interval = setInterval(function() {
            counter++;

            if (pv >= 2.4) {
                clearInterval(interval);
                return;
            }
            else if (pv == 0.95 || pv == 1.95) {
                petals.value = pv + 0.1;
            }
            else {
                petals.value = pv + 0.05;
            }

            pv = parseFloat(petals.value);
            $('span#sn').text(pv);
            bloom();
        }, speed);
    }

    $('input#in').on('change', function() {
        $('span#sn').text($(this).val());
        bloom();
    });

    $('input#id').on('change', function() {
        $('span#sd').text($(this).val());
        bloom();
    });

    $('input#maurer').on('change', function() {
        bloom();
    });

    $('input#rose').on('change', function() {
        if ($('input#rose').checked) {
            $('input#color').attr('disabled', false);
        } else {
            $('input#color').attr('disabled', true);
        }
        $('input#color').prop('disabled', !$('input#rose').prop('checked'));
        $('input#color').parent().toggleClass('disabled');
        $('input#color').parent().parent().toggleClass('disabled');
        bloom();
    });

    $('input#color').on('change', function() {
        bloom();
    });

    $('#reset').click(function() {
        $('input#in').val(2);
        $('span#sn').text(2);
        $('input[name="maurer"]').attr('checked', true);
        $('input#maurer').attr('checked', true);
        $('input#id').val(29);
        $('span#sd').text(29);
        $('input#color').attr('checked', false);
        $('input#color').attr('disabled', false);
        bloom();
    });

    blossom(300);
})(jQuery);
