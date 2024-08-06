const canvas = document.getElementById('gameCanvas');
console.log(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
let inputWord = "";

const spawnlevel = 2000;
const wordspeed = 1;
const asteroidFrequency = 2000;
const wordInput = document.getElementById('input_word');

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
        ctx.font = '24px Arial';
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
    const word = words[Math.floor(Math.random() * words.length)];
    const x = Math.random() * (canvas.width - 50);
    asteroids.push(new Asteroid(word, x, -80, wordspeed));
}

function game_intro()
{
    
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
        if (asteroid.word === inputWord.trim())
        {
            asteroids.splice(i, 1);
            inputWord = "";
            wordInput.value = "";
            i--;
        }
        if (asteroid.y > canvas.height)
        {
            alert('Game Over!');
            document.location.reload();
            return;
        }
        i++;
    }
    requestAnimationFrame(updateGame);
}

wordInput.addEventListener('input', (e) => {
    inputWord = e.target.value;
});

setInterval(spawnAsteroid, spawnlevel);
updateGame();