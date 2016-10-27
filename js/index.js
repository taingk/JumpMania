/* INIT CALL */

lib.init();
initCookies();

function playsong() {
    return 0;
}

/* STATIC VARIABLES */
var GAMEBOARDWIDTH = $('#gameboard').width();
var GAMEBOARDHEIGHT = $('#gameboard').height();
var MOVESTEP = 16.6;
var MOVEBLOC = 15;
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

var bloc2 = {
    width : $('#bloc2').width(),
    height  : $('#bloc2').height(),
    top : $('#bloc2').position().top,
    bottom : GAMEBOARDHEIGHT - document.getElementById('ground').clientHeight,
    right : GAMEBOARDWIDTH,
    left : $('#bloc2').position().left,
}

var bloc3 = {
    width : $('#bloc3').width(),
    height  : $('#bloc3').height(),
    top : $('#bloc3').position().top,
    bottom : GAMEBOARDHEIGHT - document.getElementById('ground').clientHeight,
    right : GAMEBOARDWIDTH,
    left : $('#bloc3').position().left,
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
var move2;
var delay = 1000;
// Bloc1's bottom from css sheet
var baseBottom = 50;
var lock = false;
var lockGround = false;
var nb_bloc = 0;
var start2;

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

function initBloc(color, event, nb_bloc) {
	$('#gameboard').append('<div id="bloc'+event+'" class="'+nb_bloc+'"></div>');

	// FOR ALL BLOC
	$('.' + nb_bloc).css({
		'left': $('.' + nb_bloc).position().left - MOVEBLOC + 'px',
		'border-radius': '10px'
	});
	// FOR BLOC UP AND DOWN
	if (event == 1 || event == 2) {
		$('.' + nb_bloc).css({
			'bottom': baseBottom + 'px',
			'background-color': color,
			'width': GAMEBOARDWIDTH + 50 + 'px'
		});
	}
	// FOR BLOC SIMPLE
	else if (event == 3) {
		$('.' + nb_bloc).css({
			'bottom': baseBottom + 'px',
			'background-color': color,
			'width': 50 + 'px',
		});
	}
}

/* MOVE BLOCS FROM RIGHT TO LEFT */
function moveBloc(state, event, /*bloc,*/ nb_bloc, passThrough) {
	/*bloc.right -= MOVEBLOC;
    bloc.left -= MOVEBLOC;
*/
	$('.' + nb_bloc).css('left', $('.' + nb_bloc).position().left - MOVEBLOC + 'px');

    /* IF THE BLOC PASS THROUGH THE GAMEBOARD */
    //if (bloc.left < 0 - bloc.width) {
	if (!passThrough)
		passThrough = 0 - $('.' + nb_bloc).width();
	else
		passThrough = $('.' + nb_bloc).width() - GAMEBOARDWIDTH - 65;
	if ($('.' + nb_bloc).position().left < passThrough) {
		$('.' + nb_bloc).remove();
//		$('#gameboard').append('<div id="bloc'+nb_bloc+'"></div>');

		lockGround = false;
		lock = false;
		/*bloc.right = GAMEBOARDWIDTH;
        bloc.left = GAMEBOARDWIDTH - $('#bloc' + event).width();
        $('#bloc' + event).css('left', bloc.left + 'px');*/

		if (state == 'up') {
			sky = sky - 50;
			$('#ground').css('height', ($('#ground').height() + 50) + 'px');
		} else if (state == 'down') {
			sky = sky + 50;
			$('#ground').css('height', ($('#ground').height() - 50) + 'px');
		} else {
        	score ++;
        	$('#score').html(score);
		}

		if (nb_bloc % 2 == 0)
			clearInterval(move2);
		else
			clearInterval(move);
		return;
        //launchEvent();
    }

    /* IF THE PLAYER TOUCH THE BLOC ... */
    //if (bloc.left <= player.right && bloc.left >= player.left) {
	if ($('.' + nb_bloc).position().left <= player.right && $('.' + nb_bloc).position().left >= player.left) {
        /* STATE DOWN */
		if (lock || lockGround)
			return;
		if (state == 'down' && !lockGround) {
			lockGround = true;
			ground = ground + 50;
		}
		if (state == 'down' && !jumping && !lock) {
			lock = true;
			setTimeout(function() {
				timer = setInterval(down, JUMP_DELAI);
			}, 100);
			return;
		}
		/* STATE UP */
		if (lock)
			return;
		if (state == 'up' && jumping && !lock) {
			lock = true;
			ground = ground - 50;
			return;
		}
		/* ... AT THE TOP */
		if (jumping) {
            if ($('.' + nb_bloc).position().top <= player.bottom) {
                console.log('Game over ! top');
				clearInterval(move2);
				clearInterval(move);
				clearTimeout(start);
				clearTimeout(start2);
            }
        }
        /* ... AT THE LEFT */
        else {
            console.log('Game over ! right');
			clearInterval(move2);
			clearInterval(move);
			clearTimeout(start);
			clearTimeout(start2);
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

    if (player.bottom >= ground) {

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

var start = setTimeout(launchEvent, delay);

function launchEvent() {
	var event = Math.floor((Math.random() * 3) + 1);
	var passThrough;

	event == 1 || event == 2 ? passThrough = GAMEBOARDWIDTH + 90 : passThrough = 0;

	delay = Math.floor((Math.random() * 950) + 550);
//	console.log(delay);
	start2 = setTimeout(launchEvent, 550);
	nb_bloc = nb_bloc + 1;
	//var MOVE_DELAI = Math.floor((Math.random() * 35) + 25);
	//move = setInterval(moveBloc, MOVE_DELAI);
	switch (event){
		case 1:
			//$('#bloc1').css('background-color', '#ff00d9');
//                move = setInterval(moveBloc, MOVE_DELAI);$
			if (baseBottom < 250) {
				initBloc('grey', event, nb_bloc);
				if (nb_bloc % 2 == 0) {
					move2 = setInterval(moveBloc, MOVE_DELAI, 'up', event, /*bloc1,*/ nb_bloc, passThrough);
				} else {
					move = setInterval(moveBloc, MOVE_DELAI, 'up', event, /*bloc1,*/ nb_bloc, passThrough);
				}
			}
			/*else {
				launchEvent();
			}*/
		break;
		case 2:
			//move = setInterval(moveGroundUp, MOVE_DELAI);
			if (baseBottom > 50) {
				baseBottom = baseBottom - 50;
				initBloc('white', event, nb_bloc);
				if (nb_bloc % 2 == 0) {
					move2 = setInterval(moveBloc, MOVE_DELAI, 'down', event, nb_bloc, passThrough);
				} else {
					move = setInterval(moveBloc, MOVE_DELAI, 'down', event, nb_bloc, passThrough);
				}
			}
			/*else {
				launchEvent();
			}*/
		break;
		case 3:
			//move = setInterval(moveGroundUp, MOVE_DELAI);
//				move = setInterval(moveGroundDown, MOVE_DELAI);
			initBloc('red', event, nb_bloc);
			if (nb_bloc % 2 == 0)
				move2 = setInterval(moveBloc, MOVE_DELAI, 'simple', event, /*bloc3,*/ nb_bloc, passThrough);
			else
				move = setInterval(moveBloc, MOVE_DELAI, 'simple', event, /*bloc3,*/ nb_bloc, passThrough);
			//launchEvent();
		break;
		default:
			//launchEvent();
		break;
		/*case 2:
		break;
		case 3:
		break;*/
	}
	if (event == 1)
		baseBottom = baseBottom + 50;
}
