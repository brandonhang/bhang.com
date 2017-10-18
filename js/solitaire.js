var SUITS = 4;
var RANKS = 13;

function Card(suitInt, rankInt) {
    switch (suitInt) {
        case 0:
            this.suit = 'Clubs';
            this.suitSymbol = '&clubs;';
            break;
        case 1:
            this.suit = 'Diamonds';
            this.suitSymbol = '&diams;';
            break;
        case 2:
            this.suit = 'Hearts';
            this.suitSymbol = '&hearts;';
            break;
        case 3:
            this.suit = 'Spades';
            this.suitSymbol = '&spades;';
            break;
        default:
            this.suit = 'Joker';
            this.suitSymbol = '&Jfr;'
            break;
    }
    switch (rankInt) {
        case 1:
            this.rank = 'Ace';
            this.value = 14;
            this.rankSymbol = 'A';
            break;
        case 2:
            this.rank = 'Two';
            this.value = 2;
            this.rankSymbol = '2';
            break;
        case 3:
            this.rank = 'Three';
            this.value = 3;
            this.rankSymbol = '3';
            break;
        case 4:
            this.rank = 'Four';
            this.value = 4;
            this.rankSymbol = '4';
            break;
        case 5:
            this.rank = 'Five';
            this.value = 5;
            this.rankSymbol = '5';
            break;
        case 6:
            this.rank = 'Six';
            this.value = 6;
            this.rankSymbol = '6';
            break;
        case 7:
            this.rank = 'Seven';
            this.value = 7;
            this.rankSymbol = '7';
            break;
        case 8:
            this.rank = 'Eight';
            this.value = 8;
            this.rankSymbol = '8';
            break;
        case 9:
            this.rank = 'Nine';
            this.value = 9;
            this.rankSymbol = '9';
            break;
        case 10:
            this.rank = 'Ten';
            this.value = 10;
            this.rankSymbol = '10';
            break;
        case 11:
            this.rank = 'Jack';
            this.value = 11;
            this.rankSymbol = 'J';
            break;
        case 12:
            this.rank = 'Queen';
            this.value = 12;
            this.rankSymbol = 'Q';
            break;
        case 13:
            this.rank = 'King';
            this.value = 13;
            this.rankSymbol = 'K';
            break;
        default:
            this.rank = 'Joker';
            this.value = 15;
            this.rankSymbol = '&Jfr;';
            break;
    }
}
Card.prototype.toString = function() {
    if (this.rank === 'Joker' || this.suit === 'Joker') {
        return 'Joker';
    }
    else {
        return this.rank + ' of ' + this.suit;
    }
}
Card.prototype.abbreviate = function() {
    if (this.rank === 'Joker' || this.suit === 'Joker') {
        return this.rankSymbol;
    }
    else {
        return this.rankSymbol + this.suitSymbol;
    }
}

function Deck() {
    this.cards = [];
}
Deck.prototype.initialize = function() {
    for (i = 0; i < 4; i++) {
        for (j = 1; j < 14; j++) {
            var card = new Card(i, j);
            this.cards.push(card);
        }
    }
}
Deck.prototype.shuffle = function() {
    for (i = this.cards.length - 1; i > 0; i--) {
        var randy = Math.floor(Math.random() * i);
        var savedCard = this.cards[i];
        this.cards[i] = this.cards[randy];
        this.cards[randy] = savedCard;
    }
}
Deck.prototype.reset = function() {
    this.initialize();
    this.shuffle();
}
Deck.prototype.size = function() {
    return this.cards.length;
}
Deck.prototype.isEmpty = function() {
    return this.size() === 0;
}
Deck.prototype.draw = function(num) {
    var drawn = [];

    if (!isNaN(num)) {
        if (num % 1 === 0 && num > 0) {
            var i = 0;

            while (i < num && !this.isEmpty()) {
                drawn.push(this.cards.pop());
                i++;
            }
        }
    }

    return drawn;
}

var win = false;
var deck;
var cardPile, discardPile;
var clubs, diamonds, hearts, spades;
var slots;

var cardPilePos = $('#card-pile').position();
var nextCardPos = $('#next-card').position();
var clubsPos = $('#clubs-stack').position();
var diamondsPos = $('#diamonds-stack').position();
var heartsPos = $('#hearts-stack').position();
var spadesPos = $('#spades-stack').position();

