lib.init();

function playsong() {
    return 0;
}

var GAMEBOARDWIDTH = $('#gameboard').width();
var GAMEBOARDHEIGHT = $('#gameboard').height();
var MOVESTEP = 10;
var LIFENB = 3;

var player = {
    width : $('#player').width(),
    height  : $('#player').height(),
    top : $('#player').position().top,
    bottom : $('#player').position().top + $('#player').height(),
    right : $('#player').position().left + $('#player').width(),
    left : $('#player').position().left,
    life : LIFENB,
}

var bloc1 = {
    width : $('#bloc1').width(),
    height  : $('#bloc1').height(),
    top : $('#bloc1').position().top,
    bottom : $('#bloc1').position().top + $('#bloc1').height(),
    right : GAMEBOARDWIDTH,
    left : $('#bloc1').position().left,
}

var sky = 145;
var ground = 370;

var score = 0;
var move;
var jumping = false;

function moveBloc() {

    bloc1.right -= MOVESTEP;
    bloc1.left -= MOVESTEP;

    $('#bloc1').css('left', bloc1.left + 'px');

    if (bloc1.left < 0 - bloc1.width) {

        bloc1.right = GAMEBOARDWIDTH;
        bloc1.left = GAMEBOARDWIDTH - $('#bloc1').width();

        $('#bloc1').css('left', bloc1.left + 'px');
        
        score ++;
        $('#score').html(score);
    }

    if (bloc1.left <= player.right && bloc1.left >= player.left) {
        if (jumping) {
            if (bloc1.top <= player.bottom) {
                console.log('Game over ! top');
                clearInterval(move);
            }
        } else {
            console.log('Game over ! left');
            clearInterval(move);
        }
    }
}


function jump() {
    jumping = true;

    var time = setInterval(up, MOVESTEP);
    var timer;

    function up() {
        player.top -= MOVESTEP;
        player.bottom -= MOVESTEP;

        $('#player').css('top', player.top + 'px');
        //bloc = bloc - 50;
        //topp = topp - 50;
        if (player.top < sky) {
            clearInterval(time);
            setTimeout(function() {
                timer = setInterval(down, MOVESTEP);
            }, 150);
        }
    }

    function down() {
        player.top += MOVESTEP;
        player.bottom += MOVESTEP;

        $('#player').css('top', player.top + 'px');

        if (player.bottom >= ground){

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

            move = setInterval(moveBloc, MOVESTEP);
        break;
    }
}

var start = setTimeout(function() {
    move = setInterval(moveBloc, MOVESTEP);
}, 2000);
