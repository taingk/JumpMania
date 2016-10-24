lib.init();

function playsong() {
    return 0;
}

var GAMEBOARDWIDTH = $('#gameboard').width();
var GAMEBOARDHEIGHT = $('#gameboard').height();
var MOVESTEP = 50;
var LIFENB = 3;

var player = {
    width : $('#player').width(),
    height  : $('#player').height(),
    right : $('#player').position().left + $('#player').width(),
    left : $('#player').position().left,
    life : LIFENB,    
}

var bloc1 = {
    width : $('#bloc1').width(),
    height  : $('#bloc1').height(),
    right : GAMEBOARDWIDTH,
    left : $('#bloc1').position().left,
}

var score = 0;

var move;
var jumping = false;

//var left1;

//var timerrrr;
//var left1 = 1000; //parseInt($('#bloc1').css('left').slice(0, -2));
//var top1 = 250; //parseInt($('#bloc1').css('top').slice(0, -2));
//var height1 = 50; //parseInt($('#bloc1').css('height').slice(0, -2));
//var left = 500; //parseInt($('#bloc').css('left').slice(0, -2));
//var width = 100; //parseInt($('#bloc').css('width').slice(0, -2));
//var topp = 200; //parseInt($('#bloc').css('top').slice(0, -2));
//var heightt = 100; //parseInt($('#bloc').css('height').slice(0, -2));
//var cassetoi;
//var jumpp = false;
//var score = 0;

function moveBloc() {

    bloc1.right -= MOVESTEP;
    bloc1.left -= MOVESTEP;

    $('#bloc1').css('left', bloc1.left + 'px');

    if (bloc1.left < 0 - bloc1.width) {

        bloc1.right = GAMEBOARDWIDTH;
        bloc1.left = GAMEBOARDWIDTH - $('#bloc1').width();

        $('#bloc1').css('left', bloc1.left + 'px');
        score ++;
    }

    if (bloc1.left <= player.right && bloc1.left >= player.left) {
        if (jumping) {
            if (height1 >= (300 - topp - heightt)) {
                console.log('Game over ! top');
                clearInterval(cassetoi);
            }
        } else {
            console.log('Game over ! left');
            clearInterval(move);
        }
    }
    /*else if(left1 <= left){
		score ++;
		$('#score').html(score);
	}*/
}

/*
function jump() {
    jumpp = true;
    var bloc = parseInt($('#player').css('top').slice(0, -2));
    var time = setInterval(up, 50);
    var timer;

    function up() {
        $('#player').css('top', bloc - 50 + 'px');
        bloc = bloc - 50;
        topp = topp - 50;
        if (bloc == 50) {
            clearInterval(time);
            setTimeout(function() {
                timer = setInterval(down, 50);
            }, 150);
        }
    }

    function down() {
        $('#player').css('top', bloc + 50 + 'px');
        bloc = bloc + 50;
        topp = topp + 50;
        if (bloc == 200)
            clearInterval(timer);
        jumpp = false;
    }
}*/

/*function keyFunction(evnt) {
    switch (evnt) {
        case "UP":
            jump();
            break;
        case "DOWN":
            clearInterval(move);
            $('#bloc1').css('left', '1000px');
            //bloc1 = 1000;
            //left1 = 1000;
            move = setInterval(goLeft, 50);
            break;
    }
}*/

var start = setTimeout(function() {
    move = setInterval(moveBloc, 100);
}, 2000);
