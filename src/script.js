const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

const player_ctx = canvas.getContext("2d");
player_ctx.fillStyle = "lightgrey";

const player_height = window.innerHeight/20;
const player_width = window.innerWidth/4;
const player_y = window.innerHeight - player_height - 15;
var player_x = window.innerWidth/2-player_width/2;

document.addEventListener("mousemove", (e) => {

    player_x = e.pageX - player_width/2;

});

document.addEventListener("touchmove", (e) => {

    player_x = e.pageX - player_width/2;

});

update();

function update(){

    requestAnimationFrame(update);

    player_ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    player_ctx.fillRect(player_x, player_y, player_width, player_height);

}