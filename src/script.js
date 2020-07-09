const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

const ctx = canvas.getContext("2d");
const enemy_max = 3; // = enemy-rows with each 3 enemies

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
    deltaX: 3,
    deltaY: 3

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

    requestAnimationFrame(update);

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    createEnemies();
    ctx.fillStyle = "lightgrey";

    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "aquamarine";

    ctx.beginPath();
    ctx.ellipse(ball.x, ball.y, ball.radius, ball.radius, Math.PI * 2, 0, Math.PI * 2);
    ctx.fill();

    //ball-physics

    if(ball.x <= ball.radius || ball.x >= window.innerWidth - ball.radius)
        ball.deltaX *= -1;
    
    if(ball.y <= ball.radius || ball.y >= window.innerHeight - ball.radius)
        ball.deltaY *= -1;

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
                                speedUp();
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
            console.log(enemy_structure[x][y].fill)

            if(!enemy_structure[x][y].isDead){

            ctx.fillRect(window.innerWidth/12 + window.innerWidth/30*x + x*enemy().width, 50 + y*50, enemy().width, enemy().height);

            enemy_structure[x][y].x = window.innerWidth/12 + window.innerWidth/30*x + x*enemy().width;
            enemy_structure[x][y].y = 50 + y*50;

            }

        }

}

function speedUp(){

    if(ball.deltaX > 0)
        ball.deltaX += 0.35;
    else
        ball.deltaX -= 0.35;

    if(ball.deltaY > 0)
        ball.deltaY += 0.35;
    else
        ball.deltaY -= 0.35;

}