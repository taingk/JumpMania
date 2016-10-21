lib.init();

function playsong() {
    return 0;
}

var GAMEBOARDWIDTH = 480;
var GAMEBOARDHEIGHT = 470;
var LIFENB = 3;

var player = {
    width : $('#player').width(),
    height  : $('#player').height(),
    //right : $('#player').position().right,
    left : $('#player').position().left,
    life : LIFENB,    
}

var bloc1 = {
    left : 430,
    right : 0,
    width : 50
}

var score = 0;
var jumping = false;

//var left1;

var timer;
var timerrrr;
//var left1 = 1000; //parseInt($('#bloc1').css('left').slice(0, -2));
//var top1 = 250; //parseInt($('#bloc1').css('top').slice(0, -2));
//var height1 = 50; //parseInt($('#bloc1').css('height').slice(0, -2));
//var left = 500; //parseInt($('#bloc').css('left').slice(0, -2));
//var width = 100; //parseInt($('#bloc').css('width').slice(0, -2));
var topp = 200; //parseInt($('#bloc').css('top').slice(0, -2));
var heightt = 100; //parseInt($('#bloc').css('height').slice(0, -2));
var cassetoi;
//var jumpp = false;
//var score = 0;

function goLeft() {
    
    bloc1.right += 50;
    bloc1.left -= 50;

    $('#bloc1').css('right', bloc1.right + 'px');

    if (bloc1.right >= GAMEBOARDWIDTH) {
        
        bloc1.right = 0;
        bloc1.left = 430;
        
        $('#bloc1').css('right', bloc1.right + 'px');
        score ++;
    }

    if (bloc1.left <= (player.left + player.width) && bloc1.left >= player.left) {
        if (jumping) {
            /*if (height1 >= (300 - topp - heightt)) {
                console.log('Game over ! top');
                clearInterval(cassetoi);
            }*/
        } else {
            //**/console.log('Game over ! left');
            clearInterval(cassetoi);
        }
    }
    /*
    else if(left1 <= left){
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

function keyFunction(evnt) {
    switch (evnt) {
        case "UP":
            jump();
            break;
        case "DOWN":
            clearInterval(cassetoi);
            $('#bloc1').css('left', '1000px');
            //bloc1 = 1000;
            //left1 = 1000;
            cassetoi = setInterval(goLeft, 50);
            break;
    }
}

var start = setTimeout(function() {
    cassetoi = setInterval(goLeft, 100);
}, 2000)
