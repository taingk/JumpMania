lib.init();

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
            var add = document.getElementById('ground').clientHeight + 50;
            $('#ground').css('height', add +'px');
            ground = GAMEBOARDHEIGHT - document.getElementById('ground').clientHeight;
        break;
        case "LEFT":
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
                $('#bloc1').css('background-color', '#ff00d9');
                move = setInterval(moveBloc, MOVE_DELAI);
            break;
            case 2:
                $('#bloc1').css('background-color', 'red');
                move = setInterval(moveBloc, MOVE_DELAI);
            break;
            case 3:
                $('#bloc1').css('background-color', 'blue');
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
