// YOUTUBE STUFF //
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('shuffle-or-boogie', {
        width: '0',
        height: '0',
        videoId: 'BgOHKCks5hs',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': playThatAgain
        }
    });
}
function onPlayerReady(event) {
    event.target.playVideo();
}
function playThatAgain(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

$('#control-play').on('click', function() {
    player.playVideo();
});
$('#control-pause').on('click', function() {
    player.pauseVideo();
});
///////////////////

var maxCards = 5;
var cardList;        // card format = [owner (default is 0), card/jpg name, N, E, S, W, element (if applicable)]
var npcList = [];
$.ajax({
    url: '/config/cards2.json',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        cardList = data;
        $.each(Object.keys(cardList), function(index, theme) {
            var themeDeck = $(cardList).attr(theme);
            $.each(Object.keys(themeDeck), function(index2) {
                var npcCard = themeDeck[Object.keys(themeDeck)[index2]];
                npcList.push(Array(npcCard, theme));
            });
        });
    }
});
var board = [null, null, null, null, null, null, null, null, null];
var elementalBoard = [null, null, null, null, null, null, null, null, null];
var elementBoost = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        /*  board is arranged with these indicies: [0, 1, 2, 3, 4, 5, 6, 7, 8]
         *       [0][1][2]
         *       [3][4][5]
         *       [6][7][8]
         */
var p0hand = [];
var p1hand = [];
var p0deckSrc = [];
var p1deckSrc = [];
var score = [0, 0];
var show = false;
var suddenDeath = false;
var elemental = false;
var rules = 0;
var gameStart = false;
var turn;
var onDeck;
var thinking;
var selecting;
var cardsPlayed;
var record = [0, 0, 0];

