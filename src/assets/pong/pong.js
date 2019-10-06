// select canvas element
const canvas = document.querySelector("#pong");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const context = canvas.getContext('2d');

// Ball object
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "white"
};

// User Paddle
const user = {
    x : 0,
    y : (canvas.height - 100)/2,
    width : 10,
    height : 100,
    score : 0,
    color : "blue"
};

// Computer Paddle
const com = {
    x : canvas.width - 10,
    y : (canvas.height - 100)/2,
    width : 10,
    height : 100,
    score : 0,
    color : "red"
};

// NET
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "seagreen"
};

// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

// draw circle, will be used to draw the ball
function drawArc(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,true);
    context.closePath();
    context.fill();
}

// listening to the mouse
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height/2;
}

// when COM or USER scores, we reset the ball
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

// draw the net
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=20){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// draw text
function drawText(text,x,y){
    context.fillStyle = "#FFF";
    context.font = "75px arial";
    context.fillText(text, x, y);
}

// collision detection
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    // only return true if the ball is found in the middle of paddle rectangle
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// Changes the values that will be drawn in the render
// Called every frame
function update(){

    // Computer Scores
    if( ball.x - ball.radius < 0 ){
        com.score++;
        resetBall();
    }
    // User Scores
    else if( ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall();
    }

    // how much direction the ball moves each update
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // simple AI
    // The end coefficient deals with how closely the AI follows the ball
    com.y += ((ball.y - (com.y + com.height/2)))*.085;

    // Collision with top or bottom wall. Invert the y velocity
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
    }

    // we check if the paddle hit the user or the com paddle
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;

    // if the ball hits a paddle
    if(collision(ball,player)){
        let collidePoint = (ball.y - (player.y + player.height/2));

        // normalize between -1 and 1, 0 being middle of paddle
        collidePoint = collidePoint / (player.height/2);

        // 45 degree angle
        let angleRad = (Math.PI/4) * collidePoint;

        // change the X and Y velocity direction
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        // speed up the ball every time a paddle hits it.
        ball.speed += 0.3;
    }
}

// Draws everything
// Called every frame
function render(){
    drawRect(0, 0, canvas.width, canvas.height, "black");

    // Draw scores
    drawText(user.score,canvas.width/4,canvas.height/5);
    drawText(com.score,3*canvas.width/4,canvas.height/5);

    drawNet();

    // Draw paddles
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function game(){
    update();
    render();
}
// number of frames per second
let framePerSecond = 60;


// This is where the game starts
let loop = setInterval(game,1000/framePerSecond);
