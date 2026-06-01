const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
const scoreBoard = document.getElementById("score");

// Player
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 8
};

let bullets = [];
let enemies = [];

let leftPressed = false;
let rightPressed = false;

// Controls
document.addEventListener("keydown", (e) => {

    if(e.key === "ArrowLeft"){
        leftPressed = true;
    }

    if(e.key === "ArrowRight"){
        rightPressed = true;
    }

    if(e.key === " "){
        shoot();
    }
});

document.addEventListener("keyup", (e) => {

    if(e.key === "ArrowLeft"){
        leftPressed = false;
    }

    if(e.key === "ArrowRight"){
        rightPressed = false;
    }
});

// Shoot Bullet
function shoot(){

    bullets.push({
        x: player.x + player.width/2 - 3,
        y: player.y,
        width: 6,
        height: 15
    });
}

// Create Enemy
function createEnemy(){

    enemies.push({
        x: Math.random() * (canvas.width - 40),
        y: -40,
        width: 40,
        height: 40,
        speed: 2 + Math.random() * 3
    });
}

setInterval(createEnemy, 1000);

// Draw Player
function drawPlayer(){

    ctx.fillStyle = "cyan";
    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}

// Draw Bullets
function drawBullets(){

    ctx.fillStyle = "yellow";

    bullets.forEach((bullet,index)=>{

        bullet.y -= 8;

        ctx.fillRect(
            bullet.x,
            bullet.y,
            bullet.width,
            bullet.height
        );

        if(bullet.y < 0){
            bullets.splice(index,1);
        }
    });
}

// Draw Enemies
function drawEnemies(){

    ctx.fillStyle = "red";

    enemies.forEach((enemy,eIndex)=>{

        enemy.y += enemy.speed;

        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );

        if(enemy.y > canvas.height){

            alert("Game Over!\nScore: " + score);
            document.location.reload();
        }

        bullets.forEach((bullet,bIndex)=>{

            if(
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ){

                enemies.splice(eIndex,1);
                bullets.splice(bIndex,1);

                score++;
                scoreBoard.innerText =
                "Score: " + score;
            }
        });
    });
}

// Update Player
function movePlayer(){

    if(leftPressed && player.x > 0){
        player.x -= player.speed;
    }

    if(
        rightPressed &&
        player.x + player.width < canvas.width
    ){
        player.x += player.speed;
    }
}

// Main Game Loop
function gameLoop(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    movePlayer();
    drawPlayer();
    drawBullets();
    drawEnemies();

    requestAnimationFrame(gameLoop);
}

gameLoop();
