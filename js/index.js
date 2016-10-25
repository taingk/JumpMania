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
    bottom : GAMEBOARDHEIGHT - document.getElementById('ground').clientHeight,
    right : $('#player').position().left + $('#player').width(),
    left : $('#player').position().left,
    life : LIFENB,
}
//bloc
var bloc1 = {
    width : $('#bloc1').width(),
    height  : $('#bloc1').height(),
    top : $('#bloc1').position().top,
    bottom : GAMEBOARDHEIGHT - document.getElementById('ground').clientHeight,
    right : GAMEBOARDWIDTH,
    left : $('#bloc1').position().left,
}

/* GLOBAL VARIABLE */
var sky = 4*player.height;
var ground = GAMEBOARDHEIGHT - document.getElementById('ground').clientHeight;
var score = 0;
var jumping = false;
var degrees = 0;
var time;
var timer;
var move;
// Bloc1's bottom from css sheet
var baseBottom = 50;

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

function initBloc(color) {
	$('#bloc1').remove();
	$('#gameboard').append('<div id="bloc1"></div>');
	$('#bloc1').css('bottom', baseBottom);
	$('#bloc1').css('background-color', color);
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

        clearInterval(move);
		cookieBestScore(score);
        launchEvent();
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

function moveGroundUp() {
	bloc1.right -= MOVESTEP;
    bloc1.left -= MOVESTEP;
	$('#bloc1').css('width', GAMEBOARDWIDTH + 50 + 'px');
	$('#bloc1').css('background-color', 'grey');
    $('#bloc1').css('left', bloc1.left + 'px');

    /* IF THE BLOC PASS THROUGH THE GAMEBOARD */
    if (bloc1.left < 0 - bloc1.width) {
		$('#bloc1').remove();
        bloc1.right = GAMEBOARDWIDTH;
        bloc1.left = GAMEBOARDWIDTH - $('#bloc1').width();
        $('#bloc1').css('left', bloc1.left + 'px');

		sky = sky - 50;
		baseBottom = baseBottom + 50
		$('#ground').css('height', baseBottom + 'px');

        clearInterval(move);
		cookieBestScore(score);
        launchEvent();
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

function moveGroundDown() {
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

        clearInterval(move);
        launchEvent();
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
    time = setInterval(up, JUMP_DELAI);

    jumping = true;
}

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

function keyFunction(evnt) {
    switch (evnt) {
        case "UP":
        if(!jumping){
            jump();
        }
        break;
        case "DOWN":
            clearInterval(move);
            $('#bloc1').css('left', GAMEBOARDWIDTH + 'px');
            move = setInterval(moveBloc, MOVE_DELAI);
        break;
        case "RIGHT":
			sky = sky - 50;
            var add = document.getElementById('ground').clientHeight + 50;
            $('#ground').css('height', add +'px');
            ground = GAMEBOARDHEIGHT - document.getElementById('ground').clientHeight;
        break;
        case "LEFT":
			sky = sky + 50;
            var add = document.getElementById('ground').clientHeight - 50;
            $('#ground').css('height', add +'px');
            ground = GAMEBOARDHEIGHT - document.getElementById('ground').clientHeight;
            setTimeout(function() {
                timer = setInterval(down, JUMP_DELAI);
            }, 100);
        break;
    }
}

var start = launchEvent();

function launchEvent (){
    //setTimeout(function() {

        var event = Math.floor((Math.random() * 3) + 1);

        //move = setInterval(moveBloc, MOVE_DELAI);
        switch (event){
            case 1:
                //$('#bloc1').css('background-color', '#ff00d9');
//                move = setInterval(moveBloc, MOVE_DELAI);$
				ground = ground - 50;
				initBloc('grey');
				move = setInterval(moveGroundUp, MOVE_DELAI);
            break;
            case 2:
				//move = setInterval(moveGroundUp, MOVE_DELAI);
				initBloc('blue')
                move = setInterval(moveBloc, MOVE_DELAI);
            break;
            case 3:
				//move = setInterval(moveGroundUp, MOVE_DELAI);
//				move = setInterval(moveGroundDown, MOVE_DELAI);
				initBloc('red');
                move = setInterval(moveBloc, MOVE_DELAI);
            break;
            default:
                launchEvent();
            break;
            /*case 2:
            break;
            case 3:
            break;*/
        }
    //}, 2000);
}