(function($) {
    $('.pick-hand .card-list input').on('change', function() {
        if ($('.pick-hand .card-list input:checked').length > maxCards) {
            this.checked = false;
        }
    });

    $('.pick-hand button').on('click', function(e) {
        e.preventDefault();
        if (gameStart) {
            return false;
        }
        gameStart = true;
        if ($('.pick-hand .card-list input:checked').length !== maxCards) {
            return false;
        }
        else {
            var op1 = $('.game-op-1 input[type=radio]:checked').val();
            var op2 = $('.game-op-2 input[type=radio]:checked').val();
            suddenDeath = ($('.game-op-1 input[type=checkbox]:checked').length > 0) ? true : false;
            elemental = ($('.game-op-2 input[type=checkbox]:checked').length > 0) ? true: false;

            if (op1 == "closed") {
                show = false;
            }
            else if (op1 == "open") {
                show = true;
            }
            else {
                show = (Math.random() > 0.5 ? true : false);
            }

            if (op2 == "same") {
                rules = 1;
            }
            else if (op2 == "same wall") {
                rules = 2;
            }
            else if (op2 == "plus") {
                rules = 3;
            }
            else {
                rules = 0;
            }

            if (elemental) {
                var numElements = Math.floor(Math.random() * 9) + 1;
                var elemIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                var elements = ["earth", "fire", "holy", "ice", "poison", "shadow", "thunder", "water", "wind"];
                shuffle(elemIndices);

                for (var i = 0; i < numElements; i++) {
                    var randyIndex = elemIndices.pop();
                    var randyElement = Math.floor(Math.random() * 9);
                    elementalBoard[randyIndex] = elements[randyElement];
                    $('#card' + randyIndex).addClass("element");
                    switch (randyElement) {
                        case 0:
                            $('#card' + randyIndex).addClass("elem-earth");
                            break;
                        case 1:
                            $('#card' + randyIndex).addClass("elem-fire");
                            break;
                        case 2:
                            $('#card' + randyIndex).addClass("elem-holy");
                            break;
                        case 3:
                            $('#card' + randyIndex).addClass("elem-ice");
                            break;
                        case 4:
                            $('#card' + randyIndex).addClass("elem-poison");
                            break;
                        case 5:
                            $('#card' + randyIndex).addClass("elem-shadow");
                            break;
                        case 6:
                            $('#card' + randyIndex).addClass("elem-thunder");
                            break;
                        case 7:
                            $('#card' + randyIndex).addClass("elem-water");
                            break;
                        default:
                            $('#card' + randyIndex).addClass("elem-wind");
                            break;
                    }
                }
                debugElementalBoard();
            }

            $.each($('.pick-hand .card-list input:checked'), function(index, value) {
                var name = $(value).attr("value");
                var theme = $(value).attr("deck");
                p0deckSrc.push(theme);
                var tempDeck = $(cardList).attr(theme);
                var card = $(tempDeck).attr(name).slice(0);
                p0hand.push(card);
            });

            shuffle(npcList);

            for (var i = 0; i < maxCards; i++) {
                p1hand.push(npcList[i][0].slice(0));
                p1deckSrc.push(npcList[i][1].slice(0));
                p0hand[i][0] = 0;
                p1hand[i][0] = 1;
                placeCard($('#p0-deck .hand').eq(i), p0hand[i], p0deckSrc[i],  0);
                if (!show) {
                    $('#p1-deck .hand').eq(i).html('<img class="card-img" src="/img/cards/TTback.jpg"/>');
                }
                else {
                    placeCard($('#p1-deck .hand').eq(i), p1hand[i], p1deckSrc[i], 1);
                }
            }
            turn = Math.floor(Math.random() * 10) % 2;
            onDeck = null;
            thinking = false;
            selecting = false;
            cardsPlayed = [0, 0];

            $('.pick-hand').fadeOut("slow", function() {
                $('.game-container').fadeIn("slow");
                $('.pointer-container').fadeIn("slow");
                $('.what-else-floats').fadeIn("slow");
            });

            if (turn == 1) {
                $('.pointer').addClass('right');
                var pointTO = setTimeout(function() {
                    randomAI();
                }, 1250);

                $('#reset').on('click', function() {
                    clearTimeout(pointTO);
                });
            }
            else {
                $('.pointer').removeClass('right');
            }
        }
    });

    $(document).on('click', '#p0-deck .card-img:not(.used):not(.selected-l):not(.selected-r)', function() {
        selectCard(this);
    });

    $(document).on('click', '#tt .card:not(.set)', function() {
        if (turn % 2 == 1) {
            return false;
        }
        playCard(this, $('#p0-deck .selected-l:not(.used)').parent().attr("num"));
    });

    $('#reset').on('click', function() {
        if (!gameStart) {
            return false;
        }
        board = [null, null, null, null, null, null, null, null, null];
        elementalBoard = [null, null, null, null, null, null, null, null, null];
        elementBoost = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        p0hand = [];
        p1hand = [];
        p0deckSrc = [];
        p1deckSrc = [];
        score = [0, 0];
        cardsPlayed = [0, 0];
        thinking = false;
        onDeck = null;

        $('.card').removeClass('set');
        $('.card-img').removeClass('selected-l').removeClass('selected-r').removeClass('used');
        $('#tt td').empty();
        var k = 0;
        for (var i = 1; i <= 3; i++) {
            for (var j = 0; j < 3; j++) {
                $('#tt tr:nth-of-type(' + i + ') td').eq(j)
                    .html('<div id="card' + k + '" class="card">' +
                        '<div class="front"></div><div class="back"></div></div>');
                k++;
            }
        }
        $('.pointer-container').fadeOut("slow");
        $('.what-else-floats').fadeOut("slow");
        $('.game-container').fadeOut("slow", function() {
            $('.pick-hand').fadeIn("slow");
        });
        $('.sb-table th').eq(0).text(0);
        $('.sb-table th').eq(2).text(0);
        $('#msg span').text("");
        gameStart = false;
    });

    function selectCard(element) {
        var p = $(element).parent().attr("player");
        if (p != turn % 2) {
            return false;
        }
        else {
            if (p == 0) {
                $(element).addClass("selected-l");
                $('#p0-deck .card-img').not(element).removeClass("selected-l");
                onDeck = p0hand[$(element).parent().attr("num")].slice(0);
            }
            else {
                for (var i = 0; i < 5; i++) {
                    if (p1hand[i] != (null || undefined)) {
                    }
                }
                $(element).addClass("selected-r");
                $('#p1-deck .card-img').not(element).removeClass("selected-r");
                onDeck = p1hand[$(element).parent().attr("num")].slice(0);
                p1hand[$(element).parent().attr("num")] = null;
            }
        }
    }

    function playCard(element, handIndex) {
        if (onDeck == null) {
            return false;
        }
        else {
            var id = '#' + $(element).attr("id");
            var index = parseInt(id.charAt(5), 10);
            var p = turn % 2;
            placeCard(id + ' .front', onDeck, (p == 0 ? p0deckSrc[handIndex] : p1deckSrc[handIndex]), p);
            placeCard(id + ' .back', onDeck, (p == 0 ? p0deckSrc[handIndex] : p1deckSrc[handIndex]), (p + 1) % 2);
            $(id).flip({
                trigger: 'manual'
            });
            $(element).addClass('set');
            board[index] = onDeck;
            score[p]++;

            var attackMod = 0;
            if (elemental) {
                if (elementalBoard[index] != null) {
                    if (onDeck[6] == elementalBoard[index]) {
                        attackMod = 1;
                    }
                    else {
                        attackMod = -1;
                    }
                }
            }
            if (attackMod != 0) {
                $('#card' + index).append('<span>' + (attackMod > 0 ? "+" : "") + attackMod + '</span>');
                $('#card' + index + ' span').fadeIn('fast');
            }

            if (elemental) {
                if (elementalBoard[index] != null) {
                    if (elementalBoard[index] == onDeck[6]) {
                        elementBoost[index] = 1;
                    }
                    else {
                        elementBoost[index] = -1;
                    }
                }
            }

            if (p == 0) {
                $('#p0-deck .selected-l').addClass('used');
            }
            else {
                $('#p1-deck .selected-r').addClass('used');
            }

            if (rules == 0) {
                if ((index) % 3 != 0) {                        // Check west neighbor
                    var neighbor = board[index - 1];
                    if (neighbor != null) {
                        if ((onDeck[5] + elementBoost[index]) > (neighbor[3] + elementBoost[index - 1]) && onDeck[0] != neighbor[0]) {
                            $('#card' + (index - 1)).flip('toggle');
                            neighbor[0] = p;
                            score[p]++;
                            score[(p + 1) % 2]--;
                        }
                    }
                }
                if ((index + 1) % 3 != 0) {                    // Check east neighbor
                    var neighbor = board[index + 1];
                    if (neighbor != null) {
                        if ((onDeck[3] + elementBoost[index]) > (neighbor[5] + elementBoost[index + 1]) && onDeck[0] != neighbor[0]) {
                            $('#card' + (index + 1)).flip('toggle');
                            neighbor[0] = p;
                            score[p]++;
                            score[(p + 1) % 2]--;
                        }
                    }
                }
                if (index < 6) {                            // Check south neighbor
                    var neighbor = board[index + 3];
                    if (neighbor != null) {
                        if ((onDeck[4] + elementBoost[index]) > (neighbor[2] + elementBoost[index + 3]) && onDeck[0] != neighbor[0]) {
                            $('#card' + (index + 3)).flip('toggle');
                            neighbor[0] = p;
                            score[p]++;
                            score[(p + 1) % 2]--;
                        }
                    }
                }
                if (index > 2) {                            // Check north neighbor
                    var neighbor = board[index - 3];
                    if (neighbor != null) {
                        if ((onDeck[2] + elementBoost[index]) > (neighbor[4] + elementBoost[index - 3]) && onDeck[0] != neighbor[0]) {
                            $('#card' + (index - 3)).flip('toggle');
                            neighbor[0] = p;
                            score[p]++;
                            score[(p + 1) % 2]--;
                        }
                    }
                }
            }
            onDeck = null;
            turn++;
            cardsPlayed[p]++;
            $('.pointer').toggleClass('right');
            $('.sb-table th').eq(0).text(score[0]);
            $('.sb-table th').eq(2).text(score[1]);
            if (cardsPlayed[0] + cardsPlayed[1] === 9) {
                if (cardsPlayed[0] === score[0]) {
                    $('#msg span').text("It's a draw...");
                    record[2]++;
                }
                else if (score[0] > score[1]) {
                    $('#msg span').text("You win!");
                    record[0]++;
                }
                else {
                    $('#msg span').text("You lose!");
                    record[1]++;
                }

                $('#msg').fadeIn("slow");

                return;
            }
            if (turn % 2 == 1) {
                var aiTO = setTimeout(function() {
                    dumbAI();
                }, 250);

                $('#reset').on('click', function() {
                    clearTimeout(aiTO);
                });
            }
        }
    }

    function randomAI() {
        var randyHandy = Math.floor(Math.random() * 5);
        var selectTO = setTimeout(function() {
            selectCard($('#p1-deck .hand').eq(randyHandy).children());
        }, 800);
        var playTO = setTimeout(function() {
            playCard('#card' + Math.floor(Math.random() * 9), randyHandy);
        }, 1600);

        $('#reset').on('click', function() {
            clearTimeout(selectTO);
            clearTimeout(playTO);
        });
    }

    function dumbAI() {
        var max = 0;
        var current = 0;
        var boardIndex;
        var cardToPlay;

        for (var i = 0; i < 9; i++) {
            if (board[i] != null) {
                if (board[i][0] === 0) {
                    if (i % 3 != 0 && board[i - 1] == null) {
                        for (var j = 0; j < maxCards; j++) {
                            if (p1hand[j] != null) {
                                var elementalMod = checkElemental1(i - 1, j);
                                if (p1hand[j][3] + elementalMod > board[i][5] + checkElemental2(i)) {
                                    current = 1;
                                    if (board[i - 4] != (null || undefined)) {
                                        if (board[i - 4][0] === 0 && p1hand[j][2] + elementalMod > board[i - 4][4] + checkElemental2(i - 4)) {
                                            current++;
                                        }
                                    }
                                    if (board[i + 2] != (null || undefined)) {
                                        if (board[i + 2][0] === 0 && p1hand[j][4] + elementalMod > board[i + 2][2] + checkElemental2(i + 2)) {
                                            current++;
                                        }
                                    }
                                    if ((i - 2) % 3 == 0 && board[i - 2] != (null || undefined)) {
                                        if (board[i - 2][0] === 0 && p1hand[j][5] + elementalMod > board[i - 2][3] + checkElemental2(i - 2)) {
                                            current++;
                                        }
                                    }
                                }
                                if (current > max) {
                                    cardToPlay = j;
                                    boardIndex = i - 1;
                                    max = current;
                                }
                                if (current == max) {
                                    if (max == 0) {
                                        cardToPlay = j;
                                        boardIndex = i - 1;
                                    }
                                    else {
                                        var boardEMod = checkElemental1(boardIndex, cardToPlay);
                                        var currentSum = p1hand[cardToPlay][2] + p1hand[cardToPlay][3] + p1hand[cardToPlay][4] + p1hand[cardToPlay][5] + (4 * boardEMod);
                                        var newSum = p1hand[j][2] + p1hand[j][3] + p1hand[j][4] + p1hand[j][5] + (4 * elementalMod);

                                        if (newSum > currentSum) {
                                            cardToPlay = j;
                                            boardIndex = i - 1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if ((i + 1) % 3 != 0 && board[i + 1] == null) {
                        for (var j = 0; j < maxCards; j++) {
                            if (p1hand[j] != null) {
                                elementalMod = checkElemental1(i + 1, j);
                                if (p1hand[j][5] + elementalMod > board[i][3] + checkElemental2(i)) {
                                    current = 1;
                                    if (board[i - 2] != (null || undefined)) {
                                        if (board[i - 2][0] === 0 && p1hand[j][2] + elementalMod > board[i - 2][4] + checkElemental2(i - 2)) {
                                            current++;
                                        }
                                    }
                                    if (board[i + 4] != (null || undefined)) {
                                        if (board[i + 4][0] === 0 && p1hand[j][4] + elementalMod > board[i + 4][2] + checkElemental2(i + 4)) {
                                            current++;
                                        }
                                    }
                                    if (i % 3 == 0 && board[i + 2] != (null || undefined)) {
                                        if (board[i + 2][0] === 0 && p1hand[j][3] + elementalMod > board[i + 2][5] + checkElemental2(i + 2)) {
                                            current++;
                                        }
                                    }
                                }
                                if (current > max) {
                                    cardToPlay = j;
                                    boardIndex = i + 1;
                                    max = current;
                                }
                                if (current == max) {
                                    if (max == 0) {
                                        cardToPlay = j;
                                        boardIndex = i + 1;
                                    }
                                    else {
                                        var boardEMod = checkElemental1(boardIndex, cardToPlay);
                                        var currentSum = p1hand[cardToPlay][2] + p1hand[cardToPlay][3] + p1hand[cardToPlay][4] + p1hand[cardToPlay][5] + (4 * boardEMod);
                                        var newSum = p1hand[j][2] + p1hand[j][3] + p1hand[j][4] + p1hand[j][5] + (4 * elementalMod);

                                        if (newSum > currentSum) {
                                            cardToPlay = j;
                                            boardIndex = i + 1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (i > 2 && board[i - 3] == null) {
                        for (var j = 0; j < maxCards; j++) {
                            if (p1hand[j] != null) {
                                elementalMod = checkElemental1(i - 3, j);
                                if (p1hand[j][4] + elementalMod > board[i][2] + checkElemental2(i)) {
                                    current = 1;
                                    if (board[i - 6] != (null || undefined)) {
                                        if (board[i - 6][0] === 0 && p1hand[j][2] + elementalMod > board[i - 6][4] + checkElemental2(i - 6)) {
                                            current++;
                                        }
                                    }
                                    if ((i - 1) % 3 != 0 && board[i - 4] != (null || undefined)) {
                                        if (board[i - 4][0] === 0 && p1hand[j][5] + elementalMod > board[i - 4][3] + checkElemental2(i - 4)) {
                                            current++;
                                        }
                                    }
                                    if ((i + 1) % 3 != 0 && board[i - 2] != (null || undefined)) {
                                        if (board[i - 2][0] === 0 && p1hand[j][3] + elementalMod > board[i - 2][5] + checkElemental2(i - 2)) {
                                            current++;
                                        }
                                    }
                                }
                                if (current > max) {
                                    cardToPlay = j;
                                    boardIndex = i - 3;
                                    max = current;
                                }
                                if (current == max) {
                                    if (max == 0) {
                                        cardToPlay = j;
                                        boardIndex = i - 3;
                                    }
                                    else {
                                        var boardEMod = checkElemental1(boardIndex, cardToPlay);
                                        var currentSum = p1hand[cardToPlay][2] + p1hand[cardToPlay][3] + p1hand[cardToPlay][4] + p1hand[cardToPlay][5] + (4 * boardEMod);
                                        var newSum = p1hand[j][2] + p1hand[j][3] + p1hand[j][4] + p1hand[j][5] + (4 * elementalMod);

                                        if (newSum > currentSum) {
                                            cardToPlay = j;
                                            boardIndex = i - 3;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (i < 6 && board[i + 3] == null) {
                        for (var j = 0; j < maxCards; j++) {
                            if (p1hand[j] != null) {
                                elementalMod = checkElemental1(i + 3, j);
                                if (p1hand[j][2] + elementalMod > board[i][4] + checkElemental2(i)) {
                                    current = 1;
                                    if (board[i + 6] != (null || undefined)) {
                                        if (board[i + 6][0] === 0 && p1hand[j][4] > board[i + 6][2] + checkElemental2(i + 6)) {
                                            current++;
                                        }
                                    }
                                    if ((i - 1) % 3 != 0 && board[i + 2] != (null || undefined)) {
                                        if (board[i + 2][0] === 0 && p1hand[j][5] > board[i + 2][3] + checkElemental2(i + 2)) {
                                            current++;
                                        }
                                    }
                                    if ((i + 1) % 3 != 0 && board[i + 4] != (null || undefined)) {
                                        if (board[i + 4][0] === 0 && p1hand[j][3] > board[i + 4][5] + checkElemental2(i + 4)) {
                                            current++;
                                        }
                                    }
                                }
                                if (current > max) {
                                    cardToPlay = j;
                                    boardIndex = i + 3;
                                    max = current;
                                }
                                if (current == max) {
                                    if (max == 0) {
                                        cardToPlay = j;
                                        boardIndex = i + 3;
                                    }
                                    else {
                                        var boardEMod = checkElemental1(boardIndex, cardToPlay);
                                        var currentSum = p1hand[cardToPlay][2] + p1hand[cardToPlay][3] + p1hand[cardToPlay][4] + p1hand[cardToPlay][5] + (4 * boardEMod);
                                        var newSum = p1hand[j][2] + p1hand[j][3] + p1hand[j][4] + p1hand[j][5] + (4 * elementalMod);

                                        if (newSum > currentSum) {
                                            cardToPlay = j;
                                            boardIndex = i + 3;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        var aiSelectTO = setTimeout(function() {
            selectCard($('#p1-deck .hand').eq(cardToPlay).children());
        }, 800);
        var aiPlayTO = setTimeout(function() {
            playCard('#card' + boardIndex, cardToPlay);
        }, 1600);

        $('#reset').on('click', function() {
            clearTimeout(aiSelectTO);
            clearTimeout(aiPlayTO);
        });

        function checkElemental1(moddedI, handI) {
            if (elemental) {
                if (elementalBoard[moddedI] != null) {
                    return ((p1hand[handI][6] == elementalBoard[moddedI]) ? 1 : -1);
                }
            }
            return 0;
        }

        function checkElemental2(boardI) {
            if (elemental) {
                if (elementalBoard[boardI] != null) {
                    return ((board[boardI][6] == elementalBoard[boardI]) ? 1 : -1);
                }
            }
            return 0;
        }
    }

    function placeCard(place, card, theme, owner) {
        $(place).html('<img class="card-img" src="/img/cards/' + theme + '/' + ((owner === 0) ? "" : "r") +
            card[1] + '.jpg"/>');
    }

    var cheat = false;

    $(window).konami();
    $(window).on('konami', function() {
        if (gameStart && !show && !cheat && !thinking) {
            cheat = true;
            for (var i = 0; i < 5; i++) {
                if (p1hand[i] != null) {
                    $('#p1-deck .hand').eq(i).fadeOut("fast", function() {
                        var n = parseInt($(this).attr("num"), 10);
                        placeCard($('#p1-deck .hand').eq(n), p1hand[n], p1deckSrc[n], 1);
                        $('#p1-deck .hand').eq(n).fadeIn("fast");
                    });
                }
            }
        }
    });
})(jQuery);

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
/*                No music for copyright reasons
var songNumber;
var songList = [9, 10, 13];

function playMusic() {
    if (songNumber == undefined) {
        shuffle(songList);
        songNumber = songList.pop();
    }
    else if (songList.length > 0) {
        songNumber = songList.pop();
    }
    else {
        songList = [8, 9, 10, 13];
        shuffle(songList);
        songNumber = songList.pop();
    }

    $('audio').attr('src', "music/" + songNumber + ".mp3").get(0).play();
}
*/
function debugBoard() {
    console.log((board[0] == null ? "[-]" : "[X]") + (board[1] == null ? "[-]" : "[X]") + (board[2] == null ? "[-]" : "[X]\n"));
    console.log((board[3] == null ? "[-]" : "[X]") + (board[4] == null ? "[-]" : "[X]") + (board[5] == null ? "[-]" : "[X]\n"));
    console.log((board[6] == null ? "[-]" : "[X]") + (board[7] == null ? "[-]" : "[X]") + (board[8] == null ? "[-]" : "[X]\n"));
}

function debugElementalBoard() {
    console.log((elementalBoard[0] == null ? "[none]" : ("[" + elementalBoard[0].substring(0, 4) + "]")) + (elementalBoard[1] == null ? "[none]" : ("[" + elementalBoard[1].substring(0, 4) + "]")) + (elementalBoard[2] == null ? "[none]" : ("[" + elementalBoard[2].substring(0, 4) + "]")));
    console.log((elementalBoard[3] == null ? "[none]" : ("[" + elementalBoard[3].substring(0, 4) + "]")) + (elementalBoard[4] == null ? "[none]" : ("[" + elementalBoard[4].substring(0, 4) + "]")) + (elementalBoard[5] == null ? "[none]" : ("[" + elementalBoard[5].substring(0, 4) + "]")));
    console.log((elementalBoard[6] == null ? "[none]" : ("[" + elementalBoard[6].substring(0, 4) + "]")) + (elementalBoard[7] == null ? "[none]" : ("[" + elementalBoard[7].substring(0, 4) + "]")) + (elementalBoard[8] == null ? "[none]" : ("[" + elementalBoard[8].substring(0, 4) + "]")));
}

function debugHand() {
    console.log(((p1hand[0] == null) ? "" : (p1hand[0][1] + ", ")) + ((p1hand[1] == null) ? "" : (p1hand[1][1] + ", ")) +
        ((p1hand[2] == null) ? "" : (p1hand[2][1] + ", ")) + ((p1hand[3] == null) ? "" : (p1hand[3][1] + ", ")) +
        ((p1hand[4] == null) ? "" : (p1hand[4][1] + ", ")));
}

function debugRecord() {
    console.log(record[0] + "-" + record[1] + "-" + record[2]);
}

function debugDeckSource(p) {
    if (p === 0) {
        console.log(p0deckSrc[0] + ", " + p0deckSrc[1] + ", " + p0deckSrc[2] + ", " + p0deckSrc[3] + ", " + p0deckSrc[4]);
    }
    else {
        console.log(p1deckSrc[0] + ", " + p1deckSrc[1] + ", " + p1deckSrc[2] + ", " + p1deckSrc[3] + ", " + p1deckSrc[4]);
    }
}
