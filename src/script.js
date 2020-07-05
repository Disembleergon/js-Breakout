const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

const ctx = canvas.getContext("2d");
const enemy_max = 3;

var paddle = {

    height : window.innerHeight/20,
    width : window.innerWidth/4,
    y : window.innerHeight - window.innerHeight/20 - 15,
    x : window.innerWidth/2-window.innerWidth/4/2

}

function enemy(){

    return{
        height : window.innerHeight/25,
        width : window.innerWidth/4
    };

}

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

            ctx.fillRect(50 + 50*x + x*enemy().width, 50 + y*50, enemy().width, enemy().height);

        }

}