let params = new URLSearchParams(window.location.search);
const canvas = document.getElementById('backd');
const ctx = canvas.getContext('2d');

// Resize the canvas to fill the entire viewport
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Call the resizeCanvas function initially and on window resize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.getElementById('song').loop = true;

let asteroids = [];
const spawnlevel = 20; // Time between spawns in milliseconds
const wordspeed = 7;   // Speed at which asteroids fall

class Asteroid {
    constructor(word, x, y, speed) {
        this.word = word;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    draw() {
        ctx.font = '40px VT323';
        ctx.fillStyle = '#fff';
        ctx.fillText(this.word, this.x, this.y);
    }
    update() {
        this.y += this.speed;
    }
}

function spawnAsteroid() {
    // Calculate a random x position within the canvas width
    const x = Math.random() * canvas.width;
    asteroids.push(new Asteroid('.', x, -50, wordspeed));
}

function updateGame() {
    // Clear the entire canvas before drawing the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw all asteroids
    for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i];
        asteroid.update();
        asteroid.draw();
    }

    // Request the next frame
    requestAnimationFrame(updateGame);
}

// Spawn asteroids at a regular interval
setInterval(spawnAsteroid, spawnlevel);
updateGame();
