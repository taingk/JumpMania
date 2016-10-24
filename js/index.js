/* INIT CALL */

lib.init();
initCookies();

function playsong() {
    return 0;
}

/* STATIC VARIABLES */
var GAMEBOARDWIDTH = $('#gameboard').width();
var GAMEBOARDHEIGHT = $('#gameboard').height();
var MOVESTEP = 15;
var MOVE_DELAI = 30;
var JUMP_DELAI = 10;
var LIFENB = 3;
var RADIUS = 20;

/* GAME OBJECTS */
//player
var player = {
    width : $('#player').width(),
    height  : $('#player').height(),
    top : $('#player').position().top,
    bottom : $('#player').position().top + $('#player').height(),
    right : $('#player').position().left + $('#player').width(),
    left : $('#player').position().left,
    life : LIFENB,
}
//bloc
var bloc1 = {
    width : $('#bloc1').width(),
    height  : $('#bloc1').height(),
    top : $('#bloc1').position().top,
    bottom : $('#bloc1').position().top + $('#bloc1').height(),
    right : GAMEBOARDWIDTH,
    left : $('#bloc1').position().left,
}

/* GLOBAL VARIABLE */
var sky = 100;
var ground = GAMEBOARDHEIGHT - 100;
var score = 0;
var jumping = false;
var degrees = 0;
var move;

/* COOKIES FUNCTION */

function initCookies() {
	if (!Cookies.get('BestScore')) {
		Cookies.set('BestScore', 0);
		$('#bestScore').html(parseInt(Cookies.get('BestScore')));
	} else {
		$('#bestScore').html(parseInt(Cookies.get('BestScore')));
	}
}

function cookieBestScore(score) {
	if (parseInt(Cookies.get('BestScore')) < score) {
		Cookies.set('BestScore', score);
		$('#bestScore').html(score);
	} else {
		$('#bestScore').html(parseInt(Cookies.get('BestScore')));
	}
}

function deleteCookies() {
	Cookies.remove('BestScore');
}

/* MOVE BLOCS FROM RIGHT TO LEFT */
function moveBloc() {
    bloc1.right -= MOVESTEP;
    bloc1.left -= MOVESTEP;
    $('#bloc1').css('left', bloc1.left + 'px');

    /* IF THE BLOC PASS THROUGH THE GAMEBOARD */
    if (bloc1.left < 0 - bloc1.width) {
        bloc1.right = GAMEBOARDWIDTH;
        bloc1.left = GAMEBOARDWIDTH - $('#bloc1').width();
        $('#bloc1').css('left', bloc1.left + 'px');
        score ++;
        $('#score').html(score);
		cookieBestScore(score);
    }

    /* IF THE PLAYER TOUCH THE BLOC ... */
    if (bloc1.left <= player.right && bloc1.left >= player.left) {
        /* ... AT THE TOP */
        if (jumping) {
            if (bloc1.top <= player.bottom) {
                console.log('Game over ! top');
                clearInterval(move);
            }
        }
        /* ... AT THE LEFT */
        else {
            console.log('Game over ! right');
            clearInterval(move);
        }
    }
}

/* MAKE THE PLAYER JUMPING */
function jump() {
	var time = setInterval(up, JUMP_DELAI);
    var timer;
    jumping = true;

    function up() {
        player.top -= MOVESTEP;
        player.bottom -= MOVESTEP;
        degrees += RADIUS;

        $('#player').css('top', player.top + 'px');

        $('#player').css({'transform' : 'rotate('+ degrees +'deg)'});

        if (player.top < sky) {
            clearInterval(time);
            setTimeout(function() {
                timer = setInterval(down, JUMP_DELAI);
            }, 100);
        }
    }

    function down() {
        player.top += MOVESTEP;
        player.bottom += MOVESTEP;
        degrees += RADIUS;

        $('#player').css('top', player.top + 'px');

        $('#player').css({'transform' : 'rotate('+ degrees +'deg)'});

        if (player.bottom >= ground){

            $('#player').css({'transform' : 'rotate(0deg)'});

            clearInterval(timer);

            jumping = false;
        }
    }
}

function keyFunction(evnt) {
    switch (evnt) {
        case "UP":
            jump();
        break;
        case "DOWN":
            clearInterval(move);
            $('#bloc1').css('left', GAMEBOARDWIDTH + 'px');
            move = setInterval(moveBloc, MOVE_DELAI);
        break;
		case 1:
			deleteCookies();
		break;
    }
}

var start = setTimeout(function() {
    move = setInterval(moveBloc, MOVE_DELAI);
}, 2000);