function newGame() {
    win = false;
    cardPile = [];
    discardPile = [];
    clubs = [], diamonds = [], hearts = [], spades = [];
    slots = [ [], [], [], [], [], [], [] ]
    deck = new Deck();
    deck.reset();

    for (var i = 0; i < 3; i++) {
        deck.shuffle();
    }

    for (var i = 0; i < 7; i++) {
        for (var j = 0; j <= i; j++) {
            slots[i].push(deck.cards.pop());
        }
    }

    while (!deck.isEmpty()) {
        cardPile.push(deck.cards.pop());
    }

    initializeView();
    stopTimer();
    resetTime();
    timer();
}

var seconds, minutes, hours;
var clock;

function addTime() {
    seconds++;

    if (seconds >= 60) {
        minutes++;
        seconds = 0;

        $('#minutes').text((minutes < 10 ? '0' : '') + minutes);

        if (minutes >= 60) {
            hours++;
            minutes = 0;

            $('#hours').text(hours);
        }
    }

    $('#seconds').text((seconds < 10 ? '0' : '') + seconds);

    timer();
}

function timer() {
    clock = setTimeout(function() {
        addTime();
    }, 1000);
}

function stopTimer() {
    clearTimeout(clock);
}

function resetTime() {
    seconds = 0;
    minutes = 0;
    hours = 0;
    $('#seconds').text('00');
    $('#minutes').text('00');
    $('#hours').text('0');
}

/******************************************************************/
/******************************************************************/

function initializeView() {
    $('.patience td.stack, .patience td.slot').empty()
        .append('<div class="outline"></div>');
    $('#clubs-stack .outline').addClass('black-fade').html('&clubs;');
    $('#diamonds-stack .outline').addClass('red-fade').html('&diams;');
    $('#hearts-stack .outline').addClass('red-fade').html('&hearts;');
    $('#spades-stack .outline').addClass('black-fade').html('&spades;');

    $.each(cardPile, function(index, card) {
        var abbr = card.abbreviate();
        var modAbbr = abbr.slice(0, abbr.indexOf('&')) + '<br/>' +
            abbr.slice(abbr.indexOf('&'));
        var color = card.suit == 'Diamonds' || card.suit == 'Hearts';
        var front =
            '<div class="front ' + (color ? 'red' : 'black') + '">' +
                '<span class="ul">' + modAbbr + '</span>' +
                '<span class="lr">' + modAbbr + '</span>' +
            '</div>';
        var back = '<div class="back"></div>';

        $('#card-pile').append(
            '<div class="card face-down">' + back + front + '</div>'
        );
    });

    for (var i = 0; i < 7; i++) {
        $.each(slots[i], function(index, card) {
            var abbr = card.abbreviate();
            var modAbbr = abbr.slice(0, abbr.indexOf('&')) + '<br/>' +
                abbr.slice(abbr.indexOf('&'));
            var color = card.suit == 'Diamonds' || card.suit == 'Hearts';
            var front =
                '<div class="front ' + (color ? 'red' : 'black') + '">' +
                    '<span class="ul">' + modAbbr + '</span>' +
                    '<span class="lr">' + modAbbr + '</span>' +
                '</div>';
            var back = '<div class="back"></div>';

            if (index < slots[i].length - 1) {
                $('#slot-' + i).append(
                    '<div class="card face-down" pos="' + index + '">' +
                        back + front +
                    '</div>'
                );
            }
            else {
                $('#slot-' + i).append(
                    '<div class="card face-up" pos="' + index + '">' +
                        front +
                    '</div>'
                );
            }
        });
    }

    $('.top-shelf .card.face-down').flip({
        trigger: 'manual',
        axis: 'y',
        speed: 150,
        front: '.back',
        back: '.front'
    });

    $('.bottom-shelf .card.face-down').flip({
        trigger: 'manual',
        axis: 'x',
        speed: 150,
        front: '.back',
        back: '.front'
    });
}

var firstClick = true, fromPile = false, fromFinish = false;
var index, slot, card, cardValue, cardColor, cardStack;

