const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

const ctx = canvas.getContext("2d");
const enemy_max = 3; // = enemy-rows with each 3 enemies

var kills = 0;
var respawn_active = false;
var respawn_happened = false;
var alpha = 0;

var paddle = {

    height : window.innerHeight/20,
    width : window.innerWidth/4,
    y : window.innerHeight - window.innerHeight/20 - 15,
    x : window.innerWidth/2-window.innerWidth/4/2

}

var ball = {

    radius: window.innerWidth/45,
    x: window.innerWidth/2,
    y: window.innerHeight/2,
    deltaX: 4,
    deltaY: 4

}

function enemy(){

    return{
        height : window.innerHeight/25,
        width : window.innerWidth/4,
        x : null,
        y : null,
        hits: 0,
        fill: 'orange',
        isDead: false
    };

}

const enemy_structure = [

    [new enemy(), new enemy(), new enemy()],
    [new enemy(), new enemy(), new enemy()],
    [new enemy(), new enemy(), new enemy()]

]

//controls
document.addEventListener("mousemove", (e) => {

    paddle.x = e.pageX - paddle.width/2;

});

document.addEventListener("touchmove", (e) => {

    paddle.x = e.pageX - paddle.width/2;

});

update();

function update(){

    console.log(ball.deltaX + "  " + ball.deltaY);

    if(!respawn_active)
    requestAnimationFrame(update);

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    createEnemies();
    ctx.fillStyle = "lightgrey";

    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "aquamarine";

    ctx.beginPath();
    ctx.ellipse(ball.x, ball.y, ball.radius, ball.radius, Math.PI * 2, 0, Math.PI * 2);
    ctx.fill();

    if(!respawn_active)
        ball_physics();

    //respawn-mechanic

    if(!respawn_happened)

    if(kills !== 0 && kills % 9 === 0 && !respawn_active && !respawn_happened)
        respawn();

}

function ball_physics(){

    if(ball.x <= ball.radius || ball.x >= window.innerWidth - ball.radius)
        ball.deltaX *= -1;
    
    if(ball.y <= ball.radius)
        ball.deltaY *= -1;

        //lose
    if(ball.y >= window.innerHeight - ball.radius){

        alert(`score:\n${kills}`);
        reset();

    }

        //player-collision-detection

    if(ball.x + ball.radius >= paddle.x &&
        ball.x - ball.radius <= paddle.x + paddle.width &&
            ball.y + ball.radius >= paddle.y &&
                ball.y - ball.radius <= paddle.y + paddle.height)

                    ball.deltaY *= -1;

        //enemy-collision-detection

    enemy_structure.forEach((enemy_column) => {

        enemy_column.forEach((nmy) => {

            if(!nmy.isDead){

            if(ball.x + ball.radius >= nmy.x &&
                ball.x - ball.radius <= nmy.x + nmy.width &&
                    ball.y + ball.radius >= nmy.y &&
                        ball.y - ball.radius <= nmy.y + nmy.height){
        
                            ball.deltaY *= -1
                            
                            if(nmy.hits <2){
                                nmy.hits++
                                nmy.fill = `rgba(252, 165, 3, ${1/(nmy.hits + 1)})`
                            }else{
                                nmy.isDead = true

                                if(kills % 9 === 0){
                                    respawn_happened = false;
                                    alpha = 0;

                                    enemy_structure.forEach(enemy_column1 => {

                                        enemy_column1.forEach(nmy1 => {

                                            nmy1.hits = 0;

                                        })

                                    })

                                }

                                kills++
                                nmy.fill = "rgba(252, 165, 3, 0)"
                                speedUP();
                                
                            }

                        }

            }

        })

    })

    ball.x += ball.deltaX
    ball.y += ball.deltaY

}

function createEnemies(){

    for(var y = 0; y < 3; y++)

        for(var x = 0; x < enemy_max; x++){

            ctx.fillStyle = enemy_structure[x][y].fill;

            if(!enemy_structure[x][y].isDead){

            ctx.fillRect(window.innerWidth/12 + window.innerWidth/30*x + x*enemy().width, 50 + y*50, enemy().width, enemy().height);

            enemy_structure[x][y].x = window.innerWidth/12 + window.innerWidth/30*x + x*enemy().width;
            enemy_structure[x][y].y = 50 + y*50;

            }

        }

}

function respawn(){

    if(!respawn_active){

        respawn_active = true;
        ball.x = window.innerWidth/2;
        ball.y = window.innerHeight/2;

    }

    if(alpha < 1)
    requestAnimationFrame(respawn);
    else{
        respawn_active = false;
        respawn_happened = true;
        update();
    }

    alpha += 0.01;

    enemy_structure.forEach(enemy_column => {

        enemy_column.forEach(nmy => {

            nmy.isDead = false;
            nmy.fill = `rgba(252, 165, 3, ${alpha})`

        });

    })

    if(alpha < 1)
        update();

}

function speedUP(){

    if(ball.deltaX > 0)
        ball.deltaX+=0.1;
    else
        ball.deltaX -= 0.1;

    if(ball.deltaY > 0)
        ball.deltaY += 0.1;
    else
        ball.deltaY -= 0.1;

}

function reset(){

    ball.x = window.innerWidth/2;
    ball.y = window.innerHeight/2;
    ball.deltaX = 4;
    ball.deltaY = 4;
    kills = 0;

    enemy_structure.forEach(enemy_column => {

        enemy_column.forEach(nmy => {

            nmy.isDead = false;
            nmy.hits = 0;
            nmy.fill = 'orange';

        })

    })

}