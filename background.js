let params = new URLSearchParams(window.location.search);
const canvas = document.getElementById('backd');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.getElementById('song').loop = true;

const words = ["cat", "dog", "bird", "fish", "tree", "house", "car", "bike", "road", "sky",
"cloud", "rain", "sun", "moon", "star", "space", "planet", "comet", "galaxy",
"universe", "ocean", "river", "lake", "mountain", "valley", "forest", "desert",
"beach", "wave", "tide", "current", "whale", "dolphin", "shark", "octopus",
"crab", "lobster", "shrimp", "jellyfish", "coral", "reef", "fish", "seal",
"penguin", "polar", "bear", "walrus", "iceberg", "glacier", "snow", "hail",
"storm", "thunder", "lightning", "tornado", "hurricane", "earthquake", "volcano",
"eruption", "lava", "ash", "rock", "mineral", "gem", "crystal", "diamond",
"ruby", "sapphire", "emerald", "gold", "silver", "bronze", "copper", "iron",
"steel", "aluminum", "titanium", "platinum", "zinc", "lead", "mercury", "helium",
"hydrogen", "oxygen", "nitrogen", "carbon", "silicon", "phosphorus", "sulfur",
"chlorine", "argon", "krypton", "neon", "xenon", "radon"];
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

var xrandom = [];
let firstpos = Math.random() * (canvas.width) * 0.9;

function spawnAsteroid()
{
    xrandom.push(Math.random() * (canvas.width) * 0.9);
    const word = words[Math.floor(Math.random() * words.length)];
    asteroids.push(new Asteroid(word, xrandom[xrandom.length - 1] , -50, wordspeed));
}

function updateGame()
{
    let i = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    while (i < asteroids.length)
    {
        const asteroid = asteroids[i];
        asteroid.update();
        asteroid.draw();
        i++;
    }
    requestAnimationFrame(updateGame);
}

setInterval(spawnAsteroid, spawnlevel);
updateGame();