// Get next card in card pile
$(document).on('click', '#card-pile .card:last-of-type', function() {
    var diff = nextCardPos.left - cardPilePos.left;
    var leftArg = '+=' + diff + 'px';

    discardPile.push(cardPile.pop());
    $(this).flip('toggle').css({'z-index': 9001}).animate({
        left: leftArg
    }, {
        easing: 'linear',
        duration: 150,
        complete: function() {
            $(this).detach()
                .css({left: '', 'z-index': ''})
                .appendTo('#next-card');
        }
    });
});

// Reset card pile
$(document).on('click', '#card-pile .outline', function() {
    var diff = nextCardPos.left - cardPilePos.left;
    var leftArg = '-=' + diff + 'px';
    var cards = $('#next-card .card');

    function flipper(index) {
        cardPile.push(discardPile.pop());
        $(cards[index]).flip('toggle').css({'z-index': 9001 - index}).animate({
            left: leftArg
        }, {
            easeing: 'linear',
            duration: 150,
            complete: function() {
                $(cards[index]).detach()
                    .css({left: '', 'z-index': ''})
                    .appendTo('#card-pile');
            }
        });

        if (index > 0) {
            nextFlip(index - 1);
        }
    }

    function nextFlip(index) {
        setTimeout(function() {
            flipper(index);
        }, 15);
    }

    if (cards.length > 0) {
        flipper(cards.length - 1);
    }
});

// Reveal face-down cards on bottom stacks
$(document).on('click', '.bottom-shelf .card.face-down:last-of-type:not(.revealed)', function() {
    $(this).addClass('revealed').flip('toggle', function() {
        $(this).removeClass('face-down revealed').addClass('face-up');
    });
});

// Double click the discard pile card to add to the finish pile
$(document).on('dblclick', '#next-card', function() {
    var cardElement = $(this).find('.card:last-of-type');

    card = discardPile[discardPile.length - 1];
    cardValue = card.value === 14 ? 1 : card.value;

    var topCard, topCardVal;

    switch (card.suit.toLowerCase()) {
        case 'clubs':
            topCard = clubs[clubs.length - 1];
            break;
        case 'diamonds':
            topCard = diamonds[diamonds.length - 1];
            break;
        case 'hearts':
            topCard = hearts[hearts.length - 1];
            break;
        default:
            topCard = spades[spades.length - 1];
            break;
    }

    topCardVal = (topCard == undefined ? 0 :
        (topCard.value === 14 ? 1 : topCard.value));

    if (cardValue === topCardVal + 1) {
        var cardPos = $(cardElement).offset();

        switch (card.suit.toLowerCase()) {
            case 'clubs':
                var xDiff = clubsPos.left - cardPos.left;

                clubs.push(discardPile.pop());
                $(cardElement).css({'z-index': 10000}).animate({
                    left: '+=' + xDiff + 'px'
                }, {
                    easing: 'linear',
                    duration: 250,
                    complete: function() {
                        $(cardElement).detach()
                            .css({left: '', 'z-index': ''})
                            .appendTo('#clubs-stack')
                            .removeClass('face-down').addClass('face-up');
                    }
                });
                break;
            case 'diamonds':
                var xDiff = diamondsPos.left - cardPos.left;

                diamonds.push(discardPile.pop());
                $(cardElement).css({'z-index': 10000}).animate({
                    left: '+=' + xDiff + 'px'
                }, {
                    easing: 'linear',
                    duration: 250,
                    complete: function() {
                        $(cardElement).detach()
                            .css({left: '', 'z-index': ''})
                            .appendTo('#diamonds-stack')
                            .removeClass('face-down').addClass('face-up');
                    }
                });
                break;
            case 'hearts':
                var xDiff = heartsPos.left - cardPos.left;

                hearts.push(discardPile.pop());
                $(cardElement).css({'z-index': 10000}).animate({
                    left: '+=' + xDiff + 'px'
                }, {
                    easing: 'linear',
                    duration: 250,
                    complete: function() {
                        $(cardElement).detach()
                            .css({left: '', 'z-index': ''})
                            .appendTo('#hearts-stack')
                            .removeClass('face-down').addClass('face-up');
                    }
                });
                break;
            default:
                var xDiff = spadesPos.left - cardPos.left;

                spades.push(discardPile.pop());
                $(cardElement).css({'z-index': 10000}).animate({
                    left: '+=' + xDiff + 'px'
                }, {
                    easing: 'linear',
                    duration: 250,
                    complete: function() {
                        $(cardElement).detach()
                            .css({left: '', 'z-index': ''})
                            .appendTo('#spades-stack')
                            .removeClass('face-down').addClass('face-up');
                    }
                });
                break;
        }
    }

    if (!win) {
        checkForWin();
    }
});

