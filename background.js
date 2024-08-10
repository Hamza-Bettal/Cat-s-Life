let params = new URLSearchParams(window.location.search);
const canvas = document.getElementById('backd');
const ctx = canvas.getContext('2d');

function resizeCanvas()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.getElementById('song').loop = true;

let asteroids = [];
const spawnlevel = 20;
const wordspeed = 7;

class Asteroid
{
    constructor(word, x, y, speed)
    {
        this.word = word;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    draw()
    {
        ctx.font = '40px VT323';
        ctx.fillStyle = '#fff';
        ctx.fillText(this.word, this.x, this.y);
    }
    update()
    {
        this.y += this.speed;
    }
}

function spawnAsteroid()
{
    const x = Math.random() * canvas.width;
    asteroids.push(new Asteroid('.', x, -50, wordspeed));
}

function updateGame()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < asteroids.length; i++)
    {
        const asteroid = asteroids[i];
        asteroid.update();
        asteroid.draw();
    }
    requestAnimationFrame(updateGame);
}

setInterval(spawnAsteroid, spawnlevel);
updateGame();
