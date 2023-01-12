function hi(){
    alert("Hi this is the game!");
}

var canvas = document.getElementById("canva");
var ctx = canvas.getContext("2d");


var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;
var paddle = {
    Height: 30,
    Width: 30,
    X: 200,
    Y: 330,
    px_v: 0,
    py_v: 0,
    jump: true
};


document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);

var keys = {
    right: false,
    left: false,
    up: false,
    };


function drawPaddle() {
    ctx.fillStyle = "blue";
    ctx.fillRect((paddle.X)-20, (paddle.Y)-20, paddle.Width, paddle.Height);
        
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(paddle.X + paddle.px_v > canvas.width-paddle.Width || paddle.X + paddle.px_v < paddle.Width) {
        paddle.px_v  = -paddle.px_v;
    }
    if(paddle.Y + paddle.py_v > canvas.height-paddle.Height|| paddle.Y + paddle.py_v < paddle.Height) {
        paddle.py_v = -paddle.py_v;
    }

    if(paddle.jump == false) {
        paddle.px_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        paddle.py_v += gravity;
    }
    paddle.jump = true;
    // If the left key is pressed increase the relevant horizontal velocity
    if(keys.left) {
        paddle.X -= 5
    }
    if(keys.right) {
        paddle.X += 5
    }
    if(keys.up) {
        paddle.Y -= 5
    }
    
    paddle.Y += paddle.py_v;
    paddle.X += paddle.px_v;

    drawPaddle();
}


// The friction and gravity to show realistic movements    
var gravity = 0.5;
var friction = 0.001;


// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if(e.keyCode == 37) {
        keys.left = true;
    }
    // 37 is the code for the up arrow key
    if(e.keyCode == 38) {
        keys.up = true;
        if(paddle.jump == false) {
            paddle.py_v = -10;
        }
    }
    // 39 is the code for the right arrow key
    if(e.keyCode == 39) {
        keys.right = true;
    }
}
// This function is called when the pressed key is released
function keyup(e) {
    if(e.keyCode == 37) {
        keys.left = false;
    }
    if(e.keyCode == 38) {
        keys.up = false;
        if(paddle.py_v < -1) {
        paddle.py_v = -1;
        }
    }
    if(e.keyCode == 39) {
        keys.right = false;
    }
} 


setInterval(draw, 22);