// Click the last card in a stack to add to the finish pile
$(document).on('dblclick', '.slot', function(event) {
    var cardElement = $(this).find('.card:last-of-type');

    index = $(cardElement).index() - 1;
    slot = $(this).attr('id').charAt(5);
    card = slots[slot][index];
    cardValue = card.value === 14 ? 1 : card.value;

    var topCard, topCardVal;

    switch (card.suit.toLowerCase()) {
        case 'clubs':
            topCard = clubs[clubs.length - 1];
            break;
        case 'diamonds':
            topCard = diamonds[diamonds.length - 1];
            break;
        case 'hearts':
            topCard = hearts[hearts.length - 1];
            break;
        default:
            topCard = spades[spades.length - 1];
            break;
    }

    topCardVal = (topCard == undefined ? 0 :
        (topCard.value === 14 ? 1 : topCard.value));

    if (cardValue === topCardVal + 1) {
        var cardPos = $(cardElement).offset();

        switch (card.suit.toLowerCase()) {
            case 'clubs':
                var xDiff = clubsPos.left - cardPos.left;
                var yDiff = clubsPos.top - cardPos.top;

                clubs.push(slots[slot].pop());
                $(cardElement).css({'z-index': 10000}).animate({
                    left: '+=' + xDiff + 'px',
                    top: '+=' + yDiff + 'px'
                }, {
                    easing: 'linear',
                    duration: 250,
                    complete: function() {
                        $(cardElement).detach()
                            .css({left: '', top: '', 'z-index': ''})
                            .appendTo('#clubs-stack');
                    }
                });
                break;
            case 'diamonds':
                var xDiff = diamondsPos.left - cardPos.left;
                var yDiff = diamondsPos.top - cardPos.top;

                diamonds.push(slots[slot].pop());
                $(cardElement).css({'z-index': 10000}).animate({
                    left: '+=' + xDiff + 'px',
                    top: '+=' + yDiff + 'px'
                }, {
                    easing: 'linear',
                    duration: 250,
                    complete: function() {
                        $(cardElement).detach()
                            .css({left: '', top: '', 'z-index': ''})
                            .appendTo('#diamonds-stack');
                    }
                });
                break;
            case 'hearts':
                var xDiff = heartsPos.left - cardPos.left;
                var yDiff = heartsPos.top - cardPos.top;

                hearts.push(slots[slot].pop());
                $(cardElement).css({'z-index': 10000}).animate({
                    left: '+=' + xDiff + 'px',
                    top: '+=' + yDiff + 'px'
                }, {
                    easing: 'linear',
                    duration: 250,
                    complete: function() {
                        $(cardElement).detach()
                            .css({left: '', top: '', 'z-index': ''})
                            .appendTo('#hearts-stack');
                    }
                });
                break;
            default:
                var xDiff = spadesPos.left - cardPos.left;
                var yDiff = spadesPos.top - cardPos.top;

                spades.push(slots[slot].pop());
                $(cardElement).css({'z-index': 10000}).animate({
                    left: '+=' + xDiff + 'px',
                    top: '+=' + yDiff + 'px'
                }, {
                    easing: 'linear',
                    duration: 250,
                    complete: function() {
                        $(cardElement).detach()
                            .css({left: '', top: '', 'z-index': ''})
                            .appendTo('#spades-stack');
                    }
                });
                break;
        }
    }
});

