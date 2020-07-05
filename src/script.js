const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

const ctx = canvas.getContext("2d");

var paddle = {

    height : window.innerHeight/20,
    width : window.innerWidth/4,
    y : window.innerHeight - window.innerHeight/20 - 15,
    x : window.innerWidth/2-window.innerWidth/4/2

}

const enemy_max = 3;
const enemy_height = window.innerHeight/25;
const enemy_width = window.innerWidth/4;
var enemy_isdead = [[false, false, false], 
                    [false, false, false],
                    [false, false, false]];

//controls
document.addEventListener("mousemove", (e) => {

    paddle.x = e.pageX - paddle.width/2;

});

document.addEventListener("touchmove", (e) => {

    paddle.x = e.pageX - paddle.width/2;

});

update();

function update(){

    requestAnimationFrame(update);

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    createEnemies();
    ctx.fillStyle = "lightgrey";

    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

}

function createEnemies(){

    ctx.fillStyle = "orange";

    for(var y = 0; y < 3; y++)

        for(var x = 0; x < enemy_max; x++){

            ctx.fillRect(50 + 50*x + x*enemy_width, 50 + y*50, enemy_width, enemy_height);
            enemy_isdead.push()

        }

}