// Mousedown event to move stacks around
$(document).on('mousedown', function(event) {
    var element = $(event.target).closest('.card')[0];

    if (element != undefined) {
        // Moving bottom-shelf stacks
        if ($(element).is('.bottom-shelf .card.face-up')) {
            index = $(element).index() - 1;
            slot = $(element).parent().attr('id').charAt(5);
            card = slots[slot][index];
            cardValue = card.value === 14 ? 1 : card.value;
            cardColor = card.suit == 'Diamonds' || card.suit == 'Hearts';
            cardStack = $('#slot-' + slot + ' .card').slice(index);

            $('.bottom-shelf').addClass('highlight');
            $(cardStack).addClass('selected').css({'z-index': '+=1000px'});

            $(document).on('mousemove', function(event) {
                for (var i = 0; i < cardStack.length; i++) {
                    $(cardStack[i]).offset({
                        top: event.pageY + (i * 20),
                        left: event.pageX - 47.5
                    });
                }
            });
        }
        // Moving discard pile card
        else if ($(element).is('#next-card .card')) {
            fromPile = true;
            index = discardPile.length - 1;
            card = discardPile[index];
            cardValue = card.value === 14 ? 1 : card.value;
            cardColor = card.suit == 'Diamonds' || card.suit == 'Hearts';
            cardStack = $('#next-card .card:last-of-type');

            $('.bottom-shelf').addClass('highlight');
            $(cardStack).addClass('selected').css({'z-index': '+=1000px'});

            $(document).on('mousemove', function(event) {
                for (var i = 0; i < cardStack.length; i++) {
                    $(cardStack[i]).offset({
                        top: event.pageY + (i * 20),
                        left: event.pageX - 47.5
                    });
                }
            });
        }
        // Moving finish pile card
        else if ($(element).is('.finish .card')) {
            var stackSuit = $(element).closest('.finish')
                .attr('id')
                .replace('-stack', '');

            fromFinish = true;
            card = (function() {
                switch (stackSuit) {
                    case 'clubs':
                        return clubs[clubs.length - 1];
                    case 'diamonds':
                        return diamonds[diamonds.length - 1];
                    case 'hearts':
                        return hearts[hearts.length - 1];
                    default:
                        return spades[spades.length - 1];
                }
            })();
            cardValue = card.value === 14 ? 1 : card.value;
            cardColor = card.suit == 'Diamonds' || card.suit == 'Hearts';
            cardStack = $('#' + stackSuit + '-stack .card:last-of-type');

            $('.bottom-shelf').addClass('highlight');
            $(cardStack).addClass('selected').css({'z-index': '+=1000px'});

            $(document).on('mousemove', function(event) {
                for (var i = 0; i < cardStack.length; i++) {
                    $(cardStack[i]).offset({
                        top: event.pageY + (i * 20),
                        left: event.pageX - 47.5
                    });
                }
            });
        }
    }
});

// Mouseup event to place stacks
$(document).on('mouseup', function(event) {
    var element = $(event.target).closest('.card')[0];
    var finishStack = $(event.target).closest('.finish')[0];
    var openSlotElem = $(event.target).closest('.slot')[0];

    // Move cards to stacks
    if (element != undefined) {
        if ($(element).is('.slot .card:last-of-type')) {
            var destIndex = $(element).index() - 1;
            var destSlot = $(element).parent().attr('id').charAt(5);
            var destCard = slots[destSlot][destIndex];
            var destCardValue = destCard.value === 14 ? 1 : destCard.value;
            var destCardColor = destCard.suit == 'Diamonds' || destCard.suit == 'Hearts';

            if (cardValue === destCardValue - 1 && cardColor != destCardColor) {
                $(cardStack).detach()
                    .appendTo('#slot-' + destSlot);
                reformatSlot(destSlot);

                // Add discard pile card to stack
                if (fromPile) {
                    $(cardStack).removeClass('face-down')
                        .addClass('face-up');
                    slots[destSlot].push(discardPile.pop());
                }
                // Move finish pile card back to stack
                else if (fromFinish) {
                    switch (card.suit) {
                        case 'Clubs':
                            slots[destSlot].push(clubs.pop());
                            break;
                        case 'Diamonds':
                            slots[destSlot].push(diamonds.pop());
                            break;
                        case 'Hearts':
                            slots[destSlot].push(hearts.pop());
                            break;
                        default:
                            slots[destSlot].push(spades.pop());
                            break;
                    }
                }
                // Modify to and from stacks
                else {
                    var cardsToMove = slots[slot].slice(index);

                    slots[slot] = slots[slot].slice(0, index);
                    slots[destSlot] = slots[destSlot].concat(cardsToMove);
                }
            }
        }
    }
    // Move cards to finish piles
    else if (finishStack != undefined) {
        if (cardStack.length === 1) {
            var suitStack = $(finishStack).attr('id').replace('-stack', '');
            var topStackCard = (function() {
                switch (suitStack) {
                    case 'clubs':
                        return clubs[clubs.length - 1];
                    case 'diamonds':
                        return diamonds[diamonds.length - 1];
                    case 'hearts':
                        return hearts[hearts.length - 1];
                    default:
                        return spades[spades.length - 1];
                }
            })();
            var topStackCardVal = (topStackCard == undefined ? 0 :
                (topStackCard.value === 14 ? 1 : topStackCard.value));

            if (cardValue === topStackCardVal + 1 &&
                    card.suit.toLowerCase() == suitStack) {
                $(cardStack).detach()
                    .appendTo('#' + suitStack + '-stack');

                // Card is from discard pile
                if (fromPile) {
                    switch (suitStack) {
                        case 'clubs':
                            clubs.push(discardPile.pop());
                            break;
                        case 'diamonds':
                            diamonds.push(discardPile.pop());
                            break;
                        case 'hearts':
                            hearts.push(discardPile.pop());
                            break;
                        default:
                            spades.push(discardPile.pop());
                            break;
                    }
                }
                // Card is from stacks
                else if (!fromFinish) {
                    switch (suitStack) {
                        case 'clubs':
                            clubs.push(slots[slot].pop());
                            break;
                        case 'diamonds':
                            diamonds.push(slots[slot].pop());
                            break;
                        case 'hearts':
                            hearts.push(slots[slot].pop());
                            break;
                        default:
                            spades.push(slots[slot].pop());
                            break;
                    }
                }
            }
        }
    }
    // Moving a king to an open spot
    else if (openSlotElem != undefined) {
        var openSlot = $(openSlotElem).closest('.slot').attr('id').charAt(5);

        if (slots[openSlot].length === 0 && card.rank == 'King') {
            $(cardStack).detach()
                .removeClass('face-down')
                .addClass('face-up')
                .appendTo('#slot-' + openSlot);
            reformatSlot(openSlot);

            if (fromPile) {
                slots[openSlot].push(discardPile.pop());
            }
            else if (fromFinish) {
                switch (card.suit) {
                    case 'Clubs':
                        slots[openSlot].push(clubs.pop());
                        break;
                    case 'Diamonds':
                        slots[openSlot].push(diamonds.pop());
                        break;
                    case 'Hearts':
                        slots[openSlot].push(hearts.pop());
                        break;
                    default:
                        slots[openSlot].push(spades.pop());
                        break;
                }
            }
            else {
                var cardsToMove = slots[slot].slice(index);

                slots[slot] = slots[slot].slice(0, index);
                slots[openSlot] = slots[openSlot].concat(cardsToMove);
            }
        }
    }

    fromPile = false;
    fromFinish = false;
    index = undefined;
    slot = undefined;
    card = undefined;
    cardValue = undefined;
    cardColor = undefined;
    $(document).unbind('mousemove');
    $('.bottom-shelf').removeClass('highlight');
    $(cardStack).removeClass('selected');
    $(cardStack).css({left: '', top: '', 'z-index': '-=1000px'});
    cardStack = undefined;

    if (!$(event.target).is('button') && !win) {
        checkForWin();
    }
});



function reformatSlot(slot) {
    var slotStack = $('#slot-' + slot + ' .card');

    for (var i = 0; i < slotStack.length; i++) {
        if ($(slotStack[i]).attr('pos') != i) {
            $(slotStack[i]).attr('pos', i);
        }
    }
}

function checkForWin() {
    try {
        if ((clubs.length + diamonds.length + hearts.length +
                spades.length) === (SUITS * RANKS)) {
            $('.finish .card').addClass('.all-i-do-is-win');
            stopTimer();
            win = true;
            alert('Winner winner chicken dinner!');
        }
    }
    catch (e) {}
}

$(window).on('resize', function() {
    cardPilePos = $('#card-pile').position();
    nextCardPos = $('#next-card').position();
    clubsPos = $('#clubs-stack').position();
    diamondsPos = $('#diamonds-stack').position();
    heartsPos = $('#hearts-stack').position();
    spadesPos = $('#spades-stack').position();
});

$('#reset').on('click', function() {
    newGame();console.log('New game!');